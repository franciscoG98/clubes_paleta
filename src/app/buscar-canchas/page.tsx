'use client';

import { useEffect, useState } from 'react';
import getClubes from '@/lib/getClubes';
import ClubCard from '@/components/ClubCard';

export default function Filter() {
  const [result, setResult] = useState([]);

  const [provinciaFilter, setProvinciaFilter] = useState('');
  const [tipoCanchaFilter, setTipoCanchaFilter] = useState('');
  const [provinciaOptions, setProvinciaOptions] = useState([]);

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

  const handleProvinciaChange = (e) => {
    setProvinciaFilter(e.target.value);
  };

  const handleTipoCanchaChange = (e) => {
    setTipoCanchaFilter(e.target.value);
  };

  const filteredClubes = result.filter((club) => {
    const provinciaMatches =
      provinciaFilter === '' || club.provincia === provinciaFilter;
    const tipoCanchaMatches =
      tipoCanchaFilter === '' || club.tipo === tipoCanchaFilter;

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
            className="w-full rounded-md border border-foreground bg-white p-2"
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
        <label className="" htmlFor="tipoCanchaFilter">
          Tipo de Cancha:
          <select
            className="w-full rounded-md border border-foreground bg-white p-2"
            id="tipoCanchaFilter"
            value={tipoCanchaFilter}
            onChange={handleTipoCanchaChange}
          >
            <option value="" hidden>
              Seleccione un tipo de cancha
            </option>
            <option className="" value={'Trinquete'}>
              {'Trinquete'}
            </option>
            <option className="" value={'Frontón'}>
              {'Frontón'}
            </option>
          </select>
        </label>

        <button
          className="flex flex-wrap justify-center whitespace-nowrap rounded-md border border-foreground bg-foreground px-3 py-2 font-semibold text-background hover:bg-background hover:text-foreground"
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
