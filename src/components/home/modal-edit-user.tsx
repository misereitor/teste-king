import { User } from '@/model/user';
import { schemaUpdateUser, UpdateUserSchema } from '@/schema/user-schema';
import { updateUserService } from '@/service/user-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  setUserSelected: Dispatch<SetStateAction<User | undefined>>;
  setOpenModalEdit: Dispatch<SetStateAction<boolean>>;
  userSelected: User | undefined;
  setUsers: Dispatch<SetStateAction<User[] | undefined>>;
  users: User[] | undefined;
};

export default function ModalEditUser({
  setOpenModalEdit,
  setUserSelected,
  setUsers,
  userSelected,
  users
}: Props) {
  if (!userSelected) return null;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateUserSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(schemaUpdateUser),
    defaultValues: {
      name: userSelected.name,
      email: userSelected.email
    }
  });

  const onSubmit = async (
    data: UpdateUserSchema,
    event?: React.BaseSyntheticEvent
  ) => {
    event?.preventDefault();
    const user: User = {
      id: userSelected.id,
      ...data,
      password: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const updateUser = await updateUserService(user);
    if (!updateUser.success) {
      setError(updateUser.message);
      setLoading(false);
      return;
    }
    const updatedUser = {
      ...userSelected,
      ...updateUser.user
    };
    setUsers(
      users?.map((user) => (user.id === userSelected.id ? updatedUser : user))
    );
    setLoading(false);
    setOpenModalEdit(false);
    setUserSelected(undefined);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-lg mt-4">
        Você está editando o usuário <b>{userSelected?.name}</b>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col mt-5">
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
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? 'bg-gray-500' : 'bg-blue-500'
            } text-white px-4 py-2 rounded mr-2 cursor-pointer`}
          >
            Salvar
          </button>
          <button
            type="button"
            disabled={loading}
            className={`${
              loading ? 'bg-gray-200 text-gray-700' : 'bg-gray-500 text-white'
            } px-4 py-2 rounded mr-2 cursor-pointer`}
            onClick={() => {
              setOpenModalEdit(false);
              setUserSelected(undefined);
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
