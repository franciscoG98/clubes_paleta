'use client';

import { getPendingCanchas } from '@/lib/getClubes';
import { useEffect, useState } from 'react';
import ClubCard from '@/components/ClubCard';
import Spinner from '@/components/Spinner';
import { Slider } from '@/components/Slider';
import { Cancha } from '@/types/club';

export default function Home() {
  const [clubes, setClubes] = useState<Cancha[]>([]);

  useEffect(() => {
    getPendingCanchas()
      .then((res) => {
        setClubes(res.filter((cancha) => !cancha.pending));
      })
      .catch((err) => console.log('Error:', err));
  }, []);

  if (clubes.length < 1) {
    return <Spinner />;
  }

  return (
    <>
      <header className="mx-6 mb-8 flex flex-col gap-6 text-center font-bold sm:mx-auto sm:w-[680px]">
        <h1 className="text-xl sm:text-4xl">
          Todas las canchas de Pelota&nbsp;a&nbsp;Paleta en un solo lugar
        </h1>

        <h2 className="mx-8 text-lg sm:text-2xl">
          Encuentra tu cancha más cercana y disfruta de partidos a donde vayas
        </h2>
      </header>

      <main className="mx-auto mb-12 flex w-3/4 flex-col  gap-8">
        <section className="mx-auto flex items-center justify-center gap-4">
          {['Trinquete', 'Frontón', 'Cajón'].map((type, index) => (
            <span
              key={index}
              className="rounded-full bg-green-700 px-3 py-1 font-semibold text-white"
            >
              {type}
            </span>
          ))}
        </section>

        <Slider />

        <section className="m-12 flex flex-wrap justify-center gap-12">
          {clubes.length > 0
            ? clubes.map((cancha) => (
                <article
                  className="flex flex-col justify-between rounded-xl border border-slate-400 bg-white"
                  key={cancha.id}
                >
                  <ClubCard
                    image={cancha.image}
                    provincia={cancha.state}
                    ciudad={cancha.city}
                    clubName={cancha.club}
                    direccion={cancha.maps_location}
                    mapsLink={'cancha.mapsLink'}
                    tipo={cancha.type}
                  />
                </article>
              ))
            : 'No hay canchas aprobadas'}
        </section>
      </main>
    </>
  );
}
