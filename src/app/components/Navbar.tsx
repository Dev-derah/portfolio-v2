"use client";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import clsx from "clsx";
import { MdChevronRight } from "react-icons/md";
import Link from "next/link";

const navItems = ["Services", "Portfolio", "Process", "About", "Blog"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<number | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const handleNavItemHover = (index: number, isEntering: boolean) => {
    if (isEntering) {
      setActiveNavItem(index);
      const target = document.querySelector(`#nav-item-${index}`);
      gsap.to(target, {
        scale: 1.05,
        y: -2,
        duration: 0.3,
        ease: "elastic.out(1, 0.3)",
      });

      // Animate the pseudo-element line
      gsap.to(`#nav-line-${index}`, {
        width: "100%",
        opacity: 1,
        duration: 0.2,
        ease: "power1.out",
      });
    } else {
      const target = document.querySelector(`#nav-item-${index}`);
      gsap.to(target, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate the pseudo-element line back
      gsap.to(`#nav-line-${index}`, {
        width: "0%",
        opacity: 0,
        duration: 0.2,
        ease: "power1.in",
      });
      setActiveNavItem(null);
    }
  };

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      setIsMobileMenuOpen(true);
      const tl = gsap.timeline();
      tl.set(mobileMenuRef.current, { display: "flex" })
        .fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3 }
        )
        .fromTo(
          ".mobile-nav-item",
          {
            opacity: 0,
            x: -30,
            rotate: -10,
          },
          {
            opacity: 1,
            x: 0,
            rotate: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsMobileMenuOpen(false);
          gsap.set(mobileMenuRef.current, { display: "none" });
        },
      });
      tl.to(".mobile-nav-item", {
        opacity: 0,
        x: 30,
        rotate: 10,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
      }).to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.2,
      });
    }
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play().catch(() => setIsAudioPlaying(false));
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (navContainerRef) {
      if (currentScrollY === 0) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.remove("floating-nav");
      } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
        navContainerRef.current?.classList.add("floating-nav");
      } else if (currentScrollY < lastScrollY) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.add("floating-nav");
      }
      setLastScrollY(currentScrollY);
    }
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="mx-auto max-w-6xl rounded-full bg-[#F3F3EF]/80 backdrop-blur-md border border-[#1A1A1A]/10 shadow-sm">
            <div className="flex h-14 items-center justify-between px-6">
              {/* Logo and Brand */}
              <div className="flex items-center gap-7">
                <Link
                  href="/"
                  className="text-[#1A1A1A] font-['EB_Garamond'] text-xl tracking-tight hover:opacity-80 transition-opacity duration-200"
                >
                  DERAH O.
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <div key={index} className="relative">
                    <a
                      id={`nav-item-${index}`}
                      href={`#${item.toLowerCase()}`}
                      className="font-['EB_Garamond'] text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors duration-200 text-sm tracking-wide relative block py-1"
                      onMouseEnter={() => handleNavItemHover(index, true)}
                      onMouseLeave={() => handleNavItemHover(index, false)}
                    >
                      {item}
                      <span
                        id={`nav-line-${index}`}
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1A1A1A] opacity-0"
                      />
                    </a>
                  </div>
                ))}
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-6">
                {/* Audio Control */}
                <button
                  onClick={toggleAudioIndicator}
                  className="hidden md:flex items-center gap-2 relative"
                >
                  <audio
                    ref={audioElementRef}
                    className="hidden"
                    src="/audio/loop.mp3"
                    loop
                  />
                  <div
                    className={clsx(
                      "relative h-8 w-8 rounded-full bg-black border-4 border-gray-400 hover:scale-105 transition-transform duration-200",
                      isAudioPlaying && "animate-spin-slow"
                    )}
                  >
                    <div className="absolute inset-0 m-auto h-2 w-2 bg-gray-300 rounded-full"></div>
                    {isAudioPlaying && (
                      <>
                        <div className="absolute -left-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#4A4A4A] animate-pulse"></div>
                        <div className="absolute -right-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#4A4A4A] animate-pulse"></div>
                      </>
                    )}
                  </div>
                </button>

                {/* CTA Button */}
                <a
                  href="/contact"
                  className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[#2C3539] px-5 py-2 text-sm text-[#F3F3EF] transition-all duration-300 hover:bg-[#1A1A1A] hover:shadow-md hover:scale-105 group"
                >
                  Let&apos;s Talk
                  <MdChevronRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>

                {/* Hamburger Menu */}
                <button
                  onClick={toggleMobileMenu}
                  className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center"
                >
                  <span
                    className={clsx(
                      "w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300",
                      isMobileMenuOpen && "rotate-45 translate-y-0.5"
                    )}
                  />
                  <span
                    className={clsx(
                      "w-6 h-0.5 bg-[#1A1A1A] mt-1.5 transition-all duration-300",
                      isMobileMenuOpen && "-rotate-45 -translate-y-1"
                    )}
                  />
                </button>
              </div>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-[#F3F3EF] z-40 hidden flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center space-y-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="mobile-nav-item font-['EB_Garamond'] text-[#1A1A1A] text-2xl tracking-wide hover:scale-110 transition-transform duration-200"
              onClick={toggleMobileMenu}
            >
              {item}
            </a>
          ))}
          <a
            href="/contact"
            className="mobile-nav-item mt-8 inline-flex items-center gap-1.5 rounded-full bg-[#2C3539] px-6 py-3 text-base text-[#F3F3EF] transition-all duration-300 hover:bg-[#1A1A1A] hover:shadow-md hover:scale-105 group"
            onClick={toggleMobileMenu}
          >
            Let's Talk
            <MdChevronRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
