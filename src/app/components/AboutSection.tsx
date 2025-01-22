"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaAward, FaCertificate } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      // Cards entry animation with staggered effect and scale
      const gridItems = gridRef.current.children;
      gsap.from(gridItems, {
        y: 100,
        scale: 0.9,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#F3F3EF] py-20 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="max-w-7xl mx-auto mb-16">
          <h2 className="font-['EB_Garamond'] text-6xl md:text-9xl text-[#1A1A1A] mb-8 leading-tight lg:text-8xl">
            About
          </h2>
          <p
            ref={subtitleRef}
            className="text-primary-800 text-lg max-w-2xl"
          >
            Crafting exceptional digital experiences through innovative web
            development and thoughtful design.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
        >
          {/* Experience Card - New Block */}
          <div className="lg:col-span-2 lg:row-span-2 group space-y-5">
            {/* Experience Card - New Block */}
            <div className="group">
              <div className="relative h-full rounded-3xl bg-[#2E2E3A] text-white backdrop-blur-sm p-8 overflow-hidden border border-neutral-200 transition-all duration-300 hover:shadow-2xl">
                <div className="highlight absolute inset-0 bg-gradient-to-br from-gold-light/10 to-gold-dark/10 opacity-0 scale-90 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="flex flex-col items-start gap-2">
                    {/* Image & Professional Summary */}
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden lg:w-96">
                      <Image
                        src="/photo.png"
                        alt="Chidera's Photo"
                        className="object-cover w-full h-full"
                        fill
                      />
                    </div>
                    <div className="text-center">
                      {/* <h4 className="text-2xl font-bold">Chidera</h4> */}
                      <p className="text-lg mt-4 text-left">
                        Experienced web developer with over 10 years of
                        expertise in building high-quality digital solutions. I
                        specialize in front-end and back-end development,
                        creating seamless, user-centered websites and
                        applications. Passionate about innovative web design,
                        optimization, and continuous learning.
                      </p>
                    </div>

                    {/* Download Resume Button */}
                    <div className="mt-8">
                      <Link
                        href="/path/to/resume.pdf" // Replace with your resume link
                        className="px-4 py-2 rounded-full bg-gold-DEFAULT border-gold-light text-gray-300 hover:bg-gold-light transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-3 border hover:border-primary-800 hover:text-black"
                        download
                      >
                        {/* Icon & Text */}
                        <span className="text-lg font-semibold">
                          Download Resume
                        </span>
                        <HiDownload />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group">
              <div className="relative h-full shadow-lg rounded-3xl bg-[#FAF5F0] text-[#2B2929] p-8 overflow-hidden transition-all duration-300 hover:shadow-2xl border border-neutral-200">
                <div className="highlight absolute inset-0 bg-gradient-to-br from-gold-light/10 to-gold-dark/10 opacity-0 scale-90 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="flex flex-col">
                    {/* Available for Work Section (Status Badge) */}
                    <div className="p-3 rounded-full flex items-center gap-2 border border-[#F1F9F4] max-w-max">
                      <span className="font-['EB_Garamond'] rounded-full bg-green-400 h-2 w-2 animate-pulse" />
                      <div className="font-semibold text-lg">
                        Available for Work
                      </div>
                    </div>

                    {/* Currently Working On Section (Three Dot Animation) */}
                    <div className="p-4 rounded-2xl flex items-center gap-4   shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="font-['EB_Garamond'] text-lg text-primary-900 mb-1">
                        Currently Working On:
                      </div>
                      <div className="flex items-center gap-2 text-[#D68F5B] font-medium">
                        Luxury Resort Platform (E-commerce & Booking)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="relative h-full shadow rounded-3xl bg-[#FAF5F0] text-[#2B2929] p-8 overflow-hidden transition-all duration-300 hover:shadow-xl border border-neutral-200">
              <div className="highlight absolute inset-0 bg-gradient-to-br from-gold-light/10 to-gold-dark/10 opacity-0 scale-90 transition-all duration-300" />
              <div className="relative z-10">
                <h3 className="font-['EB_Garamond'] text-2xl mb-8">
                  Experience & Impact
                </h3>
                <div className="flex flex-col gap-2">
                  <div className="p-1 rounded-2xl flex items-center gap-6">
                    <div>
                      <p className="text-4xl font-['EB_Garamond'] text-primary-900 mb-1">
                        3+
                      </p>
                      <p className="text-primary-800">Years of Excellence</p>
                    </div>
                  </div>
                  <div className="p-1 rounded-2xl flex items-center gap-6">
                    <div>
                      <p className="text-4xl font-['EB_Garamond'] text-primary-900 mb-1">
                        20+
                      </p>
                      <p className="text-primary-800">Projects Delivered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Awards & Recognition - New Block */}
          <div className="group">
            <div className="relative h-full rounded-3xl bg-[#2E2E3A] p-8 overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="highlight absolute inset-0 bg-gradient-to-br from-gold-light/20 to-gold-dark/20 opacity-0 scale-90 transition-all duration-300" />
              <div className="relative z-10">
                <h3 className="font-['EB_Garamond'] text-2xl text-neutral-50 mb-6">
                  Awards & Recognition
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <FaAward className="text-2xl text-gold-DEFAULT mt-1" />
                    <div>
                      <h4 className="text-neutral-50">
                        Best Web Developer 2023
                      </h4>
                      <p className="text-neutral-100/60">Design Awards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <FaCertificate className="text-2xl text-gold-DEFAULT mt-1" />
                    <div>
                      <h4 className="text-neutral-50">AWS Certified</h4>
                      <p className="text-neutral-100/60">Solutions Architect</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section with Categories */}
          <div className="group lg:col-span-2">
            <div className="relative h-full rounded-3xl bg-[#FAF5F0] shadow p-8 overflow-hidden transition-all duration-300 hover:shadow-xl border border-neutral-200">
              <div className="highlight absolute inset-0 bg-gradient-to-br from-gold-light/10 to-gold-dark/10 opacity-0 scale-90 transition-all duration-300" />
              <div className="relative z-10">
                <h3 className="font-['EB_Garamond'] text-2xl text-primary-900 mb-8">
                  Technical Expertise
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div>
                    <h4 className="font-['EB_Garamond'] text-lg text-primary-900 mb-4 border-b border-neutral-200 pb-2">
                      Development
                    </h4>
                    <ul className="space-y-2 text-primary-800">
                      {[
                        "React",
                        "Next.js",
                        "TypeScript",
                        "Node.js",
                        "GraphQL",
                      ].map((skill) => (
                        <li
                          key={skill}
                          className="flex items-center gap-3 hover:text-primary-900 transition-colors duration-200"
                        >
                          <span className="h-1 w-1 rounded-full bg-gold-DEFAULT"></span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-['EB_Garamond'] text-lg text-primary-900 mb-4 border-b border-neutral-200 pb-2">
                      No-Code Tools
                    </h4>
                    <ul className="space-y-2 text-primary-800">
                      {["Webflow", "Bubble", "Airtable"].map((tool) => (
                        <li
                          key={tool}
                          className="flex items-center gap-3 hover:text-primary-900 transition-colors duration-200"
                        >
                          <span className="h-1 w-1 rounded-full bg-gold-DEFAULT"></span>
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-['EB_Garamond'] text-lg text-primary-900 mb-4 border-b border-neutral-200 pb-2">
                      AI & Automation
                    </h4>
                    <ul className="space-y-2 text-primary-800">
                      {["OpenAI", "Zapier", "TensorFlow"].map((tool) => (
                        <li
                          key={tool}
                          className="flex items-center gap-3 hover:text-primary-900 transition-colors duration-200"
                        >
                          <span className="h-1 w-1 rounded-full bg-gold-DEFAULT"></span>
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-['EB_Garamond'] text-lg text-primary-900 mb-4 border-b border-neutral-200 pb-2">
                      3D Web Development
                    </h4>
                    <ul className="space-y-2 text-primary-800">
                      {["Three.js", "WebXR", "Unity WebGL"].map((tool) => (
                        <li
                          key={tool}
                          className="flex items-center gap-3 hover:text-primary-900 transition-colors duration-200"
                        >
                          <span className="h-1 w-1 rounded-full bg-gold-DEFAULT"></span>
                          {tool}
                        </li>
                      ))}
                    </ul>
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

export default AboutSection;
