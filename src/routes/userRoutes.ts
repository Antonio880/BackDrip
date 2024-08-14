import { Router } from "express";
import {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController";
import { validateToken } from "../middlewares/AuthMiddleware";

const router = Router();

router.get("/:id", validateToken, getUserById);
router.post("/", validateToken, createUser);
router.put("/:id", validateToken, updateUser);
router.delete("/:id", validateToken, deleteUser);

export default router;
