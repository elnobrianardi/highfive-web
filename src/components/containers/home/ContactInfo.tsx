import React from "react";
import Link from "next/link";

const ContactInfo = () => {
  return (
    <section className="section cta-two" id="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-11">
            <div className="cta-two-wrapper">
              <div className="row gaper align-items-center">
                <div className="col-12 col-lg-8">
                  <div className="cta-two__content">
                    <span className="sub-title">
                      CONTACT US
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                    <h2 className="title title-anim">
                      Let&apos;s Work Together
                    </h2>
                    <div className="paragraph">
                      <p>
                        Have a campaign in mind? Get in touch with us.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="cta-two__cta section__content-cta">
                    <div className="single">
                      <p className="primary-text">Email</p>
                      <Link href="mailto:hello@highfive.co.id">hello@highfive.co.id</Link>
                    </div>
                    <div className="single">
                      <p className="primary-text">Social Media</p>
                      <div className="social" style={{ justifyContent: "flex-start" }}>
                        <Link href="https://www.instagram.com/" target="_blank" style={{ color: "#6b6b6b", backgroundColor: "transparent" }}>
                          <i className="fa-brands fa-instagram"></i>
                        </Link>
                        <Link href="https://www.linkedin.com/" target="_blank" style={{ color: "#6b6b6b", backgroundColor: "transparent" }}>
                          <i className="fa-brands fa-linkedin-in"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
