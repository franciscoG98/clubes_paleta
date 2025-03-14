'use client';

import { useState, useEffect } from 'react';
import { Cancha } from '@/types/club';
import { getPendingCanchas } from '@/lib/getClubes';
import ClubCard from '@/components/ClubCard';

// @fix: is lthis necesary?
// I think this should append directly to canchas...

export default function ApprovedCanchasPage() {
  const [approvedCanchas, setApprovedCanchas] = useState<Cancha[]>([]);

  useEffect(() => {
    getPendingCanchas()
      .then((res) => {
        setApprovedCanchas(res.filter((cancha) => !cancha.pending));
      })
      .catch((err) => console.log('Error:', err));
  }, []);

  return (
    <main className="mx-auto flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Canchas Aprobadas</h1>

      <section className="m-12 flex flex-wrap justify-center gap-12">
        {approvedCanchas.length > 0
          ? approvedCanchas.map((cancha) => (
              <article
                className="flex flex-col justify-between rounded-xl border border-slate-400 bg-white"
                key={cancha.id}
              >
                {cancha.image.includes('.') ? (
                  <ClubCard
                    image={cancha.image}
                    provincia={cancha.state}
                    ciudad={cancha.city}
                    clubName={cancha.club}
                    direccion={cancha.maps_location}
                    mapsLink={'cancha.mapsLink'}
                    tipo={cancha.type}
                  />
                ) : (
                  <ClubCard
                    provincia={cancha.state}
                    ciudad={cancha.city}
                    clubName={cancha.club}
                    direccion={cancha.maps_location}
                    mapsLink={'cancha.mapsLink'}
                    tipo={cancha.type}
                  />
                )}
              </article>
            ))
          : 'No hay canchas aprobadas'}
      </section>
    </main>
  );
}
