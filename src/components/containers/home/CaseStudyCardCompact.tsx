import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CaseStudy } from "@/types/caseStudy";

/**
 * Kartu case study versi tablet & mobile.
 *
 * Bentuknya kapsul dengan dua bagian:
 * - atas: foto persegi, logo menempel di kiri bawah
 * - bawah: deskripsi (dipotong 3 baris) + metrik, dengan tombol "Read More"
 *
 * Tinggi bagian bawah dipatok lewat CSS, jadi semua kartu sebaris sama tinggi.
 * Kartu murni presentasi: tidak ada tautan sama sekali.
 */
const CaseStudyCardCompact = ({
  study,
  index = 0,
}: {
  study: CaseStudy;
  index?: number;
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const descId = useIdSafe();

  // rasio asli logo dipakai supaya kotak logo mengikuti bentuk aslinya
  const [logoRatio, setLogoRatio] = useState<number | null>(null);
  // animasi masuk, meniru .fade-top milik versi desktop
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // true kalau deskripsi memang lebih panjang dari 3 baris (masih bisa dibuka)
  const [clamped, setClamped] = useState(false);

  // rasio logo
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

  // muncul saat kartu masuk viewport (setara ScrollTrigger pada desktop)
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // deteksi apakah teks benar-benar terpotong, supaya tombol Read More
  // hanya muncul saat memang ada sisa teks yang perlu dibuka
  useEffect(() => {
    const el = descRef.current;
    if (!el) return;

    const measure = () => {
      setClamped(el.scrollHeight - el.clientHeight > 2);
    };

    measure();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(measure);
      observer.observe(el);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [study.description]);

  const handleToggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <article
      ref={cardRef}
      className={`study-card${visible ? " is-visible" : ""}${
        expanded ? " is-expanded" : ""
      }`}
      style={
        {
          "--logo-ratio": logoRatio ?? undefined,
          "--reveal-delay": `${Math.min(index, 5) * 0.15}s`,
        } as React.CSSProperties
      }
    >
      <div className="study-card__media">
        <Image
          src={study.image}
          alt={study.title}
          fill
          sizes="(max-width: 575.98px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />

        <span
          className={`study-card__logo${
            study.logoSize === "lg" ? " study-card__logo--lg" : ""
          }`}
        >
          <Image
            ref={logoRef}
            src={study.logo}
            alt={`${study.title} logo`}
            fill
            sizes="(max-width: 575.98px) 180px, 240px"
            style={{ objectFit: "contain", objectPosition: "left bottom" }}
          />
        </span>
      </div>

      <div className="study-card__body">
        {/* judul tetap ada untuk pembaca layar dan SEO */}
        <h3 className="study-card__title">{study.title}</h3>

        {study.description ? (
          <p className="study-card__desc" id={descId} ref={descRef}>
            {study.description}
          </p>
        ) : null}

        {study.description && clamped ? (
          <button
            type="button"
            className="study-card__toggle"
            aria-expanded={expanded}
            aria-controls={descId}
            onClick={handleToggle}
          >
            <span>{expanded ? "Show Less" : "Read More"}</span>
            <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
          </button>
        ) : null}

        {study.metrics?.length ? (
          <ul className="study-card__metrics">
            {study.metrics.map((metric, index) => (
              <li key={`${study.title}-metric-${index}`}>
                <span className="label">{metric.label}</span>
                <strong className="value">{metric.value}</strong>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
};

/**
 * useId hanya tersedia di React 18; helper ini menjaga kompatibilitas
 * kalau komponen dipakai di environment yang lebih lama.
 */
function useIdSafe() {
  const idRef = useRef<string>("");
  if (!idRef.current) {
    idRef.current = `study-desc-${Math.random().toString(36).slice(2, 9)}`;
  }
  return idRef.current;
}

export default CaseStudyCardCompact;
