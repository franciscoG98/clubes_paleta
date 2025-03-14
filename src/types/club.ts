export type Club = {
  provincia: string;
  ciudad: string;
  clubName: string;
  direccion: string;
  mapsLink?: string;
  tipo: string;
  image?: string;
  contacto?: number;
  contacto2?: number | string;
};

export type Cancha = {
  id: number;
  club: string;
  city: string;
  state: string;
  pending: boolean;
  maps_location: string;
  type: 'Trinquete' | 'Frontón' | 'Cajón';
  phone: number;
  image: string;
};
