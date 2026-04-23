"use client";

import { useEffect, useState } from "react";
import { deleteCancha, getCanchas, updateCancha } from "@/lib/getClubes";
import { Cancha, TipoDeCancha } from "@/types/club";
import { CheckIcon, XIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { toast } from "nextjs-toast-notify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ApprovedCanchasPage() {
  const [clubes, setClubes] = useState<Cancha[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Cancha>>({});

  useEffect(() => {
    getCanchas()
      .then(res => setClubes(res))
      .catch(err => console.log("Error:", err));
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
      setClubes(prev => prev.filter(c => c.id !== id));
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
      address: cancha.address ?? "",
    });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleEditSave = async (id: number) => {
    const payload = {
      ...editData,
      phone: String(editData.phone ?? "").replace(/\D/g, ""),
    };
    const res = await updateCancha(id, payload);
    if (res.ok) {
      const updated = await res.json();
      setClubes(prev =>
        prev.map(c => (c.id === id ? { ...c, ...updated } : c)),
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
      let message = "Error al actualizar la cancha";
      try {
        const body = await res.json();
        const first = body?.errors?.[0];
        if (typeof first?.msg === "string") message = first.msg;
      } catch {
        /* ignore */
      }
      toast.error(message, {
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
    <main className="mx-auto flex max-w-6xl flex-col gap-6 p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {clubes?.length === 0 ? (
        <p>No hay canchas para mostrar</p>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Club</TableHead>
                <TableHead>Provincia</TableHead>
                <TableHead>Ciudad</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clubes?.map(c =>
                editingId === c.id ? (
                  <TableRow
                    key={c.id}
                    className="bg-green-50 dark:bg-green-950/20"
                  >
                    <TableCell>
                      <Input
                        className="h-7 text-sm"
                        value={editData.club ?? ""}
                        onChange={e =>
                          setEditData(prev => ({
                            ...prev,
                            club: e.target.value,
                          }))
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="h-7 text-sm"
                        value={editData.state ?? ""}
                        onChange={e =>
                          setEditData(prev => ({
                            ...prev,
                            state: e.target.value,
                          }))
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="h-7 text-sm"
                        value={editData.city ?? ""}
                        onChange={e =>
                          setEditData(prev => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="h-7 min-w-40 text-sm"
                        value={editData.address ?? ""}
                        onChange={e =>
                          setEditData(prev => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editData.type ?? "Trinquete"}
                        onValueChange={value =>
                          setEditData(prev => ({
                            ...prev,
                            type: (value ?? "Trinquete") as TipoDeCancha,
                          }))
                        }
                      >
                        <SelectTrigger className="h-7 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Trinquete">Trinquete</SelectItem>
                          <SelectItem value="Frontón">Frontón</SelectItem>
                          <SelectItem value="Cajón">Cajón</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleEditSave(c.id as number)}
                          className="h-7 gap-1 text-xs"
                        >
                          <CheckIcon className="size-3" /> Guardar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleEditCancel}
                          className="h-7 gap-1 text-xs"
                        >
                          <XIcon className="size-3" /> Cancelar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.club}</TableCell>
                    <TableCell>{c.state}</TableCell>
                    <TableCell>{c.city}</TableCell>
                    <TableCell
                      className="max-w-xs truncate"
                      title={c.address?.trim() || undefined}
                    >
                      {c.address?.trim() ? c.address : "-"}
                    </TableCell>
                    <TableCell>{c.type}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditStart(c)}
                          className="h-7 gap-1 text-xs text-primary hover:text-primary"
                        >
                          <PencilIcon className="size-3" /> Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(c.id as number, c.club)}
                          className="h-7 gap-1 text-xs"
                        >
                          <Trash2Icon className="size-3" /> Eliminar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
}
