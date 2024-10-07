import Navbar from "./components/Navbar";

const Contribute = () => {
  return (
    <>
      <Navbar />
      <main className="contribute__container">
        <article className="contribute__article">
          <header>
            <h1>Contribuir</h1>
          </header>

          <footer>
            <p>
              La idea con esta pagina es tener un lugar donde los pelotaris podamos acudir cuando estamos de viaje. Saber si hay una cancha donde vamos, porque sabemos que es costumbre de más de uno el llevar la paleta en el bolso o abajo del asiento del auto.
            </p>
            <p>
              Por el momento la idea es solo recopilar y mostrar información de las canchas de paleta (Provincia, Ciudad, Dirección, Nombre del Club, tipo de Cancha y formas de contacto). Quizás en algún futuro pedir que manden fotos de sus canchas o informar sobre torneos/exibiciones. Por el momento solo es esto, juntar información sobre canchas.
            </p>
            <p>
              Si hay algun dato errononeo en el sitio, por favor, mandenme un mail o envien nuevamente una respuesta al formulario que dejo abajo.
            </p>
            <b>Muchas gracias por leer, saludos de un pelotari.</b>
          </footer>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScO5FEZNItsS0gfyOhjwkTPjTJr03bOhMiFiW9MIqCLIaxHcA/viewform?usp=sf_link"
            target="__blank"
            rel="noopener noreferrer"
            className="article__link"
          >
            Formulario
          </a>
        </article>
      </main>
    </>
  );
};

export default Contribute;
