import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from "../controllers/product.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createProductValidation } from "../models/product.model";

const router = Router();

// Examples:
// GET /api/products?page=1&limit=10&sort=-createdAt&category=books&fields=name,price
// GET /api/products?page=2&limit=20&sort=price&search=notebook&minPrice=5&maxPrice=50
router.get("/", getProducts);
router.get("/:id", protect, restrictTo("admin"), getProductById);
router.put("/:id", protect, restrictTo("admin"), updateProductById);
router.delete("/:id", protect, restrictTo("admin"), deleteProductById);
router.post("/", validate(createProductValidation), protect, restrictTo("admin"), createProduct);

export default router;
