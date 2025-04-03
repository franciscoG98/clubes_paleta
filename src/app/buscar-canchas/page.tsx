'use client';

import { useEffect, useState } from 'react';
import { getCanchas } from '@/lib/getClubes';
import ClubCard from '@/components/ClubCard';
import { Cancha } from '@/types/club';

export default function BuscarCanchas() {
  const [result, setResult] = useState<Cancha[]>([]);

  const [provinciaFilter, setProvinciaFilter] = useState('');
  const [tipoCanchaFilter, setTipoCanchaFilter] = useState<string[]>([]);
  const [provinciaOptions, setProvinciaOptions] = useState<string[]>([]);

  // TODO: loading state when lookin diferent of first load
  useEffect(() => {
    const fetchData = async () => {
      const clubes = await getCanchas();

      setResult(clubes);

      const provincias = Array.from(
        new Set(clubes.map((club: Cancha) => club.state)),
      );
      setProvinciaOptions(provincias as string[]);
    };

    fetchData();
  }, []);

  const handleProvinciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvinciaFilter(e.target.value);
  };

  const handleTipoCanchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setTipoCanchaFilter((prev) =>
      checked ? [...prev, value] : prev.filter((tipo) => tipo !== value),
    );
  };

  const filteredClubes = result.filter((club) => {
    const provinciaMatches =
      provinciaFilter === '' || club.state === provinciaFilter;
    const tipoCanchaMatches =
      tipoCanchaFilter.length === 0 || tipoCanchaFilter.includes(club.type);

    return provinciaMatches && tipoCanchaMatches;
  });

  const handleResetFilters = () => {
    setProvinciaFilter('');
    setTipoCanchaFilter([]);
  };

  return (
    <main className="row-start-2 mx-auto flex w-3/4 flex-col gap-8 sm:items-start">
      {/* <h1 className="mx-auto mt-12 text-2xl font-bold">Busca tu Cancha</h1> */}

      <div className="mx-auto my-8 text-center">
        <h1 className="mb-3 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-3xl font-bold text-transparent">
          Busca tu Cancha
        </h1>
        <p className="max-w-lg px-4">
          Encontrá las mejores canchas de pelota a paleta en todo el país.
          Filtrá por provincia o tipo de cancha.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mx-auto mb-8 flex flex-col gap-4 rounded-lg bg-white px-12 py-6 shadow-md md:flex-row">
        <div className="flex gap-3">
          <label className="" htmlFor="provinciaFilter">
            Provincia:
            <select
              className="w-full rounded-md border border-slate-400 bg-white p-2"
              id="provinciaFilter"
              value={provinciaFilter}
              onChange={handleProvinciaChange}
            >
              <option value="" hidden>
                Seleccione una provincia
              </option>
              {provinciaOptions.map((provincia, index) => (
                <option className="" key={index} value={provincia}>
                  {provincia}
                </option>
              ))}
            </select>
          </label>

          <label className="mb-2 block">
            Tipo de Cancha:
            <div className="mt-2 flex gap-2">
              <label className="flex items-center gap-2">
                <input
                  className="size-6 rounded-sm border border-slate-400 focus:ring-blue-300"
                  type="checkbox"
                  value="Trinquete"
                  checked={tipoCanchaFilter.includes('Trinquete')}
                  onChange={handleTipoCanchaChange}
                />
                Trinquete
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="size-6 rounded-sm border border-slate-400 focus:ring-blue-300"
                  value="Frontón"
                  checked={tipoCanchaFilter.includes('Frontón')}
                  onChange={handleTipoCanchaChange}
                />
                Frontón
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="size-6 rounded-sm border border-slate-400 focus:ring-blue-300"
                  value="Otro"
                  checked={tipoCanchaFilter.includes('Otro')}
                  onChange={handleTipoCanchaChange}
                />
                Otro
              </label>
            </div>
          </label>

          <button
            className="mb-2 flex h-fit flex-wrap justify-center self-end whitespace-nowrap rounded-md border border-none bg-gray-900 px-4 py-2 font-semibold text-white hover:bg-gray-700"
            onClick={handleResetFilters}
          >
            Borrar Filtros
          </button>
        </div>
      </div>

      {/* Result Section */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-8">
        {filteredClubes.length > 0 ? (
          filteredClubes.map((club, idx) => {
            return (
              <ClubCard
                key={idx}
                image={club.image}
                ciudad={club.city}
                provincia={club.state}
                clubName={club.club}
                direccion={club.maps_location}
                tipo={club.type}
                contacto2={club.phone}
              />
            );
          })
        ) : (
          <span>
            Lo siento, no encontramos la combinacion de cancha y lugar que está
            buscando
          </span>
        )}
      </div>
    </main>
  );
}
