import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import caseStudies from "@/data/caseStudies.json";

type CaseStudy = {
  slug: string;
  title: string;
  description?: string;
  image: string;
  logo: string;
  kpi: string;
  total: string;
  achievement: string;
};

type CardTint = {
  overlay: string;
  text: string;
  muted: string;
  line: string;
};

const FALLBACK_TINT: CardTint = {
  overlay: "rgba(0, 0, 0, 0.55)",
  text: "#ffffff",
  muted: "rgba(255, 255, 255, 0.72)",
  line: "rgba(255, 255, 255, 0.25)",
};

// Ambil warna background dari aset logo (area tepi) untuk dipakai sebagai overlay
const pickTintFromLogo = (img: HTMLImageElement): CardTint | null => {
  try {
    const size = 24;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(img, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);
    const pad = Math.max(1, Math.round(size * 0.08));

    let r = 0;
    let g = 0;
    let b = 0;
    let count = 0;

    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const onEdge =
          x < pad || x >= size - pad || y < pad || y >= size - pad;
        if (!onEdge) continue;

        const i = (y * size + x) * 4;
        if (data[i + 3] < 128) continue;

        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count += 1;
      }
    }

    if (!count) return null;

    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);

    const toLinear = (channel: number) => {
      const v = channel / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const luminance =
      0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

    // Pilih warna teks dengan kontras tertinggi terhadap warna overlay
    const whiteContrast = 1.05 / (luminance + 0.05);
    const darkContrast = (luminance + 0.05) / 0.0556;
    const darkText = darkContrast >= whiteContrast;

    return {
      overlay: `rgba(${r}, ${g}, ${b}, 0.9)`,
      text: darkText ? "rgba(17, 17, 17, 0.92)" : "#ffffff",
      muted: darkText ? "rgba(17, 17, 17, 0.66)" : "rgba(255, 255, 255, 0.72)",
      line: darkText ? "rgba(17, 17, 17, 0.18)" : "rgba(255, 255, 255, 0.25)",
    };
  } catch {
    return null;
  }
};

const CaseStudyCard = ({ study }: { study: CaseStudy }) => {
  const logoRef = useRef<HTMLImageElement>(null);
  const [tint, setTint] = useState<CardTint>(FALLBACK_TINT);

  useEffect(() => {
    const img = logoRef.current;
    if (!img) return;

    let cancelled = false;
    const update = () => {
      if (cancelled) return;
      const next = pickTintFromLogo(img);
      if (next) setTint(next);
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
          "--card-overlay": tint.overlay,
          "--card-text": tint.text,
          "--card-muted": tint.muted,
          "--card-line": tint.line,
        } as React.CSSProperties
      }
    >
      <Link
        href={`/case-study/${study.slug}`}
        className="portfolio__single-media"
        aria-label={study.title}
      >
        <Image
          src={study.image}
          alt={study.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </Link>
      <Link
        href={`/case-study/${study.slug}`}
        className="portfolio__single-content"
      >
        <span className="portfolio__single-head">
          <span className="portfolio__single-logo">
            <Image
              ref={logoRef}
              src={study.logo}
              alt={`${study.title} logo`}
              fill
              sizes="140px"
              style={{ objectFit: "contain", objectPosition: "left center" }}
            />
          </span>
          <span className="portfolio__single-arrow" aria-hidden="true">
            <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
          </span>
        </span>

        <span className="portfolio__single-body">
          <h3 className="portfolio__single-title">{study.title}</h3>
          {study.description ? (
            <p className="portfolio__single-desc">{study.description}</p>
          ) : null}
        </span>

        <ul className="portfolio__single-metrics">
          <li>
            <span className="label">KPI Views</span>
            <strong className="value">{study.kpi}</strong>
          </li>
          <li>
            <span className="label">Total Views</span>
            <strong className="value">{study.total}</strong>
          </li>
          <li>
            <span className="label">Achievement Rate</span>
            <strong className="value">{study.achievement}</strong>
          </li>
        </ul>
      </Link>
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
        <div className="row gaper">
          {caseStudies.map((study) => (
            <div className="col-12 col-md-6 col-xl-4" key={study.slug}>
              <CaseStudyCard study={study} />
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
