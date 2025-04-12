'use client';
import { User } from '@/model/user';
import { getAllUsersService } from '@/service/user-service';
import { useEffect, useState } from 'react';
import Modal from '../modal/modal';
import ModalDelete from './modal-delete-user';
import ModalEditUser from './modal-edit-user';
import ModalEditPassword from './modal-edit-password-user';

export default function ListUser() {
  const [users, setUsers] = useState<User[] | undefined>([]);
  const [userSelected, setUserSelected] = useState<User | undefined>(undefined);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalEditPassword, setOpenModalEditPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const users = await getAllUsersService();
      if (users.success) {
        setUsers(users.users);
      } else {
        console.error(users.message);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = (user: User) => {
    setUserSelected(user);
    setOpenModalDelete(true);
  };

  const handleEditUser = (user: User) => {
    setUserSelected(user);
    setOpenModalEdit(true);
  };

  const handleEditPasswordUser = (user: User) => {
    setUserSelected(user);
    setOpenModalEditPassword(true);
  };
  return (
    <div>
      <Modal
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        outClick={false}
      >
        <ModalDelete
          setOpenModalDelete={setOpenModalDelete}
          setUserSelected={setUserSelected}
          setUsers={setUsers}
          userSelected={userSelected}
          users={users}
        />
      </Modal>
      <Modal
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        outClick={false}
      >
        <ModalEditUser
          setOpenModalEdit={setOpenModalEdit}
          setUserSelected={setUserSelected}
          setUsers={setUsers}
          userSelected={userSelected}
          users={users}
        />
      </Modal>
      <Modal
        openModal={openModalEditPassword}
        setOpenModal={setOpenModalEditPassword}
        outClick={false}
      >
        <ModalEditPassword
          setOpenModalEditPassword={setOpenModalEditPassword}
          setUserSelected={setUserSelected}
          userSelected={userSelected}
        />
      </Modal>
      <div className="flex flex-col justify-center items-center mx-2">
        <h1 className="text-2xl font-bold">Lista de usuários</h1>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nome</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center">
                  <div className="loader"></div>
                </td>
              </tr>
            ) : (
              users?.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEditPasswordUser(user)}
                      className="bg-cyan-800 text-white px-4 py-2 rounded ml-1 cursor-pointer"
                    >
                      Alterar senha
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="bg-red-500 text-white px-4 py-2 rounded ml-1 cursor-pointer"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {users?.length === 0 && !loading && (
          <div className="mt-4 text-center">
            <p className="text-gray-500">Nenhum usuário encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
