'use client';

import { logout } from '@/lib/actions/auth';

const LogoutButton = () => {
  return (
    <button
      className="rounded-md bg-gray-600 p-2 text-center font-semibold text-white"
      onClick={() => logout()}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
