import { Request, Response } from "express";
import { User } from "../models/User";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const [updated] = await User.update(
      { name, email, password },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      return res.status(200).json(updatedUser);
    }
    throw new Error("User not found");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("User not found");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
