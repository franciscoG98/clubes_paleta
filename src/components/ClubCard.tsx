import Link from 'next/link';
import Image from 'next/image';
import { Club } from '@/types/club';

const ClubCard = ({
  provincia,
  ciudad,
  clubName,
  direccion,
  mapsLink,
  tipo,
  image,
  contacto,
  contacto2,
}: Club) => {
  return (
    // @fix: sizes (height)
    // @fix: rounded
    <div className="h-[520px] w-[320px] rounded-xl border border-slate-500 bg-white">
      {/* @fix: este include esta medio raro */}
      {image && image.includes('.') ? (
        <Image
          aria-hidden
          src={`${process.env.serverURI}/uploads/${image}`}
          alt={`Cancha de ${clubName}, ${ciudad}`}
          className="h-[203px] w-full rounded-t-xl sm:h-[240px]"
          width={320}
          height={203}
          priority
        />
      ) : (
        <Image
          aria-hidden
          src="/cancha_default.webp"
          alt="Default logo para las canchas sin foto"
          className="h-[203px] w-full rounded-t-xl sm:h-[240px]"
          width={320}
          height={203}
          priority
        />
      )}

      {/* header provincia y ciudad */}
      <span className="m-4 flex text-center text-2xl font-bold">
        {ciudad}, {provincia}
      </span>

      <span className="m-4 flex text-center text-2xl font-bold">
        {clubName}
      </span>

      <span className="m-2 rounded-full bg-blue-600 px-2 py-1 font-semibold text-background">
        {tipo}
      </span>

      {/* location */}
      <div className="m-2">
        <p>Dirección: {direccion}</p>
        {mapsLink !== '' && mapsLink !== 'H' && (
          <Link
            className="text-blue-600 underline hover:no-underline"
            href={mapsLink || ''}
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
        {contacto2 !== 0 && (
          <span className="text-blue-600 underline hover:no-underline">
            {contacto2}
          </span>
        )}
      </footer>
    </div>
  );
};

export default ClubCard;
