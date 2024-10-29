import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex h-20 items-center justify-around bg-foreground font-semibold text-background md:text-xl">
      <Link className="hover:underline" href={'/'}>
        Inicio
      </Link>
      <Link className="hover:underline" href={'/buscar-canchas'}>
        Buscar Canchas
      </Link>
      <Link className="hover:underline" href={'/suma-tu-cancha'}>
        Sumá tu Cancha
      </Link>
    </nav>
  );
};

export default Navbar;
