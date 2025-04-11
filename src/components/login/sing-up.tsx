import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { PlayCircle } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaUserRegister, UserRegisterSchema } from '@/schema/user-schema';
import { registerUserService } from '@/service/user-service';

type Props = {
  setTypeSing: Dispatch<SetStateAction<number>>;
};

export default function SingUp({ setTypeSing }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError: setFormError,
    getValues,
    formState: { errors }
  } = useForm<UserRegisterSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(schemaUserRegister),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  useEffect(() => {
    const password = getValues('password');
    const confirmPassword = getValues('confirmPassword');
    if (password !== confirmPassword) {
      setFormError('confirmPassword', {
        type: 'custom',
        message: 'As senhas não conferem'
      });
    }
  }, [getValues, setFormError]);

  const handleLogin = async (data: UserRegisterSchema) => {
    setLoading(true);
    setError(null);

    const createUser = await registerUserService(data);
    if (!createUser.success) {
      setError(createUser.message);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleLogin)}
        autoComplete="off"
        sx={{
          width: 380,
          borderRadius: 3,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'var(--body)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="flex items-center justify-center mb-4 font-bold text-2xl">
          <h2>Crie a sua conta</h2>
        </div>
        <div className="w-full flex flex-col">
          <TextField
            id="outlined-basic"
            label="Seu nome"
            variant="outlined"
            {...register('name')}
            error={!!errors.name?.message}
            helperText={errors.name?.message}
            sx={{
              marginBottom: 2
            }}
          />
          <TextField
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            {...register('email')}
            sx={{
              marginBottom: 2
            }}
          />
          <TextField
            id="outlined-basic"
            label="Senha"
            type="password"
            variant="outlined"
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            {...register('password')}
            sx={{
              marginBottom: 2
            }}
          />
          <TextField
            type="password"
            id="outlined-basic"
            label="Confirme sua senha"
            error={!!errors.confirmPassword?.message}
            helperText={errors.confirmPassword?.message}
            {...register('confirmPassword')}
            variant="outlined"
          />
        </div>
        {error && (
          <div>
            <span className="text-[#D32F2F] font-normal text-xs tracking-[0.03333em]">
              {error}
            </span>
          </div>
        )}
        <div className="flex items-center justify-center flex-col w-80 mx-auto mt-5">
          <Button
            type="submit"
            color="primary"
            loading={loading}
            loadingPosition="center"
            endIcon={<PlayCircle />}
            variant="contained"
            sx={{
              width: 180,
              textTransform: 'none'
            }}
          >
            Crie sua conta
          </Button>
          <Button
            variant="text"
            disabled={loading}
            onClick={() => setTypeSing(0)}
            sx={{
              marginTop: 1,
              textTransform: 'none'
            }}
          >
            Faça login em vez disso
          </Button>
        </div>
      </Box>
    </div>
  );
}
