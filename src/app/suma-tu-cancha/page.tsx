"use client";

import { useState } from "react";
import { createPendingCancha } from "@/lib/getClubes";
import SelectProvince from "@/components/forms/SelectProvince";
import SelectCity from "@/components/forms/SelectCity";
import Image from "next/image";
import { Cancha, TipoDeCancha } from "@/types/club";
import { MapPin, Phone, Upload } from "lucide-react";
import { toast } from "nextjs-toast-notify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SumaTuCancha() {
  const initialFormData = {
    club: "",
    city: "",
    state: "",
    type: "Trinquete" as TipoDeCancha,
    maps_location: "",
    phone: 0,
    image: null as File | null | string,
    address: "",
  };

  const [formData, setFormData] = useState<Cancha>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors: Record<string, string> = {};
  if (!formData.club.trim()) errors.club = "El nombre del club es obligatorio.";
  if (!formData.state) errors.state = "Seleccioná una provincia.";
  if (!formData.city) errors.city = "Seleccioná una ciudad.";
  if (!formData.maps_location.trim())
    errors.maps_location = "La dirección es obligatoria.";
  if (!formData.phone || String(formData.phone).replace(/\D/g, "").length < 8)
    errors.phone = "Ingresá un teléfono válido (mínimo 8 dígitos).";
  if (!formData.address.trim() || formData.address.trim().length < 3)
    errors.address = "La dirección debe tener al menos 3 caracteres.";

  const touch = (field: string) =>
    setTouched(prev => ({ ...prev, [field]: true }));

  const isFormValid = Object.keys(errors).length === 0;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, image: file }));
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
        address: true,
      });
      return;
    }

    setLoading(true);

    const res = await createPendingCancha(formData);

    if (res!.ok) {
      toast.success("Cancha creada con éxito!", {
        duration: 2500,
        progress: true,
        position: "top-center",
        transition: "bottomToTopBounce",
        icon: "",
        sound: false,
      });

      setFormData(initialFormData);
      setPreviewImage("");
      setTouched({});
    } else {
      toast.error("Error al crear la cancha. Intentá de nuevo.", {
        duration: 3000,
        progress: true,
        position: "top-center",
        transition: "bottomToTopBounce",
        icon: "",
        sound: false,
      });
    }

    setLoading(false);
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 pb-12">
      <div className="mb-10 pt-8 text-center">
        <h1 className="mb-3 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-3xl font-bold text-transparent">
          Sumá tu cancha y hacela visible para todos
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Registrá tu cancha para que más personas puedan encontrarla. Aumentá
          la visibilidad de tu espacio deportivo y conectate con nuevos
          jugadores.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Datos básicos */}
        <article className="rounded-xl border p-6">
          <header className="mb-4 flex flex-col gap-1">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <MapPin className="size-5 text-primary" />
              Datos básicos de la cancha
            </h3>
            <p className="text-sm text-muted-foreground">
              Información principal para identificar tu cancha
            </p>
          </header>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="club-name">
                Nombre del Club <span className="text-destructive">*</span>
              </Label>
              <Input
                id="club-name"
                type="text"
                placeholder="Club"
                value={formData.club}
                name="club"
                aria-invalid={!!(touched.club && errors.club)}
                onBlur={() => touch("club")}
                onChange={e =>
                  setFormData({ ...formData, club: e.target.value })
                }
              />
              {touched.club && errors.club && (
                <p className="text-sm text-destructive">{errors.club}</p>
              )}
            </div>

            <SelectProvince
              onValueChange={value => {
                setFormData({ ...formData, state: value ?? "", city: "" });
                touch("state");
              }}
              value={formData.state}
              error={touched.state ? errors.state : undefined}
            />

            <SelectCity
              selectedProvince={formData.state}
              onValueChange={value => {
                setFormData({ ...formData, city: value ?? "" });
                touch("city");
              }}
              value={formData.city}
              error={touched.city ? errors.city : undefined}
            />

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tipo-cancha">Tipo de cancha</Label>
              <Select
                value={formData.type}
                onValueChange={value =>
                  setFormData({
                    ...formData,
                    type: (value ?? "Trinquete") as TipoDeCancha,
                  })
                }
              >
                <SelectTrigger id="tipo-cancha" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Trinquete">Trinquete</SelectItem>
                  <SelectItem value="Frontón">Frontón</SelectItem>
                  <SelectItem value="Cajón">Cajón</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </article>

        {/* Información de contacto */}
        <article className="rounded-xl border p-6">
          <header className="mb-4 flex flex-col gap-1">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Phone className="size-5 text-primary" />
              Información de contacto
            </h3>
            <p className="text-sm text-muted-foreground">
              Datos para que los usuarios puedan comunicarse
            </p>
          </header>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="address">
                Dirección <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="Ej: Mitre 123"
                value={formData.address}
                name="address"
                aria-invalid={!!(touched.address && errors.address)}
                onBlur={() => touch("address")}
                onChange={e =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              {touched.address && errors.address && (
                <p className="text-sm text-destructive">{errors.address}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="maps-location">
                Ubicación en Google Maps{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="maps-location"
                type="text"
                placeholder="Ej: https://maps.google.com/..."
                value={formData.maps_location}
                name="maps_location"
                aria-invalid={!!(touched.maps_location && errors.maps_location)}
                onBlur={() => touch("maps_location")}
                onChange={e =>
                  setFormData({ ...formData, maps_location: e.target.value })
                }
              />
              {touched.maps_location && errors.maps_location && (
                <p className="text-sm text-destructive">
                  {errors.maps_location}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">
                Teléfono <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                inputMode="numeric"
                placeholder="Ej: 2944112233"
                value={formData.phone || ""}
                name="phone"
                aria-invalid={!!(touched.phone && errors.phone)}
                onBlur={() => touch("phone")}
                onChange={e => {
                  const digits = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, phone: Number(digits) });
                }}
              />
              {touched.phone && errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>
          </div>
        </article>

        {/* Foto */}
        <article className="rounded-xl border p-6">
          <header className="mb-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Upload className="size-5 text-primary" />
              Foto de la cancha
            </h3>
          </header>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
            <label className="relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border text-center transition-colors hover:bg-muted sm:w-64">
              <Upload className="mb-2 size-8 text-muted-foreground" />
              <span className="text-sm font-medium">Seleccionar archivo</span>
              <span className="mt-1 text-xs text-muted-foreground">
                PNG, JPG, WEBP
              </span>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 size-full cursor-pointer opacity-0"
                onChange={handleImageChange}
              />
            </label>

            {previewImage && (
              <div className="flex flex-col items-center gap-2">
                <div className="relative size-48 sm:size-64">
                  <Image
                    src={previewImage}
                    alt="Vista previa de cancha a subir"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Vista previa</p>
              </div>
            )}
          </div>
        </article>

        <div className="flex justify-center pt-2">
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-500 px-8 text-base font-semibold text-white hover:from-green-700 hover:to-emerald-600 sm:w-auto"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar cancha"}
          </Button>
        </div>
      </form>
    </main>
  );
}
