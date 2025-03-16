'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const paths: {
  title: string;
  href: string;
}[] = [
  {
    title: 'Inicio',
    href: '/',
  },
  {
    title: 'Bucar Cancha',
    href: '/buscar-canchas',
  },
  {
    title: 'Sumá tu Cancha',
    href: '/suma-tu-cancha',
  },
  {
    title: 'Contribuir',
    href: '/contribute',
  },
  {
    title: 'admin',
    href: '/admin',
  },
  {
    title: 'approved',
    href: '/admin/approved',
  },
  {
    title: 'dashboard',
    href: '/admin/dashboard',
  },
];

const Navbar = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="mb-8 flex h-16 items-center justify-around bg-blue-950 font-semibold md:text-xl">
      {paths.map((item) => (
        <Link
          href={item.href}
          key={item.title}
          passHref
          className={`text-white hover:underline focus-visible:border-white ${'/' + segment === item.href ? 'font-semibold underline' : ''}`}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
