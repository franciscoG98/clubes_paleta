import { FaSpinner } from 'react-icons/fa';

export default function LoadingSpinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <FaSpinner
        size={42}
        className="m-auto animate-spin text-4xl text-slate-700"
      />
      ;
    </div>
  );
}
