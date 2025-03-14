import Link from 'next/link';

// @fix: metele diseño hijo de puta
export default function ContributePage() {
  return (
    <main className="mx-12 flex flex-col items-center md:mx-auto md:w-1/2">
      <h1 className="my-8 text-center text-3xl font-semibold">Contribuir</h1>

      <p>
        La idea con esta pagina es tener un lugar donde los pelotaris podamos
        acudir cuando estamos de viaje. Saber si hay una cancha donde vamos,
        porque sabemos que es costumbre de más de uno el llevar la paleta en el
        bolso o abajo del asiento del auto.
      </p>

      <p>
        Podés contribuir con el sitio con la compra de un cafecito en el
        siguiente link
        <Link
          className="my-4 text-blue-600 underline hover:no-underline"
          href="https://cafecito.app/panch___"
          passHref={true}
        >
          &nbsp;mi perfil de CafecitoApp.
        </Link>
      </p>

      <p>
        Sino, con el hecho de querer sumar tu cancha al sitio ya me ayuda a que
        crezca este proyecto y que estemos conectados como pelotaris.
      </p>

      <p>
        Por el momento la idea es solo recopilar y mostrar información de las
        canchas de paleta. Quizás en algún futuro agrergar fotos de sus canchas
        o informar sobre torneos/exibiciones. Por el momento solo es saber donde
        hay canchas y como ir a jugar. Si hay algun dato errononeo en el sitio,
        por favor, mandenme un mail o envien nuevamente una respuesta al
        formulario que dejo abajo. Muchas gracias por leer, saludos de un
        pelotari.
      </p>
    </main>
  );
};
