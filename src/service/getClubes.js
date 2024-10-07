const GOOGLESHEETS_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

const getClubes = async () => {

  const csv = await fetch(GOOGLESHEETS_URL)
    .then(res => res.text());

  const clubes = csv
    .split('\n')
    .slice(1)
    .map(row => {
      const [provincia, ciudad, clubName, direccion, tipo, contacto, contacto2] = row.split(',');

      return {provincia, ciudad, clubName, direccion, tipo, contacto, contacto2};
    })

  return clubes;
}

export default getClubes;