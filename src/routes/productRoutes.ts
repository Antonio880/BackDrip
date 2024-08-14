import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController";
import { validateToken } from "../middlewares/AuthMiddleware";

const router = Router();

router.get("/products", validateToken, getProducts);
router.get("/products/:id", validateToken, getProductById);
router.post("/products", validateToken, createProduct);
router.put("/products/:id", validateToken, updateProduct);
router.delete("/products/:id", validateToken, deleteProduct);

export default router;
