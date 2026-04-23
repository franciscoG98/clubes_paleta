"use client";

import { useState, useEffect } from "react";
import {
  getPendingCanchas,
  togglePendingCancha,
  approveCancha,
  rejectCancha,
} from "@/lib/getClubes";
import { Cancha } from "@/types/club";
import { toast } from "nextjs-toast-notify";
import ClubCard from "@/components/ClubCard";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";

export default function PendingCanchasPage() {
  const [canchasToReview, setCanchasToReview] = useState<Cancha[]>([]);

  useEffect(() => {
    getPendingCanchas()
      .then(res => {
        setCanchasToReview(res.filter((cancha: Cancha) => cancha.pending));
      })
      .catch(err => console.log("Error:", err));
  }, []);

  async function handleApprove(id: number) {
    const res = await togglePendingCancha(id, false);
    const res2 = await approveCancha(id);

    if (res?.ok && res2?.ok) {
      toast.success("Cancha aprobada exitosamente!", {
        duration: 2500,
        progress: true,
        position: "top-center",
        transition: "bottomToTopBounce",
        icon: "",
        sound: false,
      });
    }

    setCanchasToReview(prev => prev.filter(c => c.id !== id));
  }

  async function handleReject(id: number) {
    const res = await rejectCancha(id);

    if (res?.ok) {
      toast.success("Cancha rechazada exitosamente!", {
        duration: 2500,
        progress: true,
        position: "top-center",
        transition: "bottomToTopBounce",
        icon: "",
        sound: false,
      });
    }

    setCanchasToReview(prev => prev.filter(c => c.id !== id));
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8">
      <h1 className="text-2xl font-bold">Canchas pendientes de revisión</h1>

      {canchasToReview.length === 0 ? (
        <p className="text-muted-foreground">
          No hay canchas pendientes de aprobación.
        </p>
      ) : (
        <section className="flex flex-wrap justify-center gap-8">
          {canchasToReview.map(cancha => (
            <div key={cancha.id} className="flex flex-col gap-3">
              <ClubCard
                club={cancha.club}
                city={cancha.city}
                state={cancha.state}
                maps_location={cancha.maps_location}
                type={cancha.type}
                address={cancha.address}
                phone={cancha.phone}
                image={cancha.image}
              />
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  className="flex-1 gap-1"
                  onClick={() => handleReject(cancha.id as number)}
                >
                  <XIcon className="size-4" /> Rechazar
                </Button>
                <Button
                  className="flex-1 gap-1"
                  onClick={() => handleApprove(cancha.id as number)}
                >
                  <CheckIcon className="size-4" /> Aprobar
                </Button>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
