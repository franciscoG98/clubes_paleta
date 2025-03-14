'use client';

import { getClubes } from '@/lib/getClubes';
import { useEffect, useState } from 'react';
import ClubCard from '@/components/ClubCard';
import Spinner from '@/components/Spinner';
import { Slider } from '@/components/Slider';

export default function Home() {
  const [clubes, setClubes] = useState([]);

  useEffect(() => {
    getClubes()
      .then((res) => setClubes(res))
      .catch((err) => console.log(err));
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

        <section className="flex flex-wrap items-center justify-center gap-8">
          {clubes.map((club, idx) => (
            <ClubCard
              key={idx}
              provincia={club.provincia}
              ciudad={club.ciudad}
              clubName={club.clubName}
              direccion={club.direccion}
              mapsLink={club.mapsLink}
              tipo={club.tipo}
              contacto={club.contacto}
              contacto2={club.contacto2}
            />
          ))}
        </section>
      </main>
    </>
  );
}
