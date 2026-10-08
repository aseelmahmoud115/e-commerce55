"use client";
import ProductCard from "@/app/_sharedComponents/ProductCard/ProductCard";
import { IProducts } from "@/interface/product.interface";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function RelatedProducts({ products }: { products: IProducts[] }) {
  if (!products.length) return null;

  return (
    <section className="mt-14">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800">
          <span className="h-7 w-1.5 rounded-full bg-linear-to-b from-green-500 to-green-700" />
          <span>You May Also <span className="text-green-600">Like</span></span>
        </h2>
        <div className="flex gap-2">
          <button aria-label="Previous" className="related-prev flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-green-600 hover:text-white disabled:opacity-40">
            <FaChevronLeft className="text-sm" />
          </button>
          <button aria-label="Next" className="related-next flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-green-600 hover:text-white disabled:opacity-40">
            <FaChevronRight className="text-sm" />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl: ".related-prev", nextEl: ".related-next" }}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="pb-4! pt-1!"
      >
        {products.map((p) => (
          <SwiperSlide key={p._id} className="h-auto!">
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
