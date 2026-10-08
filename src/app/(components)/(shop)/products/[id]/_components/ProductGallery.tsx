"use client";
import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);
  const list = images.length ? images : [];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="overflow-hidden rounded-xl"
      >
        {list.map((src, i) => (
          <SwiperSlide key={src}>
            <div className="relative aspect-square bg-gray-50 sm:aspect-4/5">
              <Image
                src={src}
                alt={`${title} - image ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(min-width:1024px) 35vw, 90vw"
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {list.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbs-swiper mt-3"
        >
          {list.map((src, i) => (
            <SwiperSlide key={src}>
              <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-transparent bg-gray-50 transition">
                <Image src={src} alt={`thumbnail ${i + 1}`} fill sizes="100px" className="object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
