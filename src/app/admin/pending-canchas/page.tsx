'use client';

import { useState, useEffect } from 'react';
import {
  getPendingCanchas,
  togglePendingCancha,
  approveCancha,
} from '@/lib/getClubes';
import { Cancha } from '@/types/club';
import { toast } from 'nextjs-toast-notify';
import ClubCard from '@/components/ClubCard';
// import { auth } from '@/auth';

export default function PendingCanchasPage() {
  const [canchasToReview, setCanchasToReview] = useState<Cancha[]>([]);

  useEffect(() => {
    getPendingCanchas()
      .then((res) => {
        setCanchasToReview(res.filter((cancha) => cancha.pending));
      })
      .catch((err) => console.log('Error:', err));
  }, []);

  async function handleApprove(id: string) {
    const res = await togglePendingCancha(parseInt(id), false);
    const res2 = await approveCancha(parseInt(id));

    if (res2?.ok) {
      toast.success('paso gato', {
        duration: 4000,
        progress: true,
        position: 'bottom-center',
        transition: 'bottomToTopBounce',
        icon: '',
        sound: false,
      });
    }

    if (res?.ok) {
      toast.success('Cancha Aprobada, dale masa nomas vieja!', {
        duration: 4000,
        progress: true,
        position: 'top-center',
        transition: 'bottomToTopBounce',
        icon: '',
        sound: false,
      });
    }

    setCanchasToReview(
      canchasToReview.filter(
        (canchaToReview) => canchaToReview.id !== parseInt(id),
      ),
    );
  }

  // TODO: reject!!!!
  return (
    <main className="mx-auto flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Canchas pendientes de Revisión</h1>

      <section className="m-12 flex flex-wrap justify-center gap-12">
        {canchasToReview.length > 0
          ? canchasToReview.map((canchaToReview) => (
              <article
                className="relative flex flex-col justify-between rounded-xl border border-slate-400 bg-white"
                key={canchaToReview.id}
              >
                <ClubCard
                  image={canchaToReview.image}
                  provincia={canchaToReview.state}
                  ciudad={canchaToReview.city}
                  clubName={canchaToReview.club}
                  direccion={canchaToReview.maps_location}
                  mapsLink={'canchaToReview.mapsLink'}
                  tipo={canchaToReview.type}
                  contacto2={canchaToReview.phone}
                />

                {/* TODO: id type */}
                <button className="absolute bottom-0 left-0 w-1/2 rounded-bl-md bg-red-500 p-2 font-semibold text-white">
                  no anda
                </button>

                {/* TODO: id type */}
                <button
                  className="absolute bottom-0 right-0 w-1/2 rounded-br-md bg-blue-500 p-2 font-semibold text-white"
                  onClick={() => handleApprove(canchaToReview.id)}
                >
                  ✅ Aprobar
                </button>

                {/* TODO: togglePendingCancha */}
              </article>
            ))
          : 'No hay canchas para aprobar'}
      </section>
    </main>
  );
}
