"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Play, Pause, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MindMarketTracks() {
  const [isPlaying, setIsPlaying] = useState(false);
  const tracksRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!tracksRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Reveal Section Header
      gsap.from(".tracks-header", {
        scrollTrigger: {
          trigger: tracksRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      // 2. Bento Grid Staggered Card Float-In
      gsap.from(".bento-card", {
        scrollTrigger: {
          trigger: tracksRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.85,
        ease: "power3.out",
      });

      // 3. 3D Magnetic Tilt Physics on Cards
      const cards = gsap.utils.toArray<HTMLElement>(".bento-card");
      cards.forEach((card) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -6;
          const rotateY = ((x - centerX) / centerX) * 6;

          gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 800,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "elastic.out(1.1, 0.4)",
          });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
      });
    }, tracksRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={tracksRef} className="relative w-full bg-transparent py-16 sm:py-24 px-4 sm:px-6 select-none">
      <div className="max-w-[1240px] mx-auto space-y-10 sm:space-y-14">
        
        {/* SECTION INTRO: MindMarket Editorial Scale */}
        <div className="tracks-header flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[50px] bg-[#ffffff] border border-[#d5d5d4] text-xs font-medium text-[#2c2e2a]">
              <span className="w-2 h-2 rounded-full bg-[#8ed462]" />
              <span>Codelabs Over Lectures</span>
            </div>
            <h2 className="text-[42px] sm:text-[60px] md:text-[72px] font-medium tracking-[-0.04em] text-[#2c2e2a] leading-[1.05]">
              Innovation Pathways
            </h2>
          </div>
          <p className="text-[16px] sm:text-[17px] font-normal text-[#80827f] max-w-md leading-relaxed">
            Thoughtfully organized learning tracks with production-grade curriculum, direct Google engineer mentorship, and community code reviews.
          </p>
        </div>

        {/* BENTO GRID (3 COLUMNS: LEFT, CENTER, RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* ===================== COLUMN 1 (LEFT) ===================== */}
          <div className="flex flex-col gap-6">
            
            {/* Card 1: Pure White Developer Testimonial Card */}
            <div
              className="bento-card rounded-[36px] bg-[#ffffff] border border-[#e5e1d5] p-7 sm:p-9 flex flex-col justify-between flex-1 min-h-[300px] hover:border-[#8ed462] transition-colors duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
            >
              <div>
                <div className="text-[16px] font-medium text-[#2c2e2a]">
                  Amal Jyothi Developer, Class of 2026
                </div>
                <div className="text-[13px] text-[#9a9c98] mt-0.5">
                  From first git commit to building on Google Cloud & Gemini
                </div>

                {/* Big Coral Double Quote Marks */}
                <div className="mt-8 mb-4">
                  <svg className="w-12 h-12 text-[#ff705d] fill-current" viewBox="0 0 24 24">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.324 1.533-4.212 3.655-3.998 5.357a3.84 3.84 0 0 1 2.375-.815c2.148 0 3.82 1.637 3.82 3.753 0 2.215-1.78 3.99-3.99 3.99a3.88 3.88 0 0 1-3.547-1.165zm11 0C14.553 16.227 14 15 14 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.324 1.533-4.212 3.655-3.998 5.357a3.84 3.84 0 0 1 2.375-.815c2.148 0 3.82 1.637 3.82 3.753 0 2.215-1.78 3.99-3.99 3.99a3.88 3.88 0 0 1-3.547-1.165z" />
                  </svg>
                </div>

                <h3 className="text-[25px] sm:text-[28px] font-medium text-[#2c2e2a] leading-[1.25] tracking-[-0.03em]">
                  Shipping production apps with friends transformed my career trajectory.
                </h3>
              </div>

              <div className="pt-6 mt-4 border-t border-[#f5f1e4] flex items-center justify-between text-xs text-[#9a9c98]">
                <span>Student Story</span>
                <span className="font-mono">#SolutionChallenge</span>
              </div>
            </div>

            {/* Card 2: Vibrant Google Green Card - Open Source & Hackathons */}
            <div
              className="bento-card rounded-[36px] bg-[#34A853] p-7 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px] transition-transform duration-300 hover:-translate-y-1 text-white shadow-md shadow-[#34A853]/20"
            >
              <h3 className="text-[20px] sm:text-[22px] font-semibold text-white leading-snug tracking-[-0.02em] max-w-[280px] relative z-10">
                Hands-on codelabs, hackathons, and sprint-ready prototypes
              </h3>

              <div className="pt-6 relative z-10">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white text-[#2c2e2a] text-[14px] font-semibold transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 group w-fit"
                >
                  <span>Explore Tracks</span>
                  <span className="w-6 h-6 rounded-full bg-[#34A853] text-white flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>

              {/* Organic White Cloud/Petal Graphic at Bottom-Right */}
              <div className="absolute -bottom-5 -right-5 pointer-events-none z-0">
                <svg width="150" height="110" viewBox="0 0 150 110" fill="none" className="opacity-20">
                  <ellipse cx="130" cy="100" rx="38" ry="34" fill="#ffffff" />
                  <ellipse cx="90" cy="90" rx="34" ry="30" fill="#ffffff" />
                  <ellipse cx="55" cy="105" rx="28" ry="24" fill="#ffffff" />
                </svg>
              </div>
            </div>

          </div>

          {/* ===================== COLUMN 2 (CENTER) ===================== */}
          <div className="flex flex-col gap-6">
            
            {/* Card 3: Punchy Golden Amber Card - AI & Machine Learning */}
            <div
              className="bento-card rounded-[36px] bg-[#FBBC04] p-7 sm:p-8 pt-12 sm:pt-12 relative flex flex-col justify-between min-h-[250px] transition-transform duration-300 hover:-translate-y-1 shadow-md shadow-[#FBBC04]/25"
            >
              {/* Cute Code Token nested in top notch */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20">
                <div className="w-14 h-14 rounded-full bg-[#FBBC04] border-4 border-[#f5f1e4] flex items-center justify-center shadow-xs">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2c2e2a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2c2e2a] text-white text-xs font-semibold tracking-wide w-fit mb-4">
                  Gemini & AI/ML
                </div>
                <h3 className="text-[26px] sm:text-[30px] font-bold text-[#2c2e2a] tracking-[-0.03em] leading-tight">
                  Build with Gemini AI
                </h3>
                <p className="text-[15px] sm:text-[16px] text-[#2c2e2a]/90 font-medium leading-relaxed mt-2.5">
                  Learn multimodal generative models, function calling, and deploy context-aware intelligent agents.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#2c2e2a] hover:opacity-75 transition-opacity"
                >
                  <span>Explore AI track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4: Electric Google Blue Card - Google Cloud Study Jams */}
            <div
              className="bento-card rounded-[36px] bg-[#4285F4] p-7 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between flex-1 min-h-[290px] transition-transform duration-300 hover:-translate-y-1 shadow-md shadow-[#4285F4]/25"
            >
              <div>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold tracking-wide w-fit mb-3">
                  Cloud Study Jams
                </div>
                <h3 className="text-[26px] sm:text-[30px] font-bold text-white tracking-[-0.03em] leading-tight">
                  Google Cloud Infrastructure
                </h3>
                <p className="text-[15px] sm:text-[16px] text-white/95 font-medium leading-relaxed mt-2.5">
                  Hands-on Cloud Skills Boost labs, Kubernetes, BigQuery pipelines, and official Google badges.
                </p>
              </div>

              {/* Tactile Audio Player Pill adapted as Tech Podcast / Session Preview */}
              <div className="bg-white rounded-full p-2.5 sm:px-4 sm:py-3 flex items-center gap-3 text-[#2c2e2a] shadow-sm mt-8 select-none">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause audio" : "Play audio"}
                  className="w-10 h-10 rounded-full bg-[#EA4335] hover:bg-[#d93025] flex items-center justify-center text-white shrink-0 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[#2c2e2a] truncate">Cloud Jams Keynote</span>
                    <span className="text-[#80827f] font-mono text-[11px] shrink-0 ml-2">
                      {isPlaying ? "04:15" : "0:00"}
                    </span>
                  </div>
                  
                  {/* Progress track with scrubber dot */}
                  <div className="relative w-full h-1.5 bg-[#f0ede4] rounded-full overflow-visible flex items-center">
                    <motion.div
                      className="h-full bg-[#EA4335] rounded-full"
                      animate={{ width: isPlaying ? "62%" : "25%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <div
                      className="w-3 h-3 rounded-full bg-[#EA4335] border-2 border-white absolute shadow-xs pointer-events-none transition-all duration-300"
                      style={{ left: isPlaying ? "calc(62% - 6px)" : "calc(25% - 6px)" }}
                    />
                  </div>
                </div>

                <span className="text-[11px] font-mono text-[#80827f] shrink-0">12:40</span>
              </div>
            </div>

          </div>

          {/* ===================== COLUMN 3 (RIGHT) ===================== */}
          <div className="flex flex-col gap-6">
            
            {/* Card 5: Radiant Google Red / Coral Ember Card - Android & Flutter */}
            <div
              className="bento-card rounded-[36px] bg-[#EA4335] p-7 sm:p-8 text-white flex flex-col justify-between min-h-[220px] transition-transform duration-300 hover:-translate-y-1 shadow-md shadow-[#EA4335]/25"
            >
              <div>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#EA4335] text-xs font-semibold tracking-wide w-fit mb-4">
                  Mobile & Multiplatform
                </div>
                <h3 className="text-[26px] sm:text-[30px] font-bold text-white tracking-[-0.03em] leading-tight">
                  Android & Flutter
                </h3>
                <p className="text-[15px] sm:text-[16px] text-white/95 font-medium leading-relaxed mt-2.5">
                  Ship high-performance cross-platform apps using Kotlin, Jetpack Compose, and Flutter 3.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:opacity-85 transition-opacity"
                >
                  <span>Explore mobile track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 6: Violet / Indigo Card with GDG Community Stats */}
            <div
              className="bento-card rounded-[36px] bg-[#6366F1] p-7 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between flex-1 min-h-[340px] transition-transform duration-300 hover:-translate-y-1 shadow-md shadow-[#6366F1]/25"
            >
              {/* Organic White Flower Petals peaking in from Top Edge */}
              <div className="absolute -top-7 left-12 pointer-events-none z-0">
                <svg width="120" height="70" viewBox="0 0 120 70" fill="none" className="opacity-95">
                  <ellipse cx="60" cy="18" rx="28" ry="24" fill="#ffffff" />
                  <ellipse cx="25" cy="26" rx="22" ry="18" fill="#ffffff" />
                  <ellipse cx="95" cy="26" rx="22" ry="18" fill="#ffffff" />
                </svg>
              </div>

              {/* Organic White Flower Petals peaking in from Right Edge */}
              <div className="absolute top-1/4 -right-8 pointer-events-none z-0">
                <svg width="80" height="130" viewBox="0 0 80 130" fill="none" className="opacity-95">
                  <ellipse cx="60" cy="65" rx="30" ry="26" fill="#ffffff" />
                  <ellipse cx="50" cy="30" rx="24" ry="20" fill="#ffffff" />
                  <ellipse cx="50" cy="100" rx="24" ry="20" fill="#ffffff" />
                </svg>
              </div>

              {/* 3 Stacked Impact Stats */}
              <div className="space-y-6 relative z-10 my-auto py-2">
                <div>
                  <div className="text-[28px] sm:text-[32px] font-medium text-white tracking-tight leading-none">
                    1,200+ Members
                  </div>
                  <div className="text-[14px] text-white/85 font-normal mt-1.5">
                    Active student developers
                  </div>
                </div>

                <div>
                  <div className="text-[28px] sm:text-[32px] font-medium text-white tracking-tight leading-none">
                    45+ Workshops
                  </div>
                  <div className="text-[14px] text-white/85 font-normal mt-1.5">
                    Hands-on codelabs & sessions
                  </div>
                </div>

                <div>
                  <div className="text-[28px] sm:text-[32px] font-medium text-white tracking-tight leading-none">
                    350+ Cloud Badges
                  </div>
                  <div className="text-[14px] text-white/85 font-normal mt-1.5">
                    Google Cloud Skills Boost earned
                  </div>
                </div>
              </div>

              <div className="pt-4 relative z-10 border-t border-white/20 flex items-center justify-between text-xs text-white/80">
                <span>Verified Chapter Impact</span>
                <span className="font-mono">GDG AJCE // 2026</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
