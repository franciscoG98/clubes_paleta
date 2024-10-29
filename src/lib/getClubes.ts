import Club from '@/types/club';

const GOOGLESHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;

const getClubes = async (): Promise<Club[]> => {
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
        contacto,
        contacto2,
      };
    });
  // @fix: this ?
  return clubes;
};

export default getClubes;
