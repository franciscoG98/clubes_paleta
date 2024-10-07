/* eslint-disable react/prop-types */
const ClubCard = ({ club }) => {

  const { provincia, ciudad, clubName, direccion, tipo, contacto, contacto2 } = club;

  return clubName ?
    (
      <div className="club__card">
        <h2 className="club__title">{clubName}</h2>
        <h3 className="club__localidad">{ciudad + ", " + provincia}</h3>
        <span className="club__direccion">Direccion: {direccion}</span>
        {
          tipo ?
          (
            <span className="club__tipo">Tipo de Cancha: {tipo}</span>
          )
          : ''
        }
        {contacto ? (
          <span className="club__cotact">
            Telefono:&nbsp;
            <a href={`tel:+549${contacto}`}>{contacto}</a>
          </span>
        ) : (
          ""
        )}
        {contacto2 ? (
          <span className="club__cotact">
            {contacto2}
          </span>
        ) : (
          ""
        )}
      </div>
    )
  :
    "";
};

export default ClubCard;
