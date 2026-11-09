import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import clientLogos from "@/data/clientLogos.json";

type ClientLogo = {
  name: string;
  logo: string;
};

// Ulang kalau jumlah logo sedikit supaya slider loop tetap penuh; untuk 27 logo cukup sekali
const repeat = clientLogos.length
  ? Math.max(1, Math.ceil(12 / clientLogos.length))
  : 1;
const slides = Array.from({ length: repeat }).flatMap(
  () => clientLogos as ClientLogo[]
);

const HomeSponsor = () => {
  return (
    <div className="sponsor sponsor--clients section">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="sponsor__slider-w">
              <Swiper
                slidesPerView={5}
                spaceBetween={10}
                slidesPerGroup={1}
                speed={1200}
                loop={true}
                roundLengths={true}
                centeredSlides={true}
                centeredSlidesBounds={false}
                modules={[Autoplay]}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  1400: {
                    slidesPerView: 6,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                  576: {
                    slidesPerView: 2,
                  },
                }}
                className="sponsor__slider"
              >
                {slides.map((client, index) => (
                  <SwiperSlide key={`${client.name}-${index}`}>
                    <div className="sponsor__slider-item">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        sizes="(max-width: 576px) 50vw, (max-width: 1200px) 25vw, 16vw"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <div className="lines d-none d-lg-flex">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default HomeSponsor;
