// eslint-disable-next-line react/prop-types
const ClubCard = ({ club }) => {

  const { provincia, ciudad, clubName, direccion, tipo, contacto } = club;

  return clubName ?
    (
      <div className="club__card">
        <h2 className="club__title">{clubName}</h2>
        <h3 className="club__localidad">{ciudad + ", " + provincia}</h3>
        <span className="club__direccion">Direccion: {direccion}</span>
        <span className="club__tipo">Tipo de Cancha: {tipo}</span>
        {contacto == '1111111111' ? (
          "Telefono: -"
        ) : (
          <span className="club__cotact">
            Telefono:{" "}
            {
              !contacto.includes('/') ?
                <a href={`tel:+549${contacto}`}>{contacto}</a>
              :
                (
                  contacto.split('/').map( contact => (
                    <>
                      <a href={`tel:+549${contact}`}>{contact}</a>
                      <br />
                    </>
                  ))
                )
            }
          </span>
        )}
      </div>
    )
  :
    "";
};

export default ClubCard;
