"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const HeroSection = () => {
  const [hovered, setHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const containerRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const highlightedTextRef = useRef(null);
  const overlayRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after a small delay to ensure DOM is ready
    setTimeout(() => setIsLoaded(true), 100);

    const ctx = gsap.context(() => {
      // Create overlay animation
      const tl = gsap.timeline();

      // Initial state setup
      gsap.set(overlayRef.current, {
        scaleY: 1,
        transformOrigin: "top",
      });

      gsap.set(".hero-title .word", {
        y: 100,
        opacity: 0,
        rotateX: -40,
      });

      gsap.set(".hero-description", {
        y: 30,
        opacity: 0,
      });

      gsap.set(".logo-item", {
        y: 50,
        opacity: 0,
      });

      gsap.set(".reveal-block", {
        scaleX: 1,
      });

      // Main animation sequence
      tl.to(overlayRef.current, {
        scaleY: 0,
        duration: 1.2,
        ease: "power4.inOut",
        transformOrigin: "bottom",
      })
        .to(
          ".reveal-block",
          {
            scaleX: 0,
            duration: 1.4,
            ease: "power4.inOut",
            stagger: 0.1,
            transformOrigin: "left",
          },
          "-=0.8"
        )
        .to(
          ".hero-title .word",
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.08,
          },
          "-=1"
        )
        .to(
          ".hero-description",
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          ".logo-item",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.8"
        );

      // Create a subtle floating animation for the content
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleMouseEnter = () => {
    // Clear any existing timer first
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }

    // Set new timer
    hoverTimerRef.current = setTimeout(() => {
      setHovered(true);
      const ctx = gsap.context(() => {
        gsap.to(videoContainerRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      }, containerRef);
    }, 1000);
  };

  const handleMouseLeave = () => {
    // Clear the timer if mouse leaves before timeout
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    // Only animate out if we actually showed the video
    if (hovered) {
      setHovered(false);
      const ctx = gsap.context(() => {
        gsap.to(videoContainerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
        });
      }, containerRef);
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);
  const splitTitle = (text) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="word inline-block overflow-hidden">
        <span className="inline-block">
          <span className="reveal-block absolute inset-0 bg-[#F3F3EF]"></span>
          {word}
        </span>
        &nbsp;
      </span>
    ));
  };
  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center py-16 bg-[#F3F3EF]"
    >
      <div ref={overlayRef} className="fixed inset-0 bg-[#211b1b] z-50"></div>
      {/* Video Background */}
      <div
        ref={videoContainerRef}
        className="absolute z-20 inset-0 opacity-0 transition-opacity"
      >
        <Image
          src="/path-to-placeholder.jpg"
          alt="Digital Craftsmanship"
          fill
          className={`object-cover transition-opacity duration-500 ${
            videoLoaded ? "opacity-0" : "opacity-100"
          }`}
          priority
        />
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
        />
      </div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Main Headline */}
        <div className="space-y-3 mb-8">
          <h1 className="text-[2.75rem] md:text-6xl lg:text-7xl leading-tight tracking-tight">
            <span className="block font-['EB_Garamond'] text-[#1A1A1A]">
              Web Development Tailored to Your Vision &
            </span>
            <span className="block font-['EB_Garamond'] relative">
              <span
                ref={highlightedTextRef}
                className={`inline-block cursor-pointer relative z-30 ${
                  hovered
                    ? "text-[#F3F3EF bg-accent px-2 rounded-md transition-colors duration-300"
                    : "text-[#1A1A1A]"
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {splitTitle("Engineered for Your Success.")}
              </span>
            </span>
          </h1>
        </div>

        {/* Supporting Text */}
        <p className="font-['EB_Garamond'] text-xl text-[#4A4A4A] max-w-3xl mx-auto">
          I create websites that don&apos;t just look good—they perform. Clean
          code and user-focused experiences tailored to your needs.
        </p>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 w-full py-12 overflow-hidden opacity-70">
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#F3F3EF] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#F3F3EF] to-transparent z-10"></div>
        <div className="flex gap-16 justify-center whitespace-nowrap">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-20 opacity-30 hover:opacity-80 transition-opacity duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={30}
                className="w-full h-20 grayscale"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const logos = [
  { src: "/logos/hirex.svg", alt: "Hirex" },
  { src: "/logos/koach.svg", alt: "koach" },
  { src: "/logos/qoinpal.svg", alt: "qoinpal" },
  { src: "/logos/rinalogy.svg", alt: "rinalogy" },
  { src: "/logos/newton-insights.svg", alt: "newton-insights" },
  { src: "/logos/readsity.svg", alt: "readsity" },
];

export default HeroSection;
