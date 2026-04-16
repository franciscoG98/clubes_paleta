import Image from 'next/image';
import { Cancha } from '@/types/club';
import { House, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

// const getMapsUrl = (address: string, city: string, state: string) => {
//   const query = encodeURIComponent(`${address}, ${city}, ${state}, Argentina`);
//   return `https://www.google.com/maps/search/?api=1&query=${query}`;
// };

const ClubCard = ({
  club,
  city,
  state,
  maps_location,
  type,
  phone,
  image,
  address,
}: Cancha) => {
  return (
    <div className="h-[520px] w-[320px] overflow-hidden rounded-xl border border-slate-400">
      <span className="absolute ml-2 mt-2 w-fit rounded-full bg-blue-600 px-2 py-1 font-semibold text-background">
        {type}
      </span>

      <Image
        aria-hidden
        src={
          typeof image === 'string'
            ? image.startsWith('http')
              ? image
              : `${process.env.NEXT_PUBLIC_SERVER_URI}${image}`
            : `${process.env.NEXT_PUBLIC_SERVER_URI}/uploads/cancha_default.webp`
        }
        alt={`Cancha de ${club}, ${city}`}
        className="h-[203px] w-full rounded-t-xl sm:h-[240px]"
        width={320}
        height={203}
        priority
      />

      <header className="ml-4 mt-4 flex flex-col justify-around gap-2">
        <h3 className="text-2xl font-bold">{club}</h3>

        <p className="text-gray-500">
          {city}, {state}
        </p>
      </header>

      <div className="m-4">
        <p className="flex items-start gap-2 text-gray-600">
          <House className="mt-0.5 size-4 shrink-0" />
          {address ?? 'Dirección no disponible'}
        </p>
      </div>

      <div className="m-4">
        <Link
          href={maps_location}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2 text-green-600 hover:underline"
        >
          <MapPin className="mt-0.5 size-4" />
          <span>Ver direccion en Google Maps</span>
        </Link>
      </div>

      <div className="m-4">
        {phone ? (
          <Link
            className="flex gap-2 text-green-500 hover:underline"
            href={`tel:+549${phone}`}
          >
            <Phone className="mt-0.5 size-4" />
            {phone}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default ClubCard;
