'use client';

import { getCanchas } from '@/lib/getClubes';
import { useEffect, useState } from 'react';
import ClubCard from '@/components/ClubCard';
import Spinner from '@/components/Spinner';
import { Slider } from '@/components/Slider';
import { Cancha } from '@/types/club';

export default function Home() {
  const [clubes, setClubes] = useState<Cancha[]>([]);

  useEffect(() => {
    getCanchas()
      .then((res) => {
        setClubes(res);
      })
      .catch((err) => console.log('Error:', err));
  }, []);

  return (
    <>
      <header className="mx-6 flex flex-col gap-6 py-8 text-center font-bold sm:mx-auto sm:w-[680px]">
        <h1 className="text-xl sm:text-4xl">
          Todas las canchas de Pelota&nbsp;a&nbsp;Paleta en un solo lugar
        </h1>

        <h2 className="mx-8 text-lg sm:text-2xl">
          Encuentra tu cancha más cercana y disfruta de partidos a donde vayas
        </h2>
      </header>

      <main className="mx-auto flex w-3/4 flex-col gap-8 p-8">
        <Slider />

        {clubes && clubes.length > 0 ? (
          <section className="flex flex-wrap justify-between gap-12">
            {clubes.map((cancha) => (
              <ClubCard
                key={cancha.id}
                image={cancha.image}
                provincia={cancha.state}
                ciudad={cancha.city}
                clubName={cancha.club}
                direccion={cancha.maps_location}
                mapsLink={'cancha.mapsLink'}
                tipo={cancha.type}
                contacto2={cancha.phone}
              />
            ))}
          </section>
        ) : (
          <Spinner />
        )}
      </main>
    </>
  );
}
