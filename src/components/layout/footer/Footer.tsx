import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "public/images/logo-white.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="footer section pb-0"
      style={{ backgroundImage: "url('/images/footer/footer-bg.png')" }}
    >
      <div className="container">
        <div className="row gaper">
          <div className="col-12">
            <div className="footer__single footer__single--full">
              <Link href="/" className="title-anim">
                <Image src={logo} alt="Image" width={100} style={{ borderRadius: "20%"}}/>
              </Link>
              <div className="footer__single-meta">
                <Link
                  href="https://www.google.com/maps/d/viewer?mid=1UZ57Drfs3SGrTgh6mrYjQktu6uY&hl=en_US&ll=18.672105000000013%2C105.68673800000003&z=17"
                  target="_blank"
                  className="footer__single-meta-item footer__single-meta-item--address"
                >
                  <i className="fa-sharp fa-solid fa-location-dot"></i>
                  BMS Complex,
                  Jl. Timbul No.2 1, RT.9/RW.9, Pejaten Barat, Pasar Minggu,
                  Kota Jakarta Selatan, DKI Jakarta 12510
                </Link>
                <Link
                  href="tel:082260640501"
                  className="footer__single-meta-item"
                >
                  <i className="fa-sharp fa-solid fa-phone-volume"></i>
                  082260640501
                </Link>
                <Link
                  href="mailto:Dinda@wearehighfive.id"
                  className="footer__single-meta-item"
                >
                  <i className="fa-sharp fa-solid fa-envelope"></i>
                  Dinda@wearehighfive.id
                </Link>
              </div>
              <div className="footer__cta text-start">
                <Link href="contact-us" className="btn btn--secondary">
                  book a call now
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="col-12 col-lg-2 col-xl-2">
            <div className="footer__single">
              <div className="footer__single-intro">
                <h5>discover</h5>
              </div>
              <div className="footer__single-content">
                <ul>
                  <li>
                    <Link href="about-us">About Us</Link>
                  </li>
                  <li>
                    <Link href="client-feedback">Award Winning</Link>
                  </li>
                  <li>
                    <Link href="blog">News & Blog</Link>
                  </li>
                  <li>
                    <Link href="contact-us">careers</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
          {/* <div className="col-12 col-lg-5 col-xl-4">
            <div className="footer__single">
              <div className="footer__single-intro">
                <h5>Subscribe our newsletter</h5>
              </div>
              <div className="footer__single-content">
                <p>
                  Welcome to our digital agency We specialize in helping
                  business most like yours succeed online.
                </p>
                <div className="footer__single-form">
                  <form action="#" method="post">
                    <div className="input-email">
                      <input
                        type="email"
                        name="subscribe-news"
                        id="subscribeNews"
                        placeholder="Enter Your Email"
                        required
                      />
                      <button type="submit" className="subscribe">
                        <i className="fa-sharp fa-solid fa-paper-plane"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="footer__copyright">
              <div className="row align-items-center gaper">
                <div className="col-12 col-lg-8">
                  <div className="footer__copyright-text text-center text-lg-start">
                    <p>
                      Copyright &copy;
                      <span id="copyYear">{currentYear}</span> High Five. All
                      Rights Reserved
                    </p>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="social justify-content-center justify-content-lg-end">
                    <Link
                      href="https://www.facebook.com/wearehighfive.id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="High Five on Facebook"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="High Five on LinkedIn"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                    <Link
                      href="https://www.instagram.com/wearehighfive.id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="High Five on Instagram"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
