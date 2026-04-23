"use client";

import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  return (
    <Button onClick={() => logout()} variant="outline">
      Cerrar sesión
    </Button>
  );
};

export default LogoutButton;
