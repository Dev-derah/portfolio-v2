"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdOpenInNew, MdCode, MdAutoAwesome } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const DemoSection = () => {
const sectionRef = useRef<HTMLDivElement | null>(null);
const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate grid items on scroll
      if (gridRef.current) {
        const gridItems = gridRef.current.children;
        gsap.from(gridItems, {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        });

        // Hover animations for grid items
        [...gridItems].forEach((item) => {
          const highlight = item.querySelector(".highlight");

          item.addEventListener("mouseenter", () => {
            gsap.to(highlight, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          });

          item.addEventListener("mouseleave", () => {
            gsap.to(highlight, {
              opacity: 0,
              scale: 0.8,
              duration: 0.4,
              ease: "power2.in",
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#F3F3EF] py-24 px-6 overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#2C3539]/5 to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-['EB_Garamond'] text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-6">
            Here Is A Demo
          </h2>
          <p className="text-[#4A4A4A] text-lg max-w-2xl mx-auto">
            Experience the perfect blend of form and function through our
            interactive demonstrations.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        >
          {/* Main Feature */}
          <div className="lg:col-span-2 lg:row-span-2 group">
            <div className="relative h-full rounded-3xl bg-gradient-to-br from-[#2C3539] to-[#1A1A1A] p-8 overflow-hidden">
              <div className="highlight absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 scale-90 transition-all duration-300" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#F3F3EF]/60 mb-6">
                    <MdAutoAwesome className="text-xl" />
                    <span>Featured Demo</span>
                  </div>
                  <h3 className="font-['EB_Garamond'] text-3xl text-[#F3F3EF] mb-4">
                    Interactive Prototype
                  </h3>
                  <p className="text-[#F3F3EF]/80 max-w-lg">
                    Experience our latest project in action. This demo showcases
                    the seamless integration of design and functionality.
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-8">
                  <button className="px-6 py-3 rounded-full bg-[#F3F3EF] text-[#1A1A1A] hover:bg-white transition-colors duration-300 flex items-center gap-2">
                    Try Demo <MdOpenInNew />
                  </button>
                  <a
                    href="#"
                    className="text-[#F3F3EF]/60 hover:text-[#F3F3EF] transition-colors duration-300"
                  >
                    <FaGithub className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Code Preview */}
          <div className="group">
            <div className="relative h-full rounded-3xl bg-[#2C3539]/10 backdrop-blur-sm p-8 overflow-hidden border border-[#2C3539]/10">
              <div className="highlight absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 scale-90 transition-all duration-300" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-[#4A4A4A] mb-4">
                  <MdCode className="text-xl" />
                  <span>Code</span>
                </div>
                <h3 className="font-['EB_Garamond'] text-2xl text-[#1A1A1A] mb-3">
                  Clean Architecture
                </h3>
                <p className="text-[#4A4A4A] mb-4">
                  Explore our well-structured codebase.
                </p>
                <pre className="bg-[#1A1A1A] rounded-xl p-4 text-[#F3F3EF] text-sm overflow-x-auto">
                  <code>{`const Demo = () => {
  return <Component />
}`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="group">
            <div className="relative h-full rounded-3xl bg-[#2C3539]/10 backdrop-blur-sm p-8 overflow-hidden border border-[#2C3539]/10">
              <div className="highlight absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 scale-90 transition-all duration-300" />
              <div className="relative z-10">
                <h3 className="font-['EB_Garamond'] text-2xl text-[#1A1A1A] mb-3">
                  Documentation
                </h3>
                <p className="text-[#4A4A4A] mb-6">
                  Comprehensive guides and API references.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-[#1A1A1A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    Getting Started
                  </li>
                  <li className="flex items-center gap-2 text-[#1A1A1A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    API Reference
                  </li>
                  <li className="flex items-center gap-2 text-[#1A1A1A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    Examples
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="group">
            <div className="relative h-full rounded-3xl bg-[#2C3539]/10 backdrop-blur-sm p-8 overflow-hidden border border-[#2C3539]/10">
              <div className="highlight absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 scale-90 transition-all duration-300" />
              <div className="relative z-10">
                <h3 className="font-['EB_Garamond'] text-2xl text-[#1A1A1A] mb-6">
                  Performance
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-4xl font-['EB_Garamond'] text-[#1A1A1A]">
                      99%
                    </p>
                    <p className="text-[#4A4A4A]">Uptime</p>
                  </div>
                  <div>
                    <p className="text-4xl font-['EB_Garamond'] text-[#1A1A1A]">
                      &lt;0.1s
                    </p>
                    <p className="text-[#4A4A4A]">Latency</p>
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

export default DemoSection;
