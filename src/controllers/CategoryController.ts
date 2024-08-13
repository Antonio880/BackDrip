import { Request, Response } from "express";
import Category from "../models/Category";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const [updated] = await Category.update(
      { name },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedCategory = await Category.findByPk(req.params.id);
      return res.status(200).json(updatedCategory);
    }
    throw new Error("Category not found");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("Category not found");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
