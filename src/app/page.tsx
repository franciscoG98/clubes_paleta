'use client';

import getClubes from '@/lib/getClubes';
import { useEffect, useState } from 'react';
import Club from '@/types/club';
import ClubCard from '@/components/ClubCard';
// import Image from "next/image";

export default function Home() {
  const [clubes, setClubes] = useState<Club[]>([]);

  useEffect(() => {
    getClubes()
      .then((res) => setClubes(res))
      .catch((err) => console.log(err));
  }, []);

  if (clubes.length < 1) {
    return <span>...cargando</span>;
  }

  return (
    <main className="row-start-2 mx-auto mb-12 flex w-3/4 flex-col gap-8 sm:items-start">
      <h1 className="mx-auto mt-12 text-2xl font-bold">
        Canchas de Pelota a Paleta
      </h1>

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
  );
}
