import type { Metadata } from 'next';
import { auth } from '@/auth';
import localFont from 'next/font/local';
import AdminNavbar from '@/components/AdminNavbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://clubes-paleta.vercel.app`),
  title: 'Clubes de Pelota Paleta',
  description: 'Encuentra todos los clubes de pelota paleta de la argentina',
  keywords: [
    'Todas las canchas de Pelota Paleta',
    'Canchas de Pelota Paleta en Argentina',
    'Pelota Paleta',
    'Pelota a Paleta',
    'Paleta',
    'Pelota Vasca',
    'Club de pelota',
    'Clubes de pelota',
    'Clubes de pelota paleta',
    'Club de pelota paleta',
    'Que es pelota paleta',
    'Deporte Argentino',
  ],
  openGraph: {
    title: 'Clubes de Pelota Paleta',
    description:
      'Todas las canchas de Pelota Paleta en Argentina. Llena el formulario y agrega tu cancha a nuestra pagina. Cuando viajas queres saber donde hay una cancha? Aca esta la solución!',
    url: 'https://clubes-paleta.vercel.app',
    images: [
      {
        url: 'https://clubes-paleta.vercel.app/cancha_default.webp',
        width: 800,
        height: 600,
        alt: 'Logo de la Confederacion Argentina de Pelota (CAP)',
      },
    ],
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {session?.user ? <AdminNavbar /> : <Navbar />}

        <div className="min-h-screen bg-neutral-100">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
