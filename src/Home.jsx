import { useState, useEffect } from 'react'
import ClubCard from './components/ClubCard';
import Navbar from './components/Navbar';

const Home = () => {

  const [clubes, setClubes] = useState([]);

  useEffect(() => {
    getClubes()
  }, [])

  const GOOGLESHEETS_URL = import.meta.env.VITE_GOOGLE_API_KEY

  console.log('api?', GOOGLESHEETS_URL);

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

    setClubes(clubes)
  }

  return (
    <main>
      <Navbar />
      <div className='clubes__container'>
        {clubes.map(club => (
          <ClubCard key={club.clubName} club={club} />
        ))}
      </div>
    </main>
  )
}

export default Home
