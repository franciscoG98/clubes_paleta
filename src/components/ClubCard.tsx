import Image from 'next/image';
import { Club } from '@/types/club';
import { MapPin, Phone } from 'lucide-react';

const ClubCard = ({
  provincia,
  ciudad,
  clubName,
  direccion,
  // mapsLink,
  tipo,
  image,
  contacto,
  contacto2,
}: Club) => {
  return (
    // TODO: sizes (height) and rounded
    <div className="h-[520px] w-[320px] rounded-xl border border-slate-400">
      <span className="absolute ml-2 mt-2 w-fit rounded-full bg-blue-600 px-2 py-1 font-semibold text-background">
        {tipo}
      </span>
      {image?.slice(30) ? (
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

      <header className="ml-4 mt-4 flex flex-col justify-around gap-2">
        <h3 className="text-2xl font-bold">{clubName}</h3>

        <p className="flex gap-2 text-gray-500">
          <MapPin className="size-5" />
          <span>
            {ciudad}, {provincia}
          </span>
        </p>
      </header>

      {/* location */}
      <div className="m-4">
        <p>Dirección: {direccion}</p>
      </div>

      {/* footer contact */}
      <div className="m-4 flex flex-col justify-between">
        {contacto && (
          <span className="flex items-center">
            Telefono:
            <a
              className="ml-2 flex gap-2 text-green-500 hover:underline"
              href={`tel:+549${contacto}`}
            >
              {contacto}
              <Phone className="size-5" />
            </a>
          </span>
        )}

        {contacto2 && (
          <span className="flex items-center">
            Telefono:
            <a
              className="ml-2 flex gap-2 text-green-500 hover:underline"
              href={`tel:+549${contacto2}`}
            >
              {contacto2}
              <Phone className="size-5" />
            </a>
          </span>
        )}
      </div>
    </div>
  );
};

export default ClubCard;
