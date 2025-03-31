'use client';

import { login } from '@/lib/actions/auth';

const LoginButton = () => {
  return (
    <button
      className="rounded-md bg-gray-600 p-2 text-center font-semibold text-white"
      onClick={() => login()}
    >
      Entrar con Github
    </button>
  );
};

export default LoginButton;
