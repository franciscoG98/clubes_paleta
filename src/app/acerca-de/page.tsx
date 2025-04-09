import Link from 'next/link';

import {
  MapPin,
  // Share2,
  Coffee,
  // MessageSquare,
  Heart,
  // Instagram,
  // Twitter,
  // Facebook,
  ArrowRight,
} from 'lucide-react';

export default function AcercaDePage() {
  return (
    <main className="mx-12 flex flex-col items-center md:mx-auto md:w-3/4">
      {/* Hero Section */}
      <div className="relative mb-16 overflow-hidden rounded-xl bg-gradient-to-r from-green-900/90 to-emerald-800/80 p-8 text-white">
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <h1 className="mb-4 text-2xl font-bold  md:text-5xl">
            Sumate a nuestra comunidad y ayudanos a crecer
          </h1>
          <p className="max-w-2xl text-lg">
            Juntos podemos crear la red más completa de canchas de paleta. Tu
            participación hace la diferencia para que más personas puedan
            disfrutar y conocer el deporte.
          </p>
        </div>
      </div>

      {/* Formas de contribuir */}
      <div className="w-full">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Formas de contribuir
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Sugerir nuevas canchas */}
          <article className="rounded-xl border border-neutral-300 p-4 transition-all duration-500 hover:shadow-lg">
            <header className="pb-4">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-green-100">
                <MapPin className="size-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Sugerir nuevas canchas</h3>
              <p>¿Conocés una cancha que no está en nuestra plataforma?</p>
            </header>
            <div>
              <p className="text-sm">
                Ayudanos a mapear todas las canchas disponibles para que más
                personas puedan encontrarlas.
              </p>
            </div>
            <div>
              <Link
                href={'/suma-tu-cancha'}
                className="my-4 flex w-fit rounded-xl border-2 border-emerald-700 text-lg font-bold transition-all duration-500 hover:bg-emerald-700 hover:text-white"
              >
                <span className="flex size-full items-center justify-center px-6 py-4">
                  Sumá tu Cancha
                  <ArrowRight className="ml-2 size-4 " />
                </span>
              </Link>
            </div>
          </article>

          {/* Compartir con amigos */}
          {/* TODO make links to share in social media*/}
          {/* <article className="rounded-xl border border-neutral-300 p-4 transition-all duration-500 hover:shadow-lg">
            <header className="pb-4">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-100">
                <Share2 className="size-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Compartir con amigos</h3>
              <p>Difundí la plataforma entre tus contactos</p>
            </header>
            <div>
              <p className="text-sm">
                Mientras más personas conozcan la plataforma, más útil será para
                toda la comunidad.
              </p>
            </div>
            <div>
              <div className="flex w-full justify-center gap-4">
                <button className="rounded-full bg-blue-50 p-4 text-blue-600 transition-all duration-500 hover:bg-blue-200">
                  <Facebook className="size-12" />
                </button>
                <button className="rounded-full bg-sky-50 p-4 text-sky-600 transition-all duration-500 hover:bg-sky-200">
                  <Twitter className="size-12" />
                </button>
                <button className="rounded-full bg-pink-50 p-4 text-pink-600 transition-all duration-500 hover:bg-pink-200">
                  <Instagram className="size-12" />
                </button>
              </div>
            </div>
          </article> */}

          {/* TODO dar opcion de mandar feedback */}
          {/* Brindar soporte o feedback */}
          {/* <article className="rounded-xl border border-neutral-300 p-4 transition-all duration-500 hover:shadow-lg">
            <header className="pb-4">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-amber-100">
                <MessageSquare className="size-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold">Brindar feedback</h3>
              <p>Tu opinión nos ayuda a mejorar</p>
            </header>
            <div>
              <p className="text-sm">
                Contanos qué funcionalidades te gustaría ver o cómo podemos
                mejorar la experiencia.
              </p>
            </div>
            <div>
              <button className="my-4 flex w-fit rounded-xl border-2 border-emerald-700 text-lg font-bold transition-all duration-500 hover:bg-emerald-700 hover:text-white">
                <span className="flex size-full items-center justify-center px-6 py-4">
                  Enviar feedback
                  <ArrowRight className="ml-2 size-4" />
                </span>
              </button>
            </div>
          </article> */}

          {/* Colaborar con el proyecto */}
          <article className="rounded-xl border border-neutral-300 p-4 transition-all duration-500 hover:shadow-lg">
            <header className="pb-4">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-red-100">
                <Heart className="size-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">
                Colaborar con el proyecto
              </h3>
              <p>Apoyá el desarrollo de la plataforma</p>
            </header>
            <div>
              <p className="text-sm">
                Si te interesa colaborar de forma más activa, además de sumar tu
                cancha podes hacer una donacion por Cafecito App.
              </p>
            </div>
            <div>
              <Link
                href="https://cafecito.app/panch___"
                passHref
                className="m-4 flex w-fit justify-center rounded-xl border-2 border-blue-400 transition-all duration-500 hover:bg-blue-200"
              >
                <span className="flex size-full items-center px-6 py-4 text-lg font-semibold">
                  <Coffee className="mr-2 size-6" />
                  Invitame un Cafecito
                </span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
