import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';

const images = [
  {
    src: '/banner/01_canchas_paleta-sardina-martiren.webp',
    id: 1,
    alt: 'Gabriel "Sardina" Martirén',
  },
  {
    src: '/banner/02_canchas_paleta-vaca.webp',
    id: 2,
    alt: 'Paleta con hueso de paleta de vaca',
  },
  {
    src: '/banner/03_canchas_paleta-kerosene.webp',
    id: 3,
    alt: 'Las primeras paletas de madera se hicieron con cajones de kerosene',
  },
  {
    src: '/banner/04_canchas_paleta-madera-cancha-burzaco.webp',
    id: 4,
    alt: 'Cancha de burzaco donde Martirén jugo el primer partido con paleta de madera',
  },
  {
    src: '/banner/05_canchas_Fronton.webp',
    id: 5,
    alt: 'Frontón, cancha abierta',
  },
  {
    src: '/banner/06_canchas_Fronton-36-mts.webp',
    id: 6,
    alt: 'Modelo Fronton 36 mts',
  },
  {
    src: '/banner/07_canchas_Trinquete.webp',
    id: 7,
    alt: 'Modelo Trinquete',
  },
];

export const Slider = () => {
  return (
    <>
      <Swiper
        slidesPerView={6}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          950: {
            slidesPerView: 3,
          },
          1400: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="flex w-full"
      >
        {images.map((img) => (
          <SwiperSlide
            key={img.id}
            className="flex h-[250px] items-center justify-center text-center"
          >
            <Image
              className="mx-auto h-[250px] w-fit"
              src={`${img.src}`}
              alt={img.alt}
              height={250}
              width={300}
            />
            <span className="mb-8 mt-4 flex justify-center">{img.alt}</span>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative -top-8 w-full bg-gray-500">
        <div className="swiper-button-prev !after:text-sm  hover:scale-125">
          <FaCircleArrowLeft size={8} />
        </div>
        <div className="swiper-button-next !after:text-sm  hover:scale-125">
          <FaCircleArrowRight size={8} />
        </div>
      </div>
    </>
  );
};
