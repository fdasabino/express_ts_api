import mongoose from "mongoose";
import { z } from "zod";

export interface ProductDocument {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
}

export const createProductValidation = z.object({
  body: z.object({
    name: z.string("Please enter a valid name").min(2),
    price: z.number("Please enter a valid price").min(0),
    description: z.string("Please enter a valid description").min(2),
    category: z.string("Please enter a valid category").min(2),
    stock: z.number("Please enter a valid stock").min(0),
  }),
});

export type CreateProductTypeZ = z.infer<typeof createProductValidation>["body"];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);
