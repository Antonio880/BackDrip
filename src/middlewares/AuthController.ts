import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const newUser = await User.create({ username, email, password: await bcrypt.hash(password, 10) });
    
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login", error });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login", error });
  }
};
