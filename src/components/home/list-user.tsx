'use client';
import { User } from '@/model/user';
import { getAllUsersService } from '@/service/user-service';
import { useEffect, useState } from 'react';

export default function ListUser() {
  const [users, setUsers] = useState<User[] | undefined>([]);
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
  return (
    <div className="flex flex-col justify-center items-center">
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
                  <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                    Editar
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded ml-2 cursor-pointer">
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
  );
}
