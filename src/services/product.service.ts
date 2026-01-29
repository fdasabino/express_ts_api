import { CreateProductTypeZ, ProductModel } from "../models/product.model";
import { AppError } from "../utils/app.error";

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

export const getAllProductsService = async () => {
  const products = await ProductModel.find();
  if (products.length === 0) throw new AppError("No products found...", 404);
  return products;
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

  await ProductModel.findByIdAndDelete(id);
  return;
};
