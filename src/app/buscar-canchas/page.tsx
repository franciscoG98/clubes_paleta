"use client";

import { useEffect, useState } from "react";
import { getCanchas } from "@/lib/getClubes";
import ClubCard from "@/components/ClubCard";
import Spinner from "@/components/Spinner";
import { Cancha } from "@/types/club";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TIPOS_DE_CANCHA = ["Trinquete", "Frontón", "Cajón"] as const;
type TipoDeCancha = (typeof TIPOS_DE_CANCHA)[number];

export default function BuscarCanchas() {
  const [result, setResult] = useState<Cancha[]>([]);
  const [loading, setLoading] = useState(true);

  const [provinciaFilter, setProvinciaFilter] = useState("");
  const [tipoCanchaFilter, setTipoCanchaFilter] = useState<string[]>([]);
  const [provinciaOptions, setProvinciaOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const clubes = await getCanchas();
      setResult(clubes);

      const provincias = Array.from(
        new Set(clubes.map((club: Cancha) => club.state)),
      );
      setProvinciaOptions(provincias as string[]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleTipoCanchaChange = (tipo: TipoDeCancha, checked: boolean) => {
    setTipoCanchaFilter(prev =>
      checked ? [...prev, tipo] : prev.filter(t => t !== tipo),
    );
  };

  const filteredClubes = result.filter(club => {
    const provinciaMatches =
      provinciaFilter === "" || club.state === provinciaFilter;
    const tipoCanchaMatches =
      tipoCanchaFilter.length === 0 || tipoCanchaFilter.includes(club.type);
    return provinciaMatches && tipoCanchaMatches;
  });

  const handleResetFilters = () => {
    setProvinciaFilter("");
    setTipoCanchaFilter([]);
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4">
      <div className="mx-auto mb-8 pt-8 text-center">
        <h1 className="mb-3 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-3xl font-bold text-transparent">
          Busca tu Cancha
        </h1>
        <p className="mx-auto max-w-lg text-muted-foreground">
          Encontrá las mejores canchas de pelota a paleta en todo el país.
          Filtrá por provincia o tipo de cancha.
        </p>
      </div>

      {/* Filter bar */}
      <div className="mb-8 rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          {/* Province filter */}
          <div className="flex min-w-[180px] flex-col gap-1.5">
            <Label htmlFor="provincia-select">Provincia</Label>
            <Select
              value={provinciaFilter}
              onValueChange={value => setProvinciaFilter(value ?? "")}
            >
              <SelectTrigger id="provincia-select" className="w-full">
                <SelectValue placeholder="Todas las provincias" />
              </SelectTrigger>
              <SelectContent>
                {provinciaOptions.map((provincia, index) => (
                  <SelectItem key={index} value={provincia}>
                    {provincia}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type filters */}
          <div className="flex flex-col gap-1.5">
            <Label>Tipo de Cancha</Label>
            <div className="flex flex-wrap gap-4 pt-1">
              {TIPOS_DE_CANCHA.map(tipo => (
                <div key={tipo} className="flex items-center gap-2">
                  <Checkbox
                    id={`tipo-${tipo}`}
                    checked={tipoCanchaFilter.includes(tipo)}
                    onCheckedChange={(checked: boolean) =>
                      handleTipoCanchaChange(tipo, checked)
                    }
                  />
                  <Label
                    htmlFor={`tipo-${tipo}`}
                    className="cursor-pointer font-normal"
                  >
                    {tipo}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Reset */}
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="sm:ml-auto"
          >
            Borrar filtros
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="mb-12 flex flex-wrap items-start justify-center gap-6">
        {loading ? (
          <Spinner />
        ) : filteredClubes.length > 0 ? (
          filteredClubes.map((c, idx) => (
            <ClubCard
              key={idx}
              club={c.club}
              city={c.city}
              state={c.state}
              address={c.address}
              maps_location={c.maps_location}
              type={c.type}
              phone={c.phone}
              image={c.image}
            />
          ))
        ) : (
          <p className="py-12 text-center text-muted-foreground">
            Lo sentimos, no encontramos canchas con los filtros seleccionados.
          </p>
        )}
      </div>
    </main>
  );
}
