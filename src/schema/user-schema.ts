import { validatePassword } from '@/util/valide-user';
import { z } from 'zod';

export const schemaUserRegister = z
  .object({
    name: z
      .string()
      .min(4, 'O nome tem que ter ao menos 4 letras')
      .max(50, 'O nome tem que ter no máximo 50 letras')
      .refine(
        (val) => !/[^.\-\w ]/g.test(val),
        'Nome de login não pode ter caracteres especiais'
      ),
    email: z.string().email('Insira um e-mail válido'),
    password: z
      .string()
      .min(8, 'A senha tem que ter ao menos 8 caracteres')
      .max(100, 'A senha tem que ter no máximo 100 caracteres')
      .superRefine((val, ctx) => validatePassword(val, ctx)),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não conferem'
  });

export const schemaUpdateUser = z.object({
  name: z
    .string()
    .min(4, 'O nome tem que ter ao menos 4 letras')
    .max(50, 'O nome tem que ter no máximo 50 letras')
    .refine(
      (val) => !/[^.\-\w ]/g.test(val),
      'Nome de login não pode ter caracteres especiais'
    ),
  email: z.string().email('Insira um e-mail válido')
});

export const schemaUpdateUserPassword = z
  .object({
    password: z
      .string()
      .min(8, 'A senha tem que ter ao menos 8 caracteres')
      .max(100, 'A senha tem que ter no máximo 100 caracteres')
      .superRefine((val, ctx) => validatePassword(val, ctx)),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não conferem'
  });

export type UserRegisterSchema = z.infer<typeof schemaUserRegister>;
export type UpdateUserSchema = z.infer<typeof schemaUpdateUser>;
export type UpdateUserPasswordSchema = z.infer<typeof schemaUpdateUserPassword>;
