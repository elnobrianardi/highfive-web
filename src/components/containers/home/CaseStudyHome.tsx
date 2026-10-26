import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import one from "public/images/portfolio/one.png";
import two from "public/images/portfolio/two.png";
import three from "public/images/portfolio/three.png";

const caseStudies = [
  {
    slug: "campaign-one",
    title: "Campaign One",
    image: one,
  },
  {
    slug: "campaign-two",
    title: "Campaign Two",
    image: two,
  },
  {
    slug: "campaign-three",
    title: "Campaign Three",
    image: three,
  },
];

const CaseStudyHome = () => {
  return (
    <section className="section portfolio pb-0 fade-wrapper position-relative" id="case-study">
      <div className="portfolio__text-slider-w">
        <Swiper
          slidesPerView="auto"
          spaceBetween={40}
          speed={5000}
          loop={true}
          centeredSlides={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: false,
          }}
          className="portfolio__text-slider"
        >
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                <Link href="/#case-study">
                  Case Study
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1 str">
                <Link href="/#case-study">
                  Case Study
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                <Link href="/#case-study">
                  Case Study
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1 str">
                <Link href="/#case-study">
                  Case Study
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                <Link href="/#case-study">
                  Case Study
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1 str">
                <Link href="/#case-study">
                  Case Study
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                <Link href="/#case-study">
                  Case Study
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="container" id="case-study">
        <div className="row gaper align-items-start">
          <div className="col-12 col-lg-6 col-xl-7">
            <div className="section__header text-start">
              <span className="sub-title">
                CASE STUDY
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">Our Case Study</h2>
            </div>
          </div>
        </div>
        <div className="row gaper">
          {caseStudies.map((study) => (
            <div className="col-12 col-md-6 col-xl-4" key={study.slug}>
              <div className="portfolio__single topy-tilt fade-top">
                <Link href={`/case-study/${study.slug}`}>
                  <Image src={study.image} alt={study.title} />
                </Link>
                <div className="portfolio__single-content">
                  <Link href={`/case-study/${study.slug}`}>
                    <h4>{study.title}</h4>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lines d-none d-lg-flex">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </section>
  );
};

export default CaseStudyHome;
