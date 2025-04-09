'use client';

import { useState } from 'react';
import { createPendingCancha } from '@/lib/getClubes';
import SelectProvince from '@/components/forms/SelectProvince';
import SelectCity from '@/components/forms/SelectCity';
import Image from 'next/image';
import { Cancha, TipoDeCancha } from '@/types/club';
import { MapPin, Phone, Upload } from 'lucide-react';
// import { MapPin, Phone, Clock, Upload } from 'lucide-react';
import { toast } from 'nextjs-toast-notify';

export default function SumaTuCancha() {
  const initialFormData = {
    club: '',
    city: '',
    state: '',
    type: 'Trinquete' as TipoDeCancha,
    maps_location: '',
    phone: 0,
    image: null as File | null | string,
  };

  const [formData, setFormData] = useState<Cancha>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  // const services = [
  //   { id: 'rental', label: 'Venta de Equipo (pelotas, paletas, protectores)' },
  //   { id: 'lockers', label: 'Vestuarios' },
  //   { id: 'parking', label: 'Estacionamiento' },
  //   { id: 'bar', label: 'Bar/Cafetería' },
  //   { id: 'lighting', label: 'Iluminación nocturna' },
  //   { id: 'coach', label: 'Clases/Escuelita' },
  // ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await createPendingCancha(formData);

    if (res!.ok) {
      toast.success('Cancha creada con éxito!', {
        duration: 2500,
        progress: true,
        position: 'top-center',
        transition: 'bottomToTopBounce',
        icon: '',
        sound: false,
      });

      setFormData({ ...formData, image: '' });
      setFormData(initialFormData);
      setLoading(false);
    } else {
      console.error('Error al crear la cancha');
    }
  }

  return (
    <main className="mx-12 flex flex-col justify-center pb-12 md:mx-auto md:w-1/2">
      <div className="mb-10 text-center">
        <h1 className="mb-3 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-3xl font-bold text-transparent">
          Sumá tu cancha y hacela visible para todos
        </h1>
        <p className="mx-auto max-w-2xl">
          Registrá tu cancha para que más personas puedan encontrarla. Aumentá
          la visibilidad de tu espacio deportivo y conectate con nuevos
          jugadores.
        </p>
      </div>

      {/* TODO: add required * and touched properties */}
      <form onSubmit={handleSubmit}>
        {/* Datos básicos */}
        <article className="m-4 w-full rounded-xl border-2 p-4">
          <header className="flex flex-col gap-2">
            <h3 className="flex items-center gap-2 text-xl font-semibold">
              <MapPin className="size-5 text-green-500" />
              Datos básicos de la cancha
            </h3>
            <p className="text-gray-500">
              Información principal para identificar tu cancha
            </p>
          </header>
          <section className="space-y-4">
            <fieldset>
              <label className="font-semibold">Nombre del Club</label>
              <input
                type="text"
                className="w-full rounded-md"
                placeholder="Club"
                value={formData.club}
                name="club"
                required
                onChange={(e) =>
                  setFormData({ ...formData, club: e.target.value })
                }
              />
            </fieldset>

            <fieldset>
              <SelectProvince
                handleProvince={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              />
            </fieldset>

            <fieldset>
              <SelectCity
                selectedProvince={formData.state}
                handleCity={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </fieldset>

            <fieldset>
              <label className="font-semibold">Tipo de cancha</label>
              <select
                value={formData.type}
                name="type"
                className="w-full rounded-md"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as TipoDeCancha,
                  })
                }
              >
                {/* <option value="" disabled>
                  --Tipo de cancha--
                </option> */}
                <option value="Trinquete">Trinquete</option>
                <option value="Frontón">Frontón</option>
                <option value="Cajón">Cajón</option>
              </select>
            </fieldset>
          </section>
        </article>

        <article className="m-4 w-full rounded-xl border-2 p-4">
          <header className="flex flex-col gap-2">
            <h3 className="flex items-center gap-2 text-xl font-semibold">
              <Phone className="size-5 text-green-500" />
              Información de contacto
            </h3>
            <p className="text-gray-500">
              Datos para que los usuarios puedan comunicarse
            </p>
          </header>

          <section className="space-y-4">
            <fieldset>
              <label className="font-semibold">Dirección</label>
              <input
                type="text"
                className="w-full rounded-md"
                placeholder="Ubicacion en Maps"
                value={formData.maps_location}
                name="maps_location"
                onChange={(e) =>
                  setFormData({ ...formData, maps_location: e.target.value })
                }
                required
              />
            </fieldset>

            <fieldset>
              <label className="font-semibold">Teléfono</label>
              {/* TODO type phone length etc */}
              <input
                type="number"
                className="w-full rounded-md"
                placeholder="Teléfono ejemplo 110303456"
                value={formData.phone}
                name="phone"
                onChange={(e) =>
                  setFormData({ ...formData, phone: parseInt(e.target.value) })
                }
                required
              />
            </fieldset>

            {/* TODO create this fields in models, check which is required at least one or phone or social media */}
            {/* <fieldset>
              <label className="font-semibold">Instagram</label>
              <input
                type="text"
                className="w-full rounded-md"
                placeholder="Usuario de Instagram"
              />
            </fieldset>

            <fieldset>
              <label className="font-semibold">Facebook</label>
              <input
                type="text"
                className="w-full rounded-md"
                placeholder="Link de cuenta de Facebook"
              />
            </fieldset>

            <fieldset>
              <label className="font-semibold">Página Web</label>
              <input
                type="text"
                className="w-full rounded-md"
                placeholder="Página Web del Club"
              />
            </fieldset> */}
          </section>
        </article>

        {/* TODO Detalles adicionales */}
        {/* <article className="m-4 w-full rounded-xl border-2 p-4">
          <header className="flex flex-col gap-2">
            <h3 className="flex items-center gap-2 text-xl font-semibold">
              <Clock className="size-5 text-green-500" />
              Detalles adicionales (Opcional)
            </h3>
            <p>Información complementaria sobre tu cancha</p>
          </header>
          <section className="space-y-6">
            <h4 className="mb-3 text-sm font-medium text-neutral-500">
              Servicios disponibles
            </h4>
            <fieldset className="flex flex-col gap-2 lg:grid lg:grid-cols-2">
              {services.map((service) => (
                <label key={service.id} className="flex items-start gap-2">
                  <input
                    className="size-6 rounded-sm border border-slate-400 focus:ring-blue-300"
                    type="checkbox"
                  />
                  {service.label}
                </label>
              ))}
            </fieldset>

            <fieldset className="flex flex-col">
              <label>Horarios de funcionamiento</label>
              <span className="text-sm font-medium text-neutral-500">
                A qué hora la gente suele ir a jugar
              </span>
              <textarea
                rows={4}
                placeholder="Ej: Lunes a Viernes: 8:00 - 22:00, Sábados y Domingos: 9:00 - 20:00"
              />
            </fieldset>
          </section>
        </article> */}

        {/* Subir imágenes */}
        {/* TODO remove image btn */}
        <article className="m-4 w-full rounded-xl border-2 p-4">
          <header>
            <h3 className="my-2 flex items-center gap-2 text-xl font-semibold">
              <Upload className="size-5 text-green-500" />
              Foto de la cancha
            </h3>
          </header>
          <div className="flex">
            <div className="relative flex w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center transition-colors hover:bg-gray-50">
              <Upload className="mb-2 size-8 text-gray-400" />
              <button type="button">Seleccionar archivos</button>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 size-full cursor-pointer opacity-0"
                onChange={(e) => handleImageChange(e)}
              />
            </div>

            {previewImage && (
              <div className="mx-auto flex flex-col">
                <div className="group relative aspect-square w-72">
                  <Image
                    src={previewImage}
                    alt="Vista previa de cancha a subir"
                    fill
                    className="rounded-2xl object-cover"
                  />
                </div>
                <h4 className="my-3 text-center text-sm font-medium">
                  Vista previa de cancha a subir
                </h4>
              </div>
            )}
          </div>
        </article>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-4 text-xl font-semibold text-white hover:from-green-700 hover:to-emerald-600"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar cancha'}
          </button>
        </div>
      </form>
    </main>
  );
}
