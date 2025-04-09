'use client';

import { useEffect, useState } from 'react';
import { getCanchas } from '@/lib/getClubes';
import ClubCard from '@/components/ClubCard';
import Spinner from '@/components/Spinner';
import { Slider } from '@/components/Slider';
import { Cancha } from '@/types/club';
import Link from 'next/link';

import { MapPin, Search } from 'lucide-react';

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
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-green-900 to-emerald-800 px-4 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center" />
        </div>
        <div className="container relative z-10 mx-auto max-w-5xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Todas las canchas de Pelota a Paleta
            <br />
            <span className="text-green-300">en un solo lugar</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            Encuentra tu cancha más cercana y disfruta de partidos a donde vayas
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-lg bg-white text-green-800 hover:bg-green-100">
              <Link
                href="/buscar-canchas"
                className="flex gap-2 p-4 font-semibold"
              >
                <Search className="mr-2 size-5" />
                Buscar Canchas
              </Link>
            </button>
            <button className="rounded-lg border border-white text-white hover:bg-white/10">
              <Link
                href="/suma-tu-cancha"
                className="flex gap-2 p-4 font-semibold"
              >
                <MapPin className="mr-2 size-5" />
                Sumá tu Cancha
              </Link>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-3/4 flex-col gap-8 p-8">
        {/* Historical Section */}
        <div className="mb-6 text-center">
          <h2 className="mb-3 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-3xl font-bold text-transparent">
            Historia de la Pelota a Paleta
          </h2>
          <p className="mx-auto max-w-2xl">
            Conocé los orígenes y la evolución de este deporte tradicional
          </p>
        </div>
        <Slider />

        {clubes && clubes.length > 0 ? (
          <section className="flex flex-wrap items-center justify-center gap-8">
            {clubes.map((cancha) => (
              <ClubCard
                key={cancha.id}
                club={cancha.club}
                city={cancha.city}
                state={cancha.state}
                maps_location={cancha.maps_location}
                type={cancha.type}
                phone={cancha.phone}
                image={cancha.image}
              />
            ))}
          </section>
        ) : (
          <Spinner />
        )}
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-500 px-4 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            ¿Tenés una cancha que no está en nuestra plataforma?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Sumá tu cancha a nuestra comunidad y hacela visible para todos los
            jugadores
          </p>

          <button className="rounded-lg bg-white text-green-800 hover:bg-green-100">
            <Link
              href="/suma-tu-cancha"
              className="flex gap-2 p-4 font-semibold"
            >
              Registrar mi cancha
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}
