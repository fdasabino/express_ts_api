import { CreateProductTypeZ, ProductDocument, ProductModel } from "../models/product.model";
import { ListResult, ProductListRequest } from "../types/query.types";
import { AppError } from "../utils/app.error";
import { buildSearchQuery, parseBoolean, parseProjection, parseSort } from "../utils/query.util";

export const createProductService = async (productData: CreateProductTypeZ) => {
  const existingProduct = await ProductModel.findOne({ name: productData.name });
  if (existingProduct) throw new AppError("Product already exists...", 409);

  const newProduct = await ProductModel.create(productData);
  return newProduct;
};

export const getProductByIdService = async (id: string) => {
  const product = await ProductModel.findById(id);
  if (!product) throw new AppError("Product not found...", 404);
  return product;
};

const allowedSortFields = ["createdAt", "price", "name", "stock", "updatedAt"] as const;
const allowedProjectionFields = [
  "_id",
  "name",
  "price",
  "description",
  "category",
  "stock",
  "createdAt",
  "updatedAt",
] as const;
const allowedSearchFields = ["name", "description", "category"] as const;

export const listProductsService = async (
  params: ProductListRequest,
): Promise<ListResult<ProductDocument>> => {
  const { page, limit, sort, fields, search, category, minPrice, maxPrice, inStock } = params;

  const filters: Record<string, unknown> = {};

  if (category) filters.category = category;

  const priceFilter: Record<string, number> = {};
  if (minPrice) {
    const parsed = Number(minPrice);
    if (!Number.isNaN(parsed)) priceFilter.$gte = parsed;
  }
  if (maxPrice) {
    const parsed = Number(maxPrice);
    if (!Number.isNaN(parsed)) priceFilter.$lte = parsed;
  }
  if (Object.keys(priceFilter).length > 0) filters.price = priceFilter;

  const inStockBool = parseBoolean(inStock);
  if (inStockBool !== undefined) {
    filters.stock = inStockBool ? { $gt: 0 } : { $lte: 0 };
  }

  const searchQuery = buildSearchQuery(search, [...allowedSearchFields]);
  const query: Record<string, unknown> = { ...filters, ...(searchQuery ?? {}) };

  const sortBy = parseSort(sort, [...allowedSortFields], "-createdAt");
  const projection = parseProjection(fields, [...allowedProjectionFields]);

  const skip = (page - 1) * limit;

  const findQuery = ProductModel.find(query).sort(sortBy).skip(skip).limit(limit);
  if (projection) findQuery.select(projection);

  const [data, total] = await Promise.all([findQuery.exec(), ProductModel.countDocuments(query)]);

  const totalPages = Math.ceil(total / limit) || 1;

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
  };
};

export const updateProductService = async (id: string, updateData: Partial<CreateProductTypeZ>) => {
  const existingProduct = await ProductModel.findById(id);
  if (!existingProduct) throw new AppError("Product not found...", 404);

  const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) throw new AppError("Product not found...", 404);

  return updatedProduct;
};

export const deleteProductService = async (id: string) => {
  const existingProduct = await ProductModel.findById(id);
  if (!existingProduct) throw new AppError("Product not found...", 404);

  const deletedProduct = await ProductModel.findByIdAndDelete(id, {
    new: true,
    runValidators: true,
  });
  return deletedProduct;
};

/*
Postman checklist (manual):
- GET /api/products?limit=9999 returns at most 100 items and meta.limit === 100.
- GET /api/products?category=books adjusts meta.total/meta.totalPages based on filtered count.
- GET /api/products?sort=unknown falls back to -createdAt without error.
- GET /api/products?fields=name,price,unknown only returns allowed fields.
- GET /api/products?minPrice=10&maxPrice=20 ignores unknown filters and applies price range safely.
- GET /api/products?search=notebook performs case-insensitive partial match on allowed text fields.
*/
