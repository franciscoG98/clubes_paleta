'use client';

import { useEffect, useState } from 'react';
import { getCanchas } from '@/lib/getClubes';
import { Cancha } from '@/types/club';
import { MdEdit, MdDelete } from 'react-icons/md';

export default function ApprovedCanchasPage() {
  const [clubes, setClubes] = useState<Cancha[]>([]);

  useEffect(() => {
    getCanchas()
      .then((res) => {
        setClubes(res);
      })
      .catch((err) => console.log('Error:', err));
  }, []);

  return (
    <main className="mx-auto flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Canchas Aprobadas</h1>

      <div className="overflow-hidden rounded-lg border-2">
        <table className="min-w-full table-auto divide-y divide-neutral-300 bg-neutral-100">
          <thead className="bg-neutral-300">
            <tr>
              <th
                scope="col"
                className="border-collapse border-r-2 border-neutral-100 p-4 text-start"
              >
                Club
              </th>
              <th
                scope="col"
                className="border-collapse border-x-2 border-neutral-100 p-4 text-start"
              >
                Provincia
              </th>
              <th
                scope="col"
                className="border-collapse border-x-2 border-neutral-100 p-4 text-start"
              >
                Ciudad
              </th>
              <th
                scope="col"
                className="border-collapse border-x-2 border-neutral-100 p-4 text-start"
              >
                Tipo
              </th>
              <th
                scope="col"
                className="border-collapse border-x-2 border-neutral-100 p-4 text-start"
              >
                Editar
              </th>
              <th
                scope="col"
                className="border-collapse border-l-2 border-neutral-100 p-4 text-start"
              >
                Eliminar
              </th>
            </tr>
          </thead>

          <tbody className="p-8">
            {clubes.map((c) => (
              <tr key={c.id}>
                <td className="border-collapse border-r-2 border-neutral-300 p-4">
                  {c.club}
                </td>
                <td className="border-collapse border-x-2 border-neutral-300 p-4">
                  {c.state}
                </td>
                <td className="border-collapse border-x-2 border-neutral-300 p-4">
                  {c.city}
                </td>
                <td className="border-collapse border-l-2 border-neutral-300 p-4">
                  {c.type}
                </td>
                {/* TODO crud buttons */}
                <td className="border-collapse border-l-2 border-neutral-300 p-4">
                  <button className="flex items-center justify-between hover:text-green-800 hover:underline">
                    <MdEdit color="green" /> Editar
                  </button>
                </td>
                <td className="border-collapse border-l-2 border-neutral-300 p-4">
                  <button className="flex items-center justify-between hover:text-red-500 hover:underline">
                    <MdDelete fill="#BA3737" /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
