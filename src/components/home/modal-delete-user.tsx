import { User } from '@/model/user';
import { deleteUserService } from '@/service/user-service';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  setUserSelected: Dispatch<SetStateAction<User | undefined>>;
  setOpenModalDelete: Dispatch<SetStateAction<boolean>>;
  userSelected: User | undefined;
  setUsers: Dispatch<SetStateAction<User[] | undefined>>;
  users: User[] | undefined;
};

export default function ModalDelete({
  setOpenModalDelete,
  setUserSelected,
  setUsers,
  userSelected,
  users
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async () => {
    setLoading(true);
    if (!userSelected) {
      setError('Nenhum usuário selecionado');
      setLoading(false);
      return;
    }
    await deleteUserService(userSelected.id);
    setUsers(users?.filter((user) => user.id !== userSelected?.id));
    setOpenModalDelete(false);
    setUserSelected(undefined);
    setLoading(false);
    setError(null);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Deletar usuário</h1>
      <p className="text-lg mt-4">
        Tem certeza que deseja deletar o usuário {userSelected?.name}?
      </p>
      <div>{error && <p className="text-red-500 mt-2">{error}</p>}</div>
      <div className="flex justify-center items-center mt-4">
        <button
          disabled={loading}
          className={`${
            loading ? 'bg-gray-500' : 'bg-red-500'
          } text-white px-4 py-2 rounded mr-2 cursor-pointer`}
          onClick={handleDeleteUser}
        >
          Deletar
        </button>
        <button
          disabled={loading}
          className={`${
            loading ? 'bg-gray-200 text-gray-700' : 'bg-gray-500 text-white'
          } px-4 py-2 rounded mr-2 cursor-pointer`}
          onClick={() => {
            setOpenModalDelete(false);
            setUserSelected(undefined);
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
