"use server";

import { auth } from "@/auth";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";

const AdminPage = async () => {
  const session = await auth();

  if (session?.user && session?.user?.email === process.env.MAIL) {
    return (
      <main className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold">Admin — Canchas de Paleta</h1>
        <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Usuario:</span>{" "}
            {session.user.name}
          </p>
          <p>
            <span className="font-medium text-foreground">Email:</span>{" "}
            {session.user.email}
          </p>
        </div>
        <LogoutButton />
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-12 text-center">
      <h1 className="text-2xl font-semibold">Admin — Canchas de Paleta</h1>
      <p className="text-muted-foreground">No estás logueado.</p>
      <LoginButton />
    </main>
  );
};

export default AdminPage;
