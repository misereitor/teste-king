'use client';

import { logoutUserService } from '@/service/user-service';

export default function Layout({ children }: { children: React.ReactNode }) {
  const logout = async () => {
    await logoutUserService();
  };
  return (
    <main className="">
      <div className="border-b border-stone-300 h-14">
        <div className="justify-end flex items-center h-full px-4">
          <button onClick={logout} className="cursor-pointer">
            Sair
          </button>
        </div>
      </div>
      <div>{children}</div>
    </main>
  );
}
