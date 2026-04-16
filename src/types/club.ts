// import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export enum TipoDeCancha {
  Trinquete = 'Trinquete',
  Frontón = 'Frontón',
  Cajón = 'Cajón',
}

export type Cancha = {
  id?: number;
  club: string;
  city: string;
  state: string;
  pending?: boolean;
  maps_location: string;
  type: TipoDeCancha;
  phone: number;
  image: string | File | null;
  address: string;
};
