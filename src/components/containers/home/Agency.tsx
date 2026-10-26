import React from "react";
import Image from "next/image";
import thumbone from "public/images/agency/thumb-one.png";
import thumbtwo from "public/images/agency/thumb-two.png";
import star from "public/images/star.png";
import dotlarge from "public/images/agency/dot-large.png";

const Agency = () => {
  return (
    <section className="section agency" id="about-us">
      <div className="container">
        <div className="row gaper align-items-center">
          <div className="col-12 col-lg-6">
            <div className="agency__thumb">
              <Image
                src={thumbone}
                alt="Image"
                className="thumb-one fade-left"
                priority
              />
              <Image
                src={thumbtwo}
                alt="Image"
                className="thumb-two fade-right"
                priority
              />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="agency__content section__content">
              <span className="sub-title">
                ABOUT US
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">
                High Five is an influencer marketing agency
              </h2>
              <div className="paragraph">
                <p>
                  High Five helps brands connect with the right creators through
                  strategic influencer marketing campaigns. We focus on driving
                  real impact by matching brands with relevant influencers to
                  reach the right audience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image src={star} alt="Image" className="star" priority />
      <Image src={dotlarge} alt="Image" className="dot-large" priority />
    </section>
  );
};

export default Agency;
