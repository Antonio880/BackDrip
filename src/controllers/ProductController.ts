import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos", error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produto", error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar produto", error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    await product.update(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar produto", error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar produto", error });
  }
};
