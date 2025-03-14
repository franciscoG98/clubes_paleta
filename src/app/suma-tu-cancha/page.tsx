'use client';

import { useState } from 'react';
import { createPendingCancha } from '@/lib/getClubes';
import SelectProvince from '@/components/forms/SelectProvince';
import SelectCity from '@/components/forms/SelectCity';

// @fix: el formulario deberia ser un componente??

export default function SumaTuCancha() {
  const initialFormData = {
    club: '',
    city: '',
    state: '',
    type: '',
    maps_location: '',
    phone: '',
    image: null as File | null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  // @fix: group all in single handleChange
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await createPendingCancha(formData);

    // @fix: add toast message
    if (res!.ok) {
      // @fix: el form no se limpia
      setFormData(initialFormData);
      setFormData({ ...formData, image: null });
      setLoading(false);
      alert('Cancha creada');
    } else {
      console.error('Error al crear la cancha');
    }
  }

  return (
    <main className="mx-12 mb-12 flex flex-col items-center md:mx-auto md:w-1/2">
      <h1 className="mt-8 text-center text-3xl font-semibold">
        Sumá tu Cancha
      </h1>

      {/* @fix: add required * and touched properties */}
      <form onSubmit={handleSubmit} className="mt-8 flex w-96 flex-col gap-4">
        <input
          type="text"
          className="rounded-md"
          placeholder="Club"
          value={formData.club}
          name="club"
          required
          onChange={(e) => setFormData({ ...formData, club: e.target.value })}
        />

        <SelectProvince
          handleProvince={(e) =>
            setFormData({ ...formData, state: e.target.value })
          }
        />

        <SelectCity
          selectedProvince={formData.state}
          handleCity={(e) => setFormData({ ...formData, city: e.target.value })}
        />

        <select
          value={formData.type}
          name="type"
          className="rounded-md"
          required
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="" disabled>
            --Tipo de cancha--
          </option>
          <option value="Trinquete">Trinquete</option>
          <option value="Frontón">Frontón</option>
          <option value="Cajón">Cajón</option>
        </select>

        {/* @fix: o direccion?? */}
        <input
          type="text"
          className="rounded-md"
          placeholder="Ubicacion en Maps"
          value={formData.maps_location}
          name="maps_location"
          onChange={(e) =>
            setFormData({ ...formData, maps_location: e.target.value })
          }
          required
        />

        <input
          type="tel"
          className="rounded-md"
          placeholder="Teléfono"
          value={formData.phone}
          name="phone"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />

        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          onChange={(e) => handleImageChange(e)}
          required
        />

        <button
          className="mx-auto w-fit rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-800"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </main>
  );
}
