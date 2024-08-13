import { Router } from "express";
import {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController";

const router = Router();

router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
