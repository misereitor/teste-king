import { User } from '@/model/user';
import {
  schemaUpdateUserPassword,
  UpdateUserPasswordSchema
} from '@/schema/user-schema';
import {
  chackPasswordUserServer,
  updateUserPasswordService
} from '@/service/user-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  setUserSelected: Dispatch<SetStateAction<User | undefined>>;
  setOpenModalEditPassword: Dispatch<SetStateAction<boolean>>;
  userSelected: User | undefined;
};

export default function ModalEditPassword({
  setOpenModalEditPassword,
  setUserSelected,
  userSelected
}: Props) {
  if (!userSelected) return null;
  const [loading, setLoading] = useState(false);
  const [errorOldPassword, serErrorOldPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateUserPasswordSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(schemaUpdateUserPassword),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (
    data: UpdateUserPasswordSchema,
    event?: React.BaseSyntheticEvent
  ) => {
    event?.preventDefault();
    setLoading(true);
    setError(null);
    serErrorOldPassword(null);
    const chackPassword = await chackPasswordUserServer(
      userSelected.email,
      oldPassword
    );
    if (!chackPassword.success) {
      serErrorOldPassword(chackPassword.message);
      setLoading(false);
      return;
    }
    await updateUserPasswordService(data.password, userSelected.id);
    setOpenModalEditPassword(false);
    setUserSelected(undefined);
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-[400px]">
      <h1 className="text-2xl font-bold">Alterar Senha</h1>
      <form
        className="flex flex-col justify-center items-center mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Senha Antiga"
          type="password"
          variant="outlined"
          sx={{
            width: '300px'
          }}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          error={!!errorOldPassword}
          helperText={errorOldPassword ? errorOldPassword : ''}
        />
        <TextField
          {...register('password')}
          label="Nova Senha"
          type="password"
          variant="outlined"
          sx={{
            marginTop: '20px',
            width: '300px'
          }}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />
        <TextField
          {...register('confirmPassword')}
          label="Confirmar Senha"
          type="password"
          variant="outlined"
          sx={{
            marginTop: '20px',
            width: '300px'
          }}
          error={!!errors.confirmPassword}
          helperText={
            errors.confirmPassword ? errors.confirmPassword.message : ''
          }
        />
        <div className="flex justify-center items-center mt-4">
          <button
            disabled={loading}
            className={`${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white px-4 py-2 rounded mr-2 cursor-pointer`}
            type="submit"
          >
            {loading ? 'Carregando...' : 'Alterar Senha'}
          </button>
          <button
            disabled={loading}
            className={`${loading ? 'bg-gray-500' : 'bg-gray-500'} text-white px-4 py-2 rounded mr-2 cursor-pointer`}
            onClick={() => {
              setOpenModalEditPassword(false);
              setUserSelected(undefined);
            }}
            type="button"
          >
            Cancelar
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
