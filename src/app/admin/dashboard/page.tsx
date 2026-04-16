"use client";

import { useEffect, useState } from "react";
import { deleteCancha, getCanchas, updateCancha } from "@/lib/getClubes";
import { Cancha, TipoDeCancha } from "@/types/club";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
import { toast } from "nextjs-toast-notify";

export default function ApprovedCanchasPage() {
  const [clubes, setClubes] = useState<Cancha[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Cancha>>({});

  useEffect(() => {
    getCanchas()
      .then((res) => {
        setClubes(res);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  const handleDelete = async (id: number, clubName: string) => {
    if (
      !confirm(
        `¿Seguro que querés eliminar "${clubName}"? Esta acción no se puede deshacer.`,
      )
    )
      return;

    const res = await deleteCancha(id);
    if (res.ok) {
      setClubes((prev) => prev.filter((c) => c.id !== id));
      toast.success("Cancha eliminada", {
        duration: 2000,
        progress: true,
        position: "top-center",
        transition: "bottomToTopBounce",
        icon: "",
        sound: false,
      });
    }
  };

  const handleEditStart = (cancha: Cancha) => {
    setEditingId(cancha.id as number);
    setEditData({
      club: cancha.club,
      city: cancha.city,
      state: cancha.state,
      type: cancha.type,
      maps_location: cancha.maps_location,
      phone: cancha.phone,
    });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleEditSave = async (id: number) => {
    const res = await updateCancha(id, editData);
    if (res.ok) {
      setClubes((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...editData } : c)),
      );
      toast.success("Cancha actualizada", {
        duration: 2000,
        progress: true,
        position: "top-center",
        transition: "bottomToTopBounce",
        icon: "",
        sound: false,
      });
      setEditingId(null);
      setEditData({});
    } else {
      toast.error("Error al actualizar la cancha", {
        duration: 3000,
        progress: true,
        position: "top-center",
        transition: "bottomToTopBounce",
        icon: "",
        sound: false,
      });
    }
  };

  return (
    <main className="mx-auto flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="w-full overflow-x-auto rounded-lg border-2">
        <table className="min-w-full table-auto divide-y divide-neutral-300 bg-neutral-100">
          <thead className="bg-neutral-300">
            <tr>
              <th className="border-collapse border-r-2 border-neutral-100 p-4 text-start">
                Club
              </th>
              <th className="border-collapse border-x-2 border-neutral-100 p-4 text-start">
                Provincia
              </th>
              <th className="border-collapse border-x-2 border-neutral-100 p-4 text-start">
                Ciudad
              </th>
              <th className="border-collapse border-x-2 border-neutral-100 p-4 text-start">
                Tipo
              </th>
              <th className="border-collapse border-x-2 border-neutral-100 p-4 text-start">
                Editar
              </th>
              <th className="border-collapse border-l-2 border-neutral-100 p-4 text-start">
                Eliminar
              </th>
            </tr>
          </thead>

          <tbody className="p-8">
            {clubes.map((c) =>
              editingId === c.id ? (
                <tr key={c.id} className="bg-green-50">
                  <td className="border-collapse border-r-2 border-neutral-300 p-2">
                    <input
                      className="w-full rounded border p-1 text-sm"
                      value={editData.club ?? ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          club: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td className="border-collapse border-x-2 border-neutral-300 p-2">
                    <input
                      className="w-full rounded border p-1 text-sm"
                      value={editData.state ?? ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td className="border-collapse border-x-2 border-neutral-300 p-2">
                    <input
                      className="w-full rounded border p-1 text-sm"
                      value={editData.city ?? ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td className="border-collapse border-x-2 border-neutral-300 p-2">
                    <select
                      className="w-full rounded border p-1 text-sm"
                      value={editData.type ?? ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          type: e.target.value as TipoDeCancha,
                        }))
                      }
                    >
                      <option value="Trinquete">Trinquete</option>
                      <option value="Frontón">Frontón</option>
                      <option value="Cajón">Cajón</option>
                    </select>
                  </td>
                  <td className="border-collapse border-x-2 border-neutral-300 p-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSave(c.id as number)}
                        className="flex items-center gap-1 text-green-700 hover:underline"
                      >
                        <MdCheck size={18} /> Guardar
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="flex items-center gap-1 text-gray-500 hover:underline"
                      >
                        <MdClose size={18} /> Cancelar
                      </button>
                    </div>
                  </td>
                  <td className="border-collapse border-l-2 border-neutral-300 p-2" />
                </tr>
              ) : (
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
                  <td className="border-collapse border-x-2 border-neutral-300 p-4">
                    {c.type}
                  </td>
                  <td className="border-collapse border-x-2 border-neutral-300 p-4">
                    <button
                      onClick={() => handleEditStart(c)}
                      className="flex items-center gap-1 hover:text-green-700 hover:underline"
                    >
                      <MdEdit color="green" /> Editar
                    </button>
                  </td>
                  <td className="border-collapse border-l-2 border-neutral-300 p-4">
                    <button
                      onClick={() => handleDelete(c.id as number, c.club)}
                      className="flex items-center gap-1 hover:text-red-500 hover:underline"
                    >
                      <MdDelete fill="#BA3737" /> Eliminar
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
