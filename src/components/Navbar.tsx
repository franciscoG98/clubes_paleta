'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const paths: {
  title: string;
  href: string;
}[] = [
  {
    title: 'Bucar Canchas',
    href: '/buscar-canchas',
  },
  {
    title: 'Sumá tu Cancha',
    href: '/suma-tu-cancha',
  },
  {
    title: 'Acerca de',
    href: '/acerca-de',
  },
];

const Navbar = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="flex items-center justify-around bg-neutral-100 px-36 text-xl font-semibold">
      <Link
        href={'/'}
        key={'Home'}
        passHref
        className="mt-4 flex items-center justify-between gap-4 hover:underline focus-visible:border-gray-800"
      >
        <Image
          alt="Logo de Canchas de Paleta"
          src={'/main_logo.webp'}
          className="rounded-xl"
          height={75}
          width={75}
        />
        Canchas de Paleta
      </Link>
      <div className="mt-4">
        {paths.map((item) => (
          <Link
            href={item.href}
            key={item.title}
            passHref
            className={`p-4 hover:underline focus-visible:border-gray-800 ${'/' + segment === item.href ? 'rounded-xl bg-gray-300 hover:no-underline' : ''}`}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
