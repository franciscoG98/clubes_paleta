import Link from 'next/link';

// TODO: metele diseño hijo de puta
export default function AcercaDePage() {
  return (
    <main className="mx-12 flex flex-col items-center md:mx-auto md:w-1/2">
      <h1 className="my-8 text-center text-3xl font-semibold">Contribuir</h1>

      <h3 className="mb-6 text-xl font-semibold">Motivacion</h3>
      <ul className="mb-16 list-disc">
        <li>Esta página es para saber si donde hay canchas de paleta</li>
        <li>Difundir la cultura del deporte</li>
        <li>Podes sumar tu club! Mientras más canchas mejor</li>
        <li>En un futuro me gustaria promocionar torneos o exhibiciones</li>
      </ul>

      <p className="flex flex-col">
        <span>
          Podés contribuir con el sitio con la compra de un cafecito en el
          siguiente link&nbsp;
          <Link
            className="my-4 text-blue-600 underline hover:no-underline"
            href="https://cafecito.app/panch___"
            passHref={true}
          >
            CafecitoApp.
          </Link>
        </span>
        <span>
          Aunque prefiero que sumes su cancha en&nbsp;
          <Link
            className="my-4 text-blue-600 underline hover:no-underline"
            href="/suma-tu-cancha"
            passHref={true}
          >
            Suma tu Cancha
          </Link>
        </span>
      </p>
    </main>
  );
}
