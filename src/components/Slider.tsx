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
    src: '/banner/canchas_Fronton-30-mts.webp',
    id: 1,
    alt: 'Fronton 30 mts',
  },
  {
    src: '/banner/canchas_Fronton-36-mts.webp',
    id: 2,
    alt: 'Fronton 36 mts',
  },
  {
    src: '/banner/canchas_Fronton.webp',
    id: 3,
    alt: 'Fronton',
  },
  {
    src: '/banner/canchas_Fronton2.webp',
    id: 4,
    alt: 'Fronton 2',
  },
  {
    src: '/banner/canchas_paleta-kerosene.webp',
    id: 5,
    alt: 'paleta con madera de cajon de kerosene',
  },
  {
    src: '/banner/canchas_paleta-madera-cancha-burzaco.webp',
    id: 6,
    alt: 'cancha de burzaco donde martiren jugo el primer partido con paletea de madera',
  },
  {
    src: '/banner/canchas_paleta-primera-vasquito-1915.webp',
    id: 7,
    alt: 'primera paleta de madera industrializada',
  },
  {
    src: '/banner/canchas_paleta-sardina-martiren.webp',
    id: 8,
    alt: 'sardina martiren',
  },
  {
    src: '/banner/canchas_paleta-vaca.webp',
    id: 9,
    alt: 'paleta con paleta de vaca',
  },
  {
    src: '/banner/canchas_Trinquete.webp',
    id: 10,
    alt: 'trinquete',
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
