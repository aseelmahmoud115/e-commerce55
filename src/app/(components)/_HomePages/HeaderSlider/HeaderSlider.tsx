"use client";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import hero from "@/assets/hero.webp";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    text: "Get 20% off your first order",
    primary: "Shop Now",
    primaryColor: "text-green-600",
    secondary: "View Deals",
  },
  {
    title: "Premium Quality Guaranteed",
    text: "Fresh from farm to your table",
    primary: "Shop Now",
    primaryColor: "text-blue-600",
    secondary: "Learn More",
  },
  {
    title: "Fast & Free Delivery",
    text: "Same day delivery available",
    primary: "Order Now",
    primaryColor: "text-purple-600",
    secondary: "Delivery Info",
  },
];

export default function HeaderSlider() {
  return (
    <section className="group/hero relative">
      <Swiper
        className="hero-swiper"
        modules={[Navigation, Pagination, Autoplay]}
        loop
        speed={700}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.title}>
            {({ isActive }) => (
              <div className="relative h-105 overflow-hidden sm:h-100">
                <Image
                  src={hero}
                  alt=""
                  fill
                  priority={i === 0}
                  placeholder="blur"
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-green-600/95 via-green-500/75 to-green-400/40" />
                <div className="container-fc relative flex h-full items-center">
                  {/* re-mount on activation so the entry animation replays */}
                  <div key={isActive ? "on" : "off"} className="max-w-md px-6 sm:px-10">
                    <h1 className="animate-fade-up text-3xl font-bold leading-tight text-white sm:text-4xl">
                      {slide.title}
                    </h1>
                    <p className="mt-4 animate-fade-up text-base text-white/90 [animation-delay:150ms] sm:text-lg">
                      {slide.text}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3 animate-fade-up [animation-delay:300ms]">
                      <Link
                        href="/products"
                        className={`rounded-xl bg-white px-6 py-3 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl ${slide.primaryColor}`}
                      >
                        {slide.primary}
                      </Link>
                      <Link
                        href="/products"
                        className="rounded-xl border-2 border-white/80 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                      >
                        {slide.secondary}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        aria-label="Previous slide"
        className="hero-prev absolute inset-s-3 top-1/2 z-10 hidden sm:flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-green-600 shadow-lg transition hover:scale-110 hover:bg-white sm:inset-s-6"
      >
        <FaChevronLeft />
      </button>
      <button
        aria-label="Next slide"
        className="hero-next absolute inset-e-3 top-1/2 z-10 hidden sm:flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-green-600 shadow-lg transition hover:scale-110 hover:bg-white sm:inset-e-6"
      >
        <FaChevronRight />
      </button>
    </section>
  );
}
