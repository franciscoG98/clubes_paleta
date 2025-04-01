'use server';

import { auth } from '@/auth';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';

const AdminPage = async () => {
  const session = await auth();

  if (session?.user) {
    return (
      <main className="mx-auto flex w-3/4 flex-col items-center justify-center gap-4 pt-6">
        <h1 className="text-2xl font-semibold">
          Canchas de Pelota Admin Section
        </h1>

        <p className="flex flex-col">
          <span>Usuario loggeado: {session.user.name}</span>
          <span>Email: {session.user.email}</span>
        </p>
        <LogoutButton />
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-3/4 flex-col items-center justify-center gap-4 pt-6">
      <h1 className="text-2xl font-semibold">
        Canchas de Pelota Admin Section
      </h1>
      <span>No estas loggeado</span>
      <LoginButton />
    </main>
  );
};

export default AdminPage;
