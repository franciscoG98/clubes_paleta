'use client';

import { useState, useEffect } from 'react';
import {
  getPendingCanchas,
  togglePendingCancha,
  approveCancha,
  rejectCancha,
} from '@/lib/getClubes';
import { Cancha } from '@/types/club';
import { toast } from 'nextjs-toast-notify';
import ClubCard from '@/components/ClubCard';

export default function PendingCanchasPage() {
  const [canchasToReview, setCanchasToReview] = useState<Cancha[]>([]);

  useEffect(() => {
    getPendingCanchas()
      .then((res) => {
        setCanchasToReview(res.filter((cancha: Cancha) => cancha.pending));
      })
      .catch((err) => console.log('Error:', err));
  }, []);

  async function handleApprove(id: number) {
    // TODO: is necessary toogle pending cancha?
    const res = await togglePendingCancha(id, false);
    const res2 = await approveCancha(id);

    if (res?.ok && res2?.ok) {
      toast.success('Cancha Aprobada exitosamente!', {
        duration: 2500,
        progress: true,
        position: 'top-center',
        transition: 'bottomToTopBounce',
        icon: '',
        sound: false,
      });
    }

    setCanchasToReview(
      canchasToReview.filter((canchaToReview) => canchaToReview.id !== id),
    );
  }

  async function handleReject(id: number) {
    const res = await rejectCancha(id);

    if (res?.ok) {
      toast.success('Cancha Rechazada exitosamente!', {
        duration: 2500,
        progress: true,
        position: 'top-center',
        transition: 'bottomToTopBounce',
        icon: '',
        sound: false,
      });
    }

    setCanchasToReview(
      canchasToReview.filter((canchaToReview) => canchaToReview.id !== id),
    );
  }

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
                  club={canchaToReview.club}
                  city={canchaToReview.city}
                  state={canchaToReview.state}
                  maps_location={canchaToReview.maps_location}
                  type={canchaToReview.type}
                  phone={canchaToReview.phone}
                  image={canchaToReview.image}
                />

                <button
                  className="absolute bottom-0 left-0 w-1/2 rounded-bl-md bg-red-500 p-2 font-semibold text-white"
                  onClick={() => handleReject(canchaToReview.id as number)}
                >
                  ❌ Rechazar
                </button>

                <button
                  className="absolute bottom-0 right-0 w-1/2 rounded-br-md bg-blue-500 p-2 font-semibold text-white"
                  onClick={() => handleApprove(canchaToReview.id as number)}
                >
                  ✅ Aprobar
                </button>
              </article>
            ))
          : 'No hay canchas para aprobar'}
      </section>
    </main>
  );
}
