'use server';
import { User } from '@/model/user';
import jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;

export async function createTokenService(user: User) {
  try {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    const token = jwt.sign(payload, SECRET_KEY as string, {
      expiresIn: '30d'
    });
    return token;
  } catch (error) {
    console.error('Erro ao criar token:', error);
    throw new Error('Erro ao criar token');
  }
}
