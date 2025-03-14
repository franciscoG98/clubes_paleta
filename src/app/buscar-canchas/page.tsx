'use client';

import { useEffect, useState } from 'react';
import { getClubes } from '@/lib/getClubes';
import ClubCard from '@/components/ClubCard';
import { Club } from '@/types/club';

// @fix: combine with new select component

export default function Filter() {
  const [result, setResult] = useState<Club[]>([]);

  const [provinciaFilter, setProvinciaFilter] = useState('');
  const [tipoCanchaFilter, setTipoCanchaFilter] = useState<string[]>([]);
  const [provinciaOptions, setProvinciaOptions] = useState<string[]>([]);

  // @fix: loading state when lookin diferent of first load

  useEffect(() => {
    const fetchData = async () => {
      const clubes = await getClubes();

      const uniqueClubes = clubes.filter(
        (club, index, self) =>
          index === self.findIndex((c) => c.clubName === club.clubName),
      );

      setResult(uniqueClubes);

      const provincias = Array.from(
        new Set(uniqueClubes.map((club) => club.provincia)),
      );
      setProvinciaOptions(provincias);
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
      provinciaFilter === '' || club.provincia === provinciaFilter;
    const tipoCanchaMatches =
      tipoCanchaFilter.length === 0 || tipoCanchaFilter.includes(club.tipo);

    return provinciaMatches && tipoCanchaMatches;
  });

  const handleResetFilters = () => {
    setProvinciaFilter('');
    setTipoCanchaFilter('');
  };

  return (
    <main className="row-start-2 mx-auto flex w-3/4 flex-col gap-8 sm:items-start">
      <h1 className="mx-auto mt-12 text-2xl font-bold">Busca tu Cancha</h1>

      {/* filters */}
      <div className="mx-auto flex w-fit flex-col justify-around gap-4 md:flex-row md:items-end">
        {/* provincia */}
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

        {/* tipo de cancha */}
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
          className="mb-2 flex flex-wrap justify-center whitespace-nowrap rounded-md border border-none bg-black px-3 py-1.5 font-semibold text-white hover:bg-green-400 hover:text-black"
          onClick={handleResetFilters}
        >
          Borrar Filtros
        </button>
      </div>

      <div className="mb-12 flex flex-wrap items-center justify-center gap-8">
        {filteredClubes.length > 0 ? (
          filteredClubes.map((club, idx) => {
            return (
              <ClubCard
                key={idx}
                provincia={club.provincia}
                ciudad={club.ciudad}
                clubName={club.clubName}
                direccion={club.direccion}
                mapsLink={club.mapsLink}
                tipo={club.tipo}
                contacto={club.contacto}
                contacto2={club.contacto2}
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
