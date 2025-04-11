import pool from '@/db/config';
import { User, UserRegister } from '@/model/user';

export async function createUser(user: UserRegister) {
  try {
    const { name, email, password } = user;
    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
    const values = [name, email, password];
    const result = await pool.query(query, values);
    return result.rows[0] as User;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw new Error('Erro ao criar usuário');
  }
}

export async function getUserByEmail(email: string) {
  try {
    const query = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0] as User | null;
  } catch (error) {
    console.error('Erro ao encontrar usuário por e-mail:', error);
    throw new Error('Erro ao encontrar usuário por e-mail');
  }
}

export async function getUserById(id: number) {
  try {
    const query = `SELECT name, email FROM users WHERE id = $1`;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] as User | null;
  } catch (error) {
    console.error('Falha ao buscar usuario por id:', error);
    throw new Error('Falha ao buscar usuario por id');
  }
}

export async function getAllUsers() {
  try {
    const query = `SELECT id, name, email FROM users`;
    const result = await pool.query(query);
    return result.rows as User[];
  } catch (error) {
    console.error('Erro ao buscar todos os usuários:', error);
    throw new Error('Erro ao buscar todos os usuários');
  }
}

export async function updateUser(user: User) {
  try {
    const { id, name, email } = user;
    const query = `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`;
    const values = [name, email, id];
    const result = await pool.query(query, values);
    return result.rows[0] as User;
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    throw new Error('Erro ao atualizar o usuário');
  }
}

export async function updateUserPassword(password: string, id: number) {
  try {
    const query = `UPDATE users SET password = $1 WHERE id = $2 RETURNING *`;
    const values = [password, id];
    const result = await pool.query(query, values);
    return result.rows[0] as User;
  } catch (error) {
    console.error('Erro ao atualizar a senha do usuário:', error);
    throw new Error('Erro ao atualizar a senha do usuário');
  }
}

export async function deleteUser(id: number) {
  try {
    const query = `DELETE FROM users WHERE id = $1`;
    const values = [id];
    await pool.query(query, values);
    return { message: 'User deleted successfully' };
  } catch (error) {
    console.error('Erro ao deletear usuário:', error);
    throw new Error('Erro ao deletear usuário');
  }
}
