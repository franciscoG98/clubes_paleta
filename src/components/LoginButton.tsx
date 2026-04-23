"use client";

import { login } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

const LoginButton = () => {
  return (
    <Button onClick={() => login()} variant="default">
      Entrar con Github
    </Button>
  );
};

export default LoginButton;
