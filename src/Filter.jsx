import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import getClubes from './service/getClubes';
import ClubCard from './components/ClubCard';

const Filter = () => {

  const [result, setResult] = useState([]);

  const [provinciaFilter, setProvinciaFilter] = useState('');
  const [tipoCanchaFilter, setTipoCanchaFilter] = useState('');
  const [provinciaOptions, setProvinciaOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const clubes = await getClubes();

      const uniqueClubes = clubes.filter((club, index, self) =>
        index === self.findIndex(c => c.clubName === club.clubName)
      );

      setResult(uniqueClubes);

      const provincias = Array.from(new Set(uniqueClubes.map(club => club.provincia)));
      setProvinciaOptions(provincias);
    };

    fetchData();
  }, [])

  const handleProvinciaChange = (e) => {
    setProvinciaFilter(e.target.value);
  };

  const handleTipoCanchaChange = (e) => {
    setTipoCanchaFilter(e.target.value);
  };

  const filteredClubes = result.filter(club => {
    const provinciaMatches = provinciaFilter === '' || club.provincia === provinciaFilter;
    const tipoCanchaMatches = tipoCanchaFilter === '' || club.tipo === tipoCanchaFilter;

    return provinciaMatches && tipoCanchaMatches;
  });



  const handleResetFilters = () => {
    setProvinciaFilter('');
    setTipoCanchaFilter('');
  };

  return (
    <>
      <Navbar />
      <main className='filter__container'>
        <h1>Filtrar</h1>

        <button onClick={handleResetFilters}>
          Borrar Filtros
        </button>

        {/* provincia */}
        <label
          className='filter_label'
          htmlFor="provinciaFilter"
        >Provincia:
          <select
            className='filter_select'
            id="provinciaFilter"
            value={provinciaFilter}
            onChange={handleProvinciaChange}
          >
            <option value="" hidden>Seleccione una provincia</option> 
            {provinciaOptions.map((provincia, index) => (
              <option className='filter_option' key={index} value={provincia}>{provincia}</option>
            ))}
          </select>
        </label>

        {/* tipo de cancha */}
        <label
          className='filter_label'
          htmlFor="tipoCanchaFilter"
        >Tipo de Cancha:
          <select
            className='filter_select'
            id="tipoCanchaFilter"
            value={tipoCanchaFilter}
            onChange={handleTipoCanchaChange}
          >
            <option value="" hidden>Seleccione un tipo de cancha</option>
            <option className='filter_option' value={"Trinquete"}>{"Trinquete"}</option>
            <option className='filter_option' value={"Frontón"}>{"Frontón"}</option>
          </select>
        </label>

        <div className='clubes__container'>
          {
            filteredClubes.length > 0
            ? (
              filteredClubes.map((club, idx) => (
                <ClubCard key={idx} club={club} />
              ))
            ) : (
              <span>Lo siento, no encontramos la combinacion de cancha y lugar que esta buscando</span>
            )
          }
        </div>

      </main>
    </>
  )
}

export default Filter