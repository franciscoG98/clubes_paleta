'use client';

import { useState } from 'react';
import { createPendingCancha } from '@/lib/getClubes';
import SelectProvince from '@/components/forms/SelectProvince';
import SelectCity from '@/components/forms/SelectCity';
import Image from 'next/image';
import { Cancha, TipoDeCancha } from '@/types/club';
import { MapPin, Phone, Upload } from 'lucide-react';
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
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors: Record<string, string> = {};
  if (!formData.club.trim()) errors.club = 'El nombre del club es obligatorio.';
  if (!formData.state) errors.state = 'Seleccioná una provincia.';
  if (!formData.city) errors.city = 'Seleccioná una ciudad.';
  if (!formData.maps_location.trim()) {
    errors.maps_location = 'La dirección es obligatoria.';
  }
  if (!formData.phone || String(formData.phone).replace(/\D/g, '').length < 8)
    errors.phone = 'Ingresá un teléfono válido (mínimo 8 dígitos).';

  const touch = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const isFormValid = Object.keys(errors).length === 0;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isFormValid) {
      setTouched({
        club: true,
        state: true,
        city: true,
        maps_location: true,
        phone: true,
      });
      return;
    }

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

      setFormData(initialFormData);
      setPreviewImage('');
      setTouched({});
    } else {
      toast.error('Error al crear la cancha. Intentá de nuevo.', {
        duration: 3000,
        progress: true,
        position: 'top-center',
        transition: 'bottomToTopBounce',
        icon: '',
        sound: false,
      });
    }

    setLoading(false);
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
              <label className="font-semibold">
                Nombre del Club <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full rounded-md ${touched.club && errors.club ? 'border-red-500 focus:ring-red-300' : ''}`}
                placeholder="Club"
                value={formData.club}
                name="club"
                onBlur={() => touch('club')}
                onChange={(e) =>
                  setFormData({ ...formData, club: e.target.value })
                }
              />
              {touched.club && errors.club && (
                <p className="mt-1 text-sm text-red-500">{errors.club}</p>
              )}
            </fieldset>

            <fieldset>
              <SelectProvince
                handleProvince={(e) => {
                  setFormData({ ...formData, state: e.target.value, city: '' });
                }}
                onBlur={() => touch('state')}
                error={touched.state ? errors.state : undefined}
              />
            </fieldset>

            <fieldset>
              <SelectCity
                selectedProvince={formData.state}
                handleCity={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                onBlur={() => touch('city')}
                error={touched.city ? errors.city : undefined}
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
              <label className="font-semibold">
                Dirección <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full rounded-md ${touched.maps_location && errors.maps_location ? 'border-red-500 focus:ring-red-300' : ''}`}
                placeholder="Ej: Av. San Martín 1234"
                value={formData.maps_location}
                name="maps_location"
                onBlur={() => touch('maps_location')}
                onChange={(e) =>
                  setFormData({ ...formData, maps_location: e.target.value })
                }
              />
              {touched.maps_location && errors.maps_location && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.maps_location}
                </p>
              )}
            </fieldset>

            <fieldset>
              <label className="font-semibold">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                inputMode="numeric"
                className={`w-full rounded-md ${touched.phone && errors.phone ? 'border-red-500 focus:ring-red-300' : ''}`}
                placeholder="Ej: 2944112233"
                value={formData.phone || ''}
                name="phone"
                onBlur={() => touch('phone')}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '');
                  setFormData({ ...formData, phone: Number(digits) });
                }}
              />
              {touched.phone && errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
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
        <article className="m-4 w-full rounded-xl border-2 p-4">
          <header>
            <h3 className="my-2 flex items-center gap-2 text-xl font-semibold">
              <Upload className="size-5 text-green-500" />
              Foto de la cancha
            </h3>
          </header>
          <div className="mt-8 flex justify-around">
            <div className="relative flex size-72 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center transition-colors hover:bg-gray-50">
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
              <div className="flex flex-col">
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
            className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-4 text-xl font-semibold text-white hover:from-green-700 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar cancha'}
          </button>
        </div>
      </form>
    </main>
  );
}
