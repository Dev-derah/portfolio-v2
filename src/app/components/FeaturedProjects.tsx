"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward, MdCode } from "react-icons/md";
import Image from "next/image";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);
const FeaturedProjects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        // Header animation with split text
        const headerText = headerRef.current.querySelector("h2");
        if (headerText) {
          const chars = headerText.textContent?.split("") || [];
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
        }
      }

      projectRefs.current.forEach((project) => {
        const category =
          project.querySelector<HTMLElement>(".project-category");
        const title = project.querySelector<HTMLElement>(".project-title");
        const description = project.querySelector<HTMLElement>(
          ".project-description"
        );
        const cta = project.querySelector<HTMLElement>(".project-cta");
        const code = project.querySelector<HTMLElement>(".project-code");
        const imageContainer = project.querySelector<HTMLElement>(
          ".project-image-container"
        );
        const imageInner = project.querySelector<HTMLElement>(
          ".project-image-inner"
        );

        if (category && title && description && cta && code && imageContainer) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: project,
              start: "top 65%",
              end: "bottom top",
              toggleActions: "play none none none",
            },
          });

          // Set initial states
          gsap.set([category, title, description, cta, code], {
            opacity: 0,
            y: 30,
          });
          gsap.set(imageContainer, {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          });

          // Animate project reveal
          tl.to(imageContainer, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.2,
            ease: "power4.inOut",
          })
            .to(
              category,
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
              "-=0.8"
            )
            .to(
              title,
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
              "-=0.6"
            )
            .to(
              description,
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
              "-=0.6"
            )
            .to(
              [cta, code],
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
          if (imageInner) {
            gsap.to(imageInner, {
              y: "0%",
              ease: "none",
              scrollTrigger: {
                trigger: project,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            });
          }
        }
      });
    }, sectionRef);

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
            ref={(el) => {
              if (el) projectRefs.current[index] = el;
            }}
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
