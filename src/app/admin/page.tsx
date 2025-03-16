'use server';

import { auth } from '@/auth';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';

const AdminPage = async () => {
  const session = await auth();

  if (session?.user) {
    return (
      <div>
        <h1>Canchas de Pelota Admin Section</h1>
        <p>Usuario loggeado: {session.user.name}</p>
        <p>Email: {session.user.email}</p>
        <LogoutButton />
      </div>
    );
  }

  return (
    <main className="mx-auto flex w-3/4  flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">AdminPage</h1>
      <span>No estas loggeado</span>
      <LoginButton />
    </main>
  );
};

export default AdminPage;
