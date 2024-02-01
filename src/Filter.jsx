import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import getClubes from './service/getClubes';
import ClubCard from './components/ClubCard';

const Filter = () => {

  const [result, setResult] = useState([]);

  // filters
  const [provinciaFilter, setProvinciaFilter] = useState('');
  const [ciudadFilter, setCiudadFilter] = useState('');
  const [tipoCanchaFilter, setTipoCanchaFilter] = useState('');

  // filter options
  const [provinciaOptions, setProvinciaOptions] = useState([]);
  const [ciudadOptions, setCiudadOptions] = useState([]);
  const [tipoCanchaOptions, setTipoCanchaOptions] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const clubes = await getClubes();
      setResult(clubes);

      // Obtener opciones únicas para cada campo
      const provincias = Array.from(new Set(clubes.map(club => club.provincia)));
      const ciudades = Array.from(new Set(clubes.map(club => club.ciudad)));
      const tiposCancha = Array.from(new Set(clubes.map(club => club.tipo)));

      setProvinciaOptions(provincias);
      setCiudadOptions(ciudades);
      setTipoCanchaOptions(tiposCancha);
    };

    fetchData();
  }, [])

  const handleProvinciaChange = (e) => {
    setProvinciaFilter(e.target.value);
  };

  const handleCiudadChange = (e) => {
    setCiudadFilter(e.target.value);
  };

  const handleTipoCanchaChange = (e) => {
    setTipoCanchaFilter(e.target.value);
  };

  // TODO
  const filteredClubes = result.filter(club => {
    if (provinciaFilter && club.provincia !== provinciaFilter) return false;
    if (ciudadFilter && club.ciudad !== ciudadFilter) return false;
    if (tipoCanchaFilter && club.tipo !== tipoCanchaFilter) return false;
    return true;
  });


  return (
    <main className='filter__container'>
      <Navbar />

      <h1>Filtrar</h1>

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
          <option value="none" selected hidden>Seleccione una provincia</option> 
          {provinciaOptions.map((provincia, index) => (
            <option className='filter_option' key={index} value={provincia}>{provincia}</option>
          ))}
        </select>
      </label>        

      {/* ciudad */}
      <label
        className='filter_label'
        htmlFor="ciudadFilter"
      >Ciudad:
        <select
          className='filter_select'
          id="ciudadFilter"
          value={ciudadFilter}
          onChange={handleCiudadChange}
        >
          <option value="none" selected hidden>Seleccione una ciudad</option> 
          {ciudadOptions.map((ciudad, index) => (
            <option className='filter_option' key={index} value={ciudad}>{ciudad}</option>
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
          <option value="none" selected hidden>Seleccione un tipo de cancha</option> 
          {tipoCanchaOptions.map((tipo, index) => (
            <option className='filter_option' key={index} value={tipo}>{tipo}</option>
          ))}
        </select>
      </label>

      <ul>
        Usted esta buscando
        <li>{provinciaFilter}</li>
        <li>{ciudadFilter}</li>
        <li>{tipoCanchaFilter}</li>
      </ul>
      <div className='clubes__container'>
        {
          filteredClubes.map(club => (
            <ClubCard club={club} />
          ))
        }
      </div>

    </main>
  )
}

export default Filter