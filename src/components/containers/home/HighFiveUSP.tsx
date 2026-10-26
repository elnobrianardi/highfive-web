import React, { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import dotlarge from "public/images/agency/dot-large.png";
import thumbone from "public/images/agency/thumb-one.png";
import thumbtwo from "public/images/agency/thumb-two.png";

gsap.registerPlugin(ScrollTrigger);

const HighFiveUSP = () => {
  const personas = [
    "Beauty",
    "Fashion",
    "Lifestyle",
    "Foodies",
    "Finance",
    "Tech",
    "Automotive",
    "Gamers",
    "And many more",
  ];

  const stats = [
    {
      value: "15K",
      label: "Influencers Database",
    },
    {
      value: "30",
      label: "City Covered",
    },
    {
      value: "500",
      label: "Historical Campaign",
    },
  ];

  useEffect(() => {
    const statsItems = document.querySelectorAll(".usp-stat");
    statsItems.forEach((item) => {
      const valueEl = item.querySelector(".usp-stat-value") as HTMLElement | null;
      if (!valueEl) return;
      const targetText = valueEl.getAttribute("data-value") || valueEl.textContent || "0";
      const isK = targetText.includes("K");
      const num = parseInt(targetText.replace("K", ""), 10);

      gsap.fromTo(
        valueEl,
        { textContent: 0 },
        {
          textContent: isK ? num : num,
          duration: 2,
          ease: "power1.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: function () {
            if (isK) {
              valueEl.textContent = Math.round(Number(valueEl.textContent)) + "K";
            } else {
              valueEl.textContent = Math.round(Number(valueEl.textContent)).toString();
            }
          },
        }
      );
    });

    const personaItems = document.querySelectorAll(".usp-persona");
    personaItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section className="section agency" style={{ padding: "100px 0" }}>
      <div className="container-fluid px-0">
        <div className="row g-0 align-items-center">
          <div className="col-12 col-lg-6 order-2 order-lg-1">
            <div className="px-4 px-lg-5">
              <div className="ms-lg-auto section__content" style={{ maxWidth: "600px" }}>
                <span className="sub-title">
                HIGH FIVE USP
                <i className="fa-solid fa-arrow-right"></i>
              </span>
                <h2 className="title title-anim">Why High Five</h2>
                <div className="paragraph">
                  <p>
                    We connect brands with the right influencers to deliver
                    measurable results through data-driven campaigns.
                  </p>
                </div>
                <div className="row gaper">
                  {stats.map((stat, index) => (
                    <div className="col-12" key={index}>
                      <div
                        className="usp-stat fade-top d-flex align-items-center justify-content-between"
                        style={{
                          padding: "18px 0",
                          borderBottom: "1px solid #414141",
                          marginBottom: "0",
                        }}
                      >
                        <p
                          className="primary-text"
                          style={{ marginBottom: "0", fontSize: "17px" }}
                        >
                          {stat.label}
                        </p>
                        <h3
                          className="title usp-stat-value"
                          data-value={stat.value}
                          style={{ fontSize: "46px", marginBottom: "0" }}
                        >
                          {stat.value}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 order-1 order-lg-2 d-none d-lg-flex justify-content-center align-items-center">
            <Image
              src={thumbone}
              alt="High Five"
              className="fade-right"
              priority
              style={{ maxWidth: "100%", height: "auto", width: "60%" }}
            />
          </div>
        </div>
        <div className="row g-0 align-items-center" style={{ marginTop: "80px" }}>
          <div className="col-12 col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
            <Image
              src={thumbtwo}
              alt="High Five Influencers"
              className="fade-left"
              priority
              style={{ maxWidth: "100%", height: "auto", width: "60%" }}
            />
          </div>
          <div className="col-12 col-lg-6">
            <div className="px-4 px-lg-5">
              <div className="me-lg-auto section__content" style={{ maxWidth: "600px" }}>
                <h2 className="title title-anim">Influencers Persona</h2>
                <div className="paragraph">
                  <p>
                    Diverse creator segments to match your brand&apos;s target
                    audience.
                  </p>
                </div>
                <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                  {personas.map((persona, index) => (
                    <div
                      className="usp-persona text-center"
                      key={index}
                      style={{
                        padding: "9px 22px",
                        border: "1px solid #414141",
                        borderRadius: "100px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <p
                        className="primary-text"
                        style={{ marginBottom: "0", fontSize: "14px" }}
                      >
                        {persona}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image src={dotlarge} alt="Image" className="dot-large" />
    </section>
  );
};

export default HighFiveUSP;
