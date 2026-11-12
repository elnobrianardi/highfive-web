import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import caseStudies from "@/data/caseStudies.json";
import CaseStudyCardCompact from "./CaseStudyCardCompact";
import type { CaseStudy } from "@/types/caseStudy";

// JSON import melebarkan literal ("lg" | "sm") menjadi string,
// jadi datanya di-cast ke CaseStudy[] agar tetap type-safe
const studies = caseStudies as CaseStudy[];

const CaseStudyCard = ({ study }: { study: CaseStudy }) => {
  const logoRef = useRef<HTMLImageElement>(null);
  // rasio asli logo dipakai supaya kotak logo mengikuti bentuk aslinya
  const [logoRatio, setLogoRatio] = useState<number | null>(null);

  useEffect(() => {
    const img = logoRef.current;
    if (!img) return;

    let cancelled = false;
    const update = () => {
      if (cancelled) return;
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setLogoRatio(img.naturalWidth / img.naturalHeight);
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      update();
    } else {
      img.addEventListener("load", update, { once: true });
    }

    return () => {
      cancelled = true;
      img.removeEventListener("load", update);
    };
  }, [study.logo]);

  return (
    <div
      className="portfolio__single portfolio__single--metrics topy-tilt fade-top"
      style={
        {
          "--logo-ratio": logoRatio ?? undefined,
        } as React.CSSProperties
      }
    >
      {/* Kartu hanya presentasi visual: tidak ada tautan sama sekali,
          karena belum ada halaman detail case study. */}
      <div className="portfolio__single-media">
        <Image
          src={study.image}
          alt={study.title}
          fill
          sizes="(max-width: 767.98px) 100vw, (max-width: 1199.98px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="portfolio__single-content">
        <div className="portfolio__single-body">
          {/* logo menggantikan judul teks sebagai identitas kartu */}
          <span
            className={`portfolio__single-logo${
              study.logoSize === "lg" ? " portfolio__single-logo--lg" : ""
            }`}
          >
            <Image
              ref={logoRef}
              src={study.logo}
              alt={`${study.title} logo`}
              fill
              sizes="(max-width: 575.98px) 200px, 280px"
              style={{ objectFit: "contain", objectPosition: "left center" }}
            />
          </span>
          {/* judul tetap ada untuk pembaca layar dan SEO */}
          <h3 className="portfolio__single-title">{study.title}</h3>
          {study.description ? (
            <p className="portfolio__single-desc">{study.description}</p>
          ) : null}

          {study.metrics?.length ? (
            <ul className="portfolio__single-metrics">
              {study.metrics.map((metric, index) => (
                <li key={`${study.title}-metric-${index}`}>
                  <span className="label">{metric.label}</span>
                  <strong className="value">{metric.value}</strong>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};

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
        {/* desktop: kartu persegi dengan panel yang terbuka saat hover */}
        <div className="row gaper portfolio__cards d-none d-lg-flex">
          {studies.map((study) => (
            <div className="col-lg-4" key={study.title}>
              <CaseStudyCard study={study} />
            </div>
          ))}
        </div>

        {/* tablet & mobile: kartu kapsul dua bagian, tidak butuh hover */}
        <div className="row gaper portfolio__cards d-lg-none">
          {studies.map((study, index) => (
            <div className="col-12 col-sm-6" key={study.title}>
              <CaseStudyCardCompact study={study} index={index} />
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
