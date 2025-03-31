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
  // {
  //   title: 'Bucar Cancha old',
  //   href: '/buscar-canchas-old',
  // },
  {
    title: 'Sumá tu Cancha',
    href: '/suma-tu-cancha',
  },
  {
    title: 'Contribuir',
    href: '/contribute',
  },
];

const Navbar = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="flex h-16 items-center justify-around bg-teal-800 font-semibold md:text-xl">
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
