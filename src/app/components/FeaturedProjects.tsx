"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward, MdCode } from "react-icons/md";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Luxury Resort Platform",
    category: "E-commerce & Booking",
    year: "2024",
    description: "An immersive digital experience for premium hospitality",
    image: "/ci.png",
    link: "/projects/resort",
    // codeLink: "/code/resort",
  },
  {
    id: 2,
    title: "Private Banking Interface",
    category: "Financial Technology",
    year: "2023",
    description: "Redefining wealth management for the digital age",
    image: "/cb.png",
    link: "/projects/banking",
  },
  {
    id: 3,
    title: "Premium Auto Configurator",
    category: "3D & Interactive",
    year: "2023",
    description: "Crafting the future of automotive customization",
    image: "/projectDemo.svg",
    link: "/projects/auto",
    // codeLink: "/code/auto",
  },
];

const FeaturedProjects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with improved split text
      const headerText = headerRef.current.querySelector("h2");
      const chars = headerText.textContent.split("");
      headerText.textContent = "";
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.opacity = "0";
        span.style.transform = "translateY(50px)";
        span.style.display = "inline-block";
        headerText.appendChild(span);
      });

      gsap.to(headerText.children, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.03,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      });

      projectRefs.current.forEach((project, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top 65%",
            end: "bottom top",
            toggleActions: "play none none none",
          },
        });

        // Set initial states
        gsap.set(project.querySelector(".project-category"), {
          opacity: 0,
          y: 30,
        });
        gsap.set(project.querySelector(".project-title"), {
          opacity: 0,
          y: 50,
        });
        gsap.set(project.querySelector(".project-description"), {
          opacity: 0,
          y: 30,
        });
        gsap.set(project.querySelector(".project-cta"), { opacity: 0, y: 20 });
        gsap.set(project.querySelector(".project-code"), { opacity: 0, y: 20 });
        gsap.set(project.querySelector(".project-image-container"), {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        });

        // Animate project reveal
        tl.to(project.querySelector(".project-image-container"), {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
          ease: "power4.inOut",
        })
          .to(
            project.querySelector(".project-category"),
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.8"
          )
          .to(
            project.querySelector(".project-title"),
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.6"
          )
          .to(
            project.querySelector(".project-description"),
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.6"
          )
          .to(
            [
              project.querySelector(".project-cta"),
              project.querySelector(".project-code"),
            ],
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
            },
            "-=0.6"
          );

        // Smooth parallax effect
        gsap.to(project.querySelector(".project-image-inner"), {
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-[#F3F3EF] to-[#E8E8E1] py-32 px-6"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-32">
        <h2 className="font-['EB_Garamond'] md:text-9xl text-[#1A1A1A] mb-8 leading-tight text-6xl lg:text-8xl">
          Featured Work
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (projectRefs.current[index] = el)}
            className="mb-40 last:mb-0 group"
            onMouseEnter={() => setActiveProject(project.id)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <div className="relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Project Info */}
                <div className="relative z-10 transform transition-transform duration-500 group-hover:translate-x-6">
                  <p className="project-category text-[#1A1A1A]/60 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
                    {project.category} · {project.year}
                  </p>
                  <h3 className="project-title font-['EB_Garamond'] text-5xl md:text-7xl text-[#1A1A1A] mb-6 leading-tight">
                    {project.title}
                  </h3>
                  <p className="project-description text-[#1A1A1A]/80 text-xl mb-8 max-w-lg">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-6">
                    <a
                      href={project.link}
                      className="project-cta inline-flex items-center gap-3 text-[#1A1A1A] text-lg group/link"
                    >
                      <span className="relative overflow-hidden">
                        View Project
                        <span className="absolute bottom-0 left-0 w-full h-px bg-[#1A1A1A] transform origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500" />
                      </span>
                      <span className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center transform group-hover/link:scale-110 transition-transform duration-300">
                        <MdArrowOutward className="text-lg" />
                      </span>
                    </a>
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        className="project-code inline-flex items-center gap-3 text-[#1A1A1A] text-lg group/code"
                      >
                        <span className="relative overflow-hidden">
                          View Code
                          <span className="absolute bottom-0 left-0 w-full h-px bg-[#1A1A1A] transform origin-left scale-x-0 group-hover/code:scale-x-100 transition-transform duration-500" />
                        </span>
                        <span className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center transform group-hover/code:scale-110 transition-transform duration-300">
                          <MdCode className="text-lg" />
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Image */}
                <div className="project-image-container relative aspect-[3.5/4] overflow-hidden rounded-2xl transform transition-transform duration-500 group-hover:scale-95">
                  <div className="project-image-inner relative h-full w-full">
                    <Image
                      src={project.image}
                      alt={`${project.title} project showcase`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={index === 0} // Load the first image immediately
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
