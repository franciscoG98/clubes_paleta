const ClubList = ({ clubes }) => {

  return (
    <table className="clubList__table">
      <thead>
        <tr>
          <th>Provincia</th>
          <th>Ciudad</th>
          <th>Club</th>
          <th>Tipo de Cancha</th>
          <th>Direccion</th>
          <th>Contacto</th>
        </tr>
      </thead>
      <tbody className="table__body">

        {clubes.map((i, idx) => (
          <tr key={idx}>
            <td className="table_data">{i.provincia}</td>
            <td className="table_data">{i.ciudad}</td>
            <td className="table_data">{i.clubName}</td>
            <td className="table_data">{i.tipo}</td>
            <td className="table_data">{i.direccion}</td>
            <td className="table_data">{i.contacto}</td>
          </tr>
        ))}

      </tbody>
    </table>
  )
}

export default ClubList