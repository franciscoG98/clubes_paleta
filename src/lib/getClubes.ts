import { Cancha, Club } from '@/types/club';
import { NextResponse } from 'next/server';

const GOOGLESHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;

export const getClubes = async (): Promise<Club[]> => {
  const csv = await fetch(GOOGLESHEETS_URL).then((res) => res.text());

  const clubes = csv
    .split('\n')
    .slice(1)
    .map((row) => {
      const [
        provincia,
        ciudad,
        clubName,
        direccion,
        mapsLink,
        tipo,
        contacto,
        contacto2,
      ] = row.split(',');

      return {
        provincia,
        ciudad,
        clubName,
        direccion,
        mapsLink,
        tipo,
        contacto: Number(contacto),
        contacto2: contacto2
          ? isNaN(Number(contacto2))
            ? contacto2
            : Number(contacto2)
          : undefined,
      };
    });

  return clubes;
};

export const getPendingCanchas = async (): Promise<Cancha[]> => {
  try {
    const res = await fetch(`${process.env.serverURI}/pending-canchas`);
    const clubes = await res.json();

    return await clubes;
  } catch (error) {
    NextResponse.json(
      { success: false, error: `Error en el servidor: ${error}` },
      { status: 500 },
    );
  }
};

// @fix: formData type
export const createPendingCancha = async (formData) => {
  try {
    const data = new FormData();
    data.append('club', formData.club);
    data.append('city', formData.city);
    data.append('state', formData.state);
    data.append('type', formData.type);
    data.append('maps_location', formData.maps_location);
    data.append('phone', formData.phone);
    if (formData.image) {
      data.append('image', formData.image);
    }

    const res = await fetch(`${process.env.serverURI}/pending-canchas`, {
      method: 'POST',
      body: data,
    });

    return res;
  } catch (error) {
    console.error('Error en el servidor:', error);
    return { ok: false };
  }
};

export const togglePendingCancha = async (id: number, cancha: boolean) => {
  try {
    const res = await fetch(`${process.env.serverURI}/pending-canchas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pending: cancha }),
    });

    return res;
  } catch (error) {
    NextResponse.json(
      { success: false, error: `Error en el servidor: ${error}` },
      { status: 500 },
    );
  }
};
