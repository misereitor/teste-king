'use server';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  updateUserPassword
} from '@/repository/user-repository';
import bcrypt from 'bcryptjs';
import { createTokenService } from './auth';
import { cookies } from 'next/headers';
import { UserRegisterSchema } from '@/schema/user-schema';
import { User, UserRegister } from '@/model/user';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function loginUserService(email: string, password: string) {
  try {
    const loginUser = await getUserByEmail(email.toLowerCase());
    const cookiesNext = await cookies();

    if (!loginUser) {
      return {
        success: false,
        message: 'Login e/ou senha inválidos'
      };
    }

    const isPasswordValid = await bcrypt.compare(password, loginUser.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Login e/ou senha inválidos'
      };
    }

    const token = await createTokenService(loginUser);
    cookiesNext.set({
      name: 'token',
      value: token,
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      httpOnly: true
    });

    cookiesNext.set({
      name: 'user',
      value: JSON.stringify({
        id: loginUser.id,
        name: loginUser.name,
        email: loginUser.email
      }),
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      httpOnly: true
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return {
      success: false,
      message: 'Erro ao fazer login'
    };
  }
  redirect('/home');
}

export async function registerUserService(userRegister: UserRegisterSchema) {
  try {
    const cookiesNext = await cookies();
    const existingUser = await getUserByEmail(userRegister.email.toLowerCase());
    if (existingUser) {
      return {
        success: false,
        message: 'E-mail já cadastrado'
      };
    }
    const { name, email, password } = userRegister;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user: UserRegister = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword
    };

    const newUser = await createUser(user);

    const token = await createTokenService(newUser);
    cookiesNext.set({
      name: 'token',
      value: token,
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      httpOnly: true
    });

    cookiesNext.set({
      name: 'user',
      value: JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }),
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      httpOnly: true
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return {
      success: false,
      message: 'Erro ao registrar usuário'
    };
  }
  redirect('/home');
}

export async function updateUserService(user: User) {
  try {
    const updatedUser = await updateUser(user);
    return {
      success: true,
      message: 'Usuário atualizado com sucesso',
      user: updatedUser
    };
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return {
      success: false,
      message: 'Erro ao atualizar usuário'
    };
  }
}

export async function updateUserPasswordService(password: string, id: number) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await updateUserPassword(hashedPassword, id);
    return {
      success: true,
      message: 'Senha atualizada com sucesso',
      user: updatedUser
    };
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    return {
      success: false,
      message: 'Erro ao atualizar senha'
    };
  }
}

export async function getUserByIdService(id: number) {
  try {
    const user = await getUserById(id);
    return {
      success: true,
      message: 'Usuário encontrado com sucesso',
      user
    };
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return {
      success: false,
      message: 'Erro ao buscar usuário'
    };
  }
}

export async function getAllUsersService() {
  try {
    const users = await getAllUsers();
    return {
      success: true,
      message: 'Usuário encontrado com sucesso',
      users
    };
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return {
      success: false,
      message: 'Erro ao buscar usuários'
    };
  }
}

export async function deleteUserService(id: number) {
  try {
    const deletedUser = await deleteUser(id);
    return {
      success: true,
      message: 'Usuário deletado com sucesso',
      user: deletedUser
    };
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return {
      success: false,
      message: 'Erro ao deletar usuário'
    };
  }
}

export async function logoutUserService() {
  try {
    const cookiesNext = await cookies();
    cookiesNext.set({
      name: 'token',
      value: '',
      maxAge: -1,
      httpOnly: true
    });
    cookiesNext.set({
      name: 'user',
      value: '',
      maxAge: -1,
      httpOnly: true
    });
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
  redirect('/');
}
