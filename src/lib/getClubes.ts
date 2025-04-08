import { Cancha } from '@/types/club';
import { NextResponse } from 'next/server';

export const getCanchas = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/canchas`);
    const canchas = await res.json();

    return await canchas;
  } catch (error) {
    NextResponse.json(
      { success: false, error: `Error en el servidor: ${error}` },
      { status: 500 },
    );
  }
};

export const getPendingCanchas = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/pending-canchas`,
    );
    const clubes = await res.json();

    return await clubes;
  } catch (error) {
    NextResponse.json(
      { success: false, error: `Error en el servidor: ${error}` },
      { status: 500 },
    );
  }
};

export const createPendingCancha = async (formData: Cancha) => {
  try {
    const data = new FormData();
    data.append('club', formData.club);
    data.append('city', formData.city);
    data.append('state', formData.state);
    data.append('type', formData.type);
    data.append('maps_location', formData.maps_location);
    data.append('phone', formData.phone as unknown as string);
    data.append('image', formData.image);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/pending-canchas`,
      {
        method: 'POST',
        body: data,
      },
    );

    return res;
  } catch (error) {
    console.error('Error en el servidor:', error);
    return { ok: false };
  }
};

export const togglePendingCancha = async (id: number, cancha: boolean) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/pending-canchas/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pending: cancha }),
      },
    );

    return res;
  } catch (error) {
    NextResponse.json(
      { success: false, error: `Error en el servidor: ${error}` },
      { status: 500 },
    );
  }
};

export const approveCancha = async (id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/pending-canchas/approve-cancha/${id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
    );

    return res;
  } catch (error) {
    NextResponse.json(
      { success: false, error: `Error en el servidor: ${error}` },
      { status: 500 },
    );
  }
};

export const deleteCancha = async (id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/canchas/${id}`,
      {
        method: 'DELETE',
      },
    );

    return res;
  } catch (error) {
    console.error('Error en el servidor:', error);
    return { ok: false };
  }
};
