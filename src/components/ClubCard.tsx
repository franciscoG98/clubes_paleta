import Link from 'next/link';
import Image from 'next/image';
import Club from '@/types/club';

const ClubCard = ({
  provincia,
  ciudad,
  clubName,
  direccion,
  mapsLink,
  tipo,
  contacto,
  contacto2,
}: Club) => {
  return (
    // @fix: sizes
    // @fix: rounded
    <div className="h-[520px] w-[320px] rounded-lg border border-slate-500">
      <Image
        aria-hidden
        src="/cancha_default.webp"
        alt="Default logo para las canchas sin foto"
        className="h-[203px] w-full rounded-t-md sm:h-[240px]"
        width={320}
        height={203}
        priority
      />

      {/* header provincia y ciudad */}
      <p className="m-2 flex flex-col font-semibold">
        <span className="text-center text-2xl font-bold">{provincia}</span>
        <span>{ciudad}</span>
      </p>
      {/* card body */}
      <div className="mx-2 my-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">{clubName}</h3>
        {tipo && (
          <span className="rounded-full bg-blue-600 px-1 py-0.5 text-xs font-semibold text-background">
            {tipo}
          </span>
        )}
      </div>

      {/* location */}
      <div className="m-2">
        <p>Dirección: {direccion}</p>
        {mapsLink !== '' && mapsLink !== 'H' && (
          <Link
            className="text-blue-600 underline hover:no-underline"
            href={mapsLink}
            passHref={true}
          >
            Ver en Google Maps
          </Link>
        )}
      </div>

      {/* footer contact */}
      <footer className="m-2 flex flex-col justify-between">
        {contacto && (
          <span className="flex">
            Telefono:
            <a
              className="text-blue-600 underline hover:no-underline"
              href={`tel:+549${contacto}`}
            >
              {contacto}
            </a>
          </span>
        )}
        {contacto2 && (
          <span className="text-blue-600 underline hover:no-underline">
            {contacto2}
          </span>
        )}
      </footer>
    </div>
  );
};

export default ClubCard;
