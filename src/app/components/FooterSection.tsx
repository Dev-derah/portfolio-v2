"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const headlineWordsRef = useRef([]);
  const socialRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation using words
      gsap.from(headlineWordsRef.current, {
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      });

      gsap.from(".email-button", {
        scrollTrigger: {
          trigger: ".email-button",
          start: "top 90%",
        },
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
      });

      // Social links stagger animation
      gsap.from(socialRef.current.children, {
        scrollTrigger: {
          trigger: socialRef.current,
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });

      // Background circle animation
      const circle = document.querySelector(".animated-circle");
      gsap.to(circle, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          scrub: 1,
        },
        rotation: 360,
        duration: 4,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  // Split the headline text into words
  const headlineText = "Let's create something extraordinary together";
  const headlineWords = headlineText.split(" ");

  return (
    <footer
      ref={sectionRef}
      className="relative bg-[#F3F3EF] pt-32 pb-20 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main headline */}
        <h2
          ref={headlineRef}
          className="font-['EB_Garamond'] text-5xl md:text-7xl lg:text-9xl text-[#1A1A1A] leading-tight mb-16"
        >
          <span className="flex flex-wrap">
            {headlineWords.map((word, index) => (
              <span
                key={index}
                ref={(el) => (headlineWordsRef.current[index] = el)}
                className="relative inline-block mr-[0.25em] mb-2"
              >
                {word}
              </span>
            ))}
          </span>
        </h2>

        {/* Contact section */}
        <div className="mb-24">
          <p className="text-[#1A1A1A]/60 text-xl mb-4">
            Ready to elevate your digital presence?
          </p>
          <a
            href="mailto:derah.dev@gmail.com"
            className="px-6 cursor-pointer py-3 bg-[#1A1A1A] text-white text-xl rounded-md hover:bg-[#333333] transition-colors duration-300"
          >
            <FiMail className="inline-block mr-2" />
            derah.dev@gmail.com
          </a>
        </div>

        {/* Social links */}
        <div ref={socialRef} className="flex flex-wrap gap-8 text-[#1A1A1A]/60">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 hover:text-[#1A1A1A] transition-colors duration-300"
          >
            <FiGithub className="text-2xl" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 hover:text-[#1A1A1A] transition-colors duration-300"
          >
            <FiLinkedin className="text-2xl" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 hover:text-[#1A1A1A] transition-colors duration-300"
          >
            <FiTwitter className="text-2xl" />
            <span>Twitter</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-24 text-[#1A1A1A]/40 text-sm">
          © {new Date().getFullYear()} Derah O. Crafting digital experiences.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
