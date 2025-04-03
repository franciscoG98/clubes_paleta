import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-2 border-neutral-300 bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="mb-4 flex items-center gap-2 text-xl font-bold hover:underline"
            >
              Canchas de Paleta
            </Link>
            <p className="mb-4 text-sm text-gray-600">
              La plataforma más completa para encontrar canchas de pelota a
              paleta en todo el país.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-medium">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 transition-colors hover:text-green-600 hover:underline"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/buscar-canchas"
                  className="text-gray-600 transition-colors hover:text-green-600 hover:underline"
                >
                  Buscar Canchas
                </Link>
              </li>
              <li>
                <Link
                  href="/suma-tu-cancha"
                  className="text-gray-600 transition-colors hover:text-green-600 hover:underline"
                >
                  Sumá tu Cancha
                </Link>
              </li>
              <li>
                <Link
                  href="/contribuir"
                  className="text-gray-600 transition-colors hover:text-green-600 hover:underline"
                >
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>

          {/* TODO Email */}
          <div>
            <h3 className="mb-4 font-medium">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: contacto@canchasdepaleta.com</li>
              <li>Seguinos en redes sociales</li>
            </ul>

            {/* social media */}
            <div className="mt-4 flex gap-4">
              {/* TODO instagram */}
              <Link
                href="#"
                className="text-gray-600 transition-colors hover:text-green-600 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>

              {/* TODO facebook */}
              <Link
                href="#"
                className="text-gray-600 transition-colors hover:text-green-600 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>

              {/* TODO twitter */}
              <Link
                href="#"
                className="text-gray-600 transition-colors hover:text-green-600 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} Canchas de Paleta. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
