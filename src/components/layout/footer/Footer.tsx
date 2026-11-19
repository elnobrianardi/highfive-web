import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "public/images/logo-white.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="footer section pb-0"
      id="contact"
      style={{ backgroundImage: "url('/images/footer/footer-bg.png')" }}
    >
      <div className="container">
        <div className="row gaper footer__contact">
          <div className="col-12 col-lg-7">
            <div className="footer__contact-intro">
              <Link href="/" className="title-anim footer__logo">
                <Image
                  src={logo}
                  alt="High Five logo"
                  width={100}
                  style={{ borderRadius: "20%" }}
                />
              </Link>
              <h2>Let's Work Together</h2>
              <p>Have a campaign in mind? Get in touch with us.</p>
              <Link href="tel:082260640501" className="btn btn--secondary">
                book a call now
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="footer__contact-info">
              <div className="footer__contact-item">
                <p className="footer__contact-label">Address</p>
                <Link
                  href="https://maps.app.goo.gl/6rKedhnWYXQMZvS39"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__contact-address"
                >
                  BMS Complex, Jl. Timbul No.2 1, RT.9/RW.9, Pejaten Barat,
                  Pasar Minggu, Kota Jakarta Selatan, DKI Jakarta 12510
                </Link>
              </div>
              <div className="footer__contact-item">
                <p className="footer__contact-label">Phone</p>
                <Link href="tel:082260640501">082260640501</Link>
              </div>
              <div className="footer__contact-item">
                <p className="footer__contact-label">Email</p>
                <Link href="mailto:dinda@wearehighfive.id">
                  dinda@wearehighfive.id
                </Link>
              </div>
              <div className="footer__contact-item footer__contact-item--social">
                <div className="social justify-content-start">
                  <Link
                    href="https://www.instagram.com/wearehighfive.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="High Five on Instagram"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/high-five-influencers//"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="High Five on LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="footer__copyright footer__copyright--simple">
              <div className="footer__copyright-text">
                <p>
                  Copyright &copy; <span>{currentYear}</span> High Five. All
                  Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
