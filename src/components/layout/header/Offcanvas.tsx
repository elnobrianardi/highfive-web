import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "public/images/logo.png";

interface HeaderProps {
  openNav: boolean;
  setOpenNav: (value: boolean) => void;
}

const Offcanvas = ({ openNav, setOpenNav }: HeaderProps) => {
  const closeNav = () => {
    setOpenNav(false);
  };

  useEffect(() => {
    const handleResizeHeader = (): void => {
      setOpenNav(false);
    };

    window.addEventListener("resize", handleResizeHeader);

    return () => {
      window.removeEventListener("resize", handleResizeHeader);
    };
  }, [setOpenNav]);

  return (
    <div className="offcanvas-nav">
      <div
        className={"offcanvas-menu" + (openNav ? " show-offcanvas-menu" : " ")}
      >
        <nav className="offcanvas-menu__wrapper" data-lenis-prevent>
          <div className="offcanvas-menu__header nav-fade">
            <div className="logo">
              <Link href="/" onClick={closeNav}>
                <Image src={logo} alt="Image" title="Image" priority />
              </Link>
            </div>
            <button
              aria-label="close offcanvas menu"
              className="close-offcanvas-menu"
              onClick={closeNav}
            >
              <i className="fa-light fa-xmark-large"></i>
            </button>
          </div>
          <div className="offcanvas-menu__list">
            <div className="navbar__menu">
              <ul>
                <li className="navbar__item nav-fade">
                  <Link href="/" onClick={closeNav}>
                    Home
                  </Link>
                </li>
                <li className="navbar__item nav-fade">
                  <Link href="/#about-us" onClick={closeNav}>
                    About Us
                  </Link>
                </li>
                <li className="navbar__item nav-fade">
                  <Link href="/#services" onClick={closeNav}>
                    Services
                  </Link>
                </li>
                <li className="navbar__item nav-fade">
                  <Link href="/#case-study" onClick={closeNav}>
                    Case Study
                  </Link>
                </li>
                <li className="navbar__item nav-fade">
                  <Link href="/#contact" onClick={closeNav}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="offcanvas-menu__social nav-fade" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "16px" }}>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              aria-label="share us on instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link
              href="https://www.linkedin.com/"
              target="_blank"
              aria-label="share us on linkedin"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Offcanvas;
