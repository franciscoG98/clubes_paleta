import { useState, useEffect } from 'react'
import ClubCard from './components/ClubCard';
import ClubList from './components/ClubList';
import Navbar from './components/Navbar';
import Toggle from './components/Toggle';

const App = () => {

  const [clubes, setClubes] = useState([]);
  const [list, setList] = useState(true);

  useEffect(() => {
    getClubes()
  }, [])

  const GOOGLESHEETS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRRoGQvg-sm9RpjQzAkBpoCJxd4XU6Oc0XOhsm_E9IXfx5sOYBshxRqr5ySgrsqhLz2pyzIanqWD3dc/pub?output=csv';

  const getClubes = async () => {

    const csv = await fetch(GOOGLESHEETS_URL)
      .then(res => res.text());

    const clubes = csv
      .split('\n')
      .slice(1)
      .map(row => {
        const [provincia, ciudad, clubName, direccion, tipo, contacto] = row.split(',');

        return {provincia, ciudad, clubName, direccion, tipo, contacto};
      })

    setClubes(clubes)
  }

  return (
    <>
      <main>
        <Navbar />
        <Toggle state={list} setState={setList} />
        {
          list ?
            <ClubList clubes={clubes} />
          :
          <div className='clubes__container'>
            {clubes.map(club => (
              <ClubCard club={club} />
            ))}
          </div>
        }
      </main>
    </>
  )
}

export default App
