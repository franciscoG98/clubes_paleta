export type Club = {
  provincia: string;
  ciudad: string;
  clubName: string;
  direccion: string;
  mapsLink?: string;
  tipo: string;
  image?: string | File;
  contacto?: number;
  contacto2?: number | string;
};

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
  phone: number | string;
  image: string | File;
};
