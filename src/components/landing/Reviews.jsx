"use client";

import WaveBottom from "@svgs/inline/wave-bottom.svg";
import Bean from "@svgs/inline/bean.svg";
import ArrowUp from "@svgs/inline/arrow-up.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, EffectCards } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

SwiperCore.use([Autoplay, Pagination, EffectCards]);

const Reviews = () => {
  return (
    <section className="relative px-[10%] pb-[6em]">
      <WaveBottom />
      <div className="pt-4 pb-6">
        <header className="relative mx-auto text-center max-w-2xl px-4 mb-14 z-10">
          <h2 className="text-md uppercase font-bold bg-[#111] px-4 py-1 rounded-full inline-block text-clr letter-spacing select-none">
            Happy Guests
          </h2>
          <p className="text-5xl font-bold text-clr-alt my-[0.5em]">What They Are Saying</p>
          <p className="text-2xl letter-spacing">
            Exploring new tastes and sharing them with our fellow food enthusiasts is what truly{" "}
            <span className="text-amber-400">ignites</span> our passion at X
          </p>
        </header>
        <div className="flex items-start flex-row sm:flex-row m-0 sm:mx-auto">
          <div className="w-1/2 absolute md:relative md:w-[40%] self-baseline mr-10 -ml-8">
            <Bean />
          </div>
          <div className="w-full md:w-1/2 md:translate-x-20 rounded-3xl review">
            <Swiper
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              effect="cards"
              style={{
                "--swiper-navigation-size": "20px",
                "--swiper-pagination-color": "#c0eb75",
                "--swiper-pagination-bullet-width": "16px",
                "--swiper-pagination-bullet-height": "16px",
              }}
            >
              <SwiperSlide>
                <img
                  src="https://www.bu.edu/questrom/files/2018/10/Four-Star-Reviews-Daniella-Kupor.jpg"
                  alt="Image 1"
                  className="w-full h-auto object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://exclusive.multibriefs.com/images/exclusive/0513onlinereview.jpg"
                  alt="Image 1"
                  className="w-full h-auto object-cover"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="relative pb-4">
            <ArrowUp className="absolute bottom-4 left-[20%] w-48" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
