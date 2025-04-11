import { z } from 'zod';

export function validatePassword(password: string, ctx: z.RefinementCtx) {
  const regexNumber = !/\d/.test(password);
  const regexLetter = !/\D/.test(password);
  const regexCaracter = !/\W/.test(password);
  const regexUpperCase = !/[A-Z]/g.test(password);
  const regexLowerCase = !/[a-z]/g.test(password);

  if (regexNumber) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A senha precisa ter um número',
      fatal: true
    });
  }
  if (regexLetter) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A senha precisa ter uma letra',
      fatal: true
    });
  }
  if (regexCaracter) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A senha precisa ter um caracter como @ !',
      fatal: true
    });
  }
  if (regexLowerCase) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A senha precisa ter uma letra maiúscula',
      fatal: true
    });
  }
  if (regexUpperCase) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A senha precisa ter uma letra minúscula',
      fatal: true
    });
  }
  return ctx;
}
