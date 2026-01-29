import { NextFunction, Request, Response } from "express";
import { CreateProductTypeZ } from "../models/product.model";
import * as productService from "../services/product.service";

export const createProduct = async (
  req: Request<{}, {}, CreateProductTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newProduct = await productService.createProductService(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get a product by ID
    const product = await productService.getProductByIdService(req.params.id as string);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get all products
    const products = await productService.getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Update a product by ID
    const updatedProduct = await productService.updateProductService(
      req.params.id as string,
      req.body,
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Delete a product by ID
    const deleted = await productService.deleteProductService(req.params.id as string);
    res.status(200).json({ message: "Product deleted successfully", deleted });
  } catch (error) {
    next(error);
  }
};
