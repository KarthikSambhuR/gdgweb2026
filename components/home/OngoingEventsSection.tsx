"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Mail, Check } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CreativeEventPoster from "@/components/programs/CreativeEventPoster";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// =============================================================================
// STORYBOOK ILLUSTRATIONS & CHARACTERS (Directly modeled from reference mockup)
// =============================================================================

// 1. Google Cloud Computing Engine & Kubernetes Cluster
function CloudKubernetesClusterArt() {
  return (
    <div className="w-full h-full bg-[#E8F0FE] relative flex items-center justify-center overflow-hidden select-none">
      <svg viewBox="0 0 240 180" className="w-[85%] h-[85%] max-w-[260px] drop-shadow-xs" fill="none">
        {/* Soft Background Grid */}
        <line x1="20" y1="40" x2="220" y2="40" stroke="#4285F4" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4,4" />
        <line x1="20" y1="90" x2="220" y2="90" stroke="#4285F4" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4,4" />
        <line x1="20" y1="140" x2="220" y2="140" stroke="#4285F4" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4,4" />

        {/* Central Cloud Node Container */}
        <g transform="translate(120, 85)">
          {/* Main White Cloud */}
          <path
            d="M -50 15 
               A 22 22 0 0 1 -35 -20 
               A 32 32 0 0 1 20 -28 
               A 28 28 0 0 1 52 5 
               A 20 20 0 0 1 45 25 
               L -40 25 
               A 16 16 0 0 1 -50 15 Z"
            fill="#FFFFFF"
            stroke="#2c2e2a"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Kubernetes Wheel in Center */}
          <g transform="translate(0, 0)">
            <circle cx="0" cy="0" r="14" fill="#4285F4" stroke="#2c2e2a" strokeWidth="2" />
            <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
            {/* 7 spokes */}
            {[0, 51.4, 102.8, 154.2, 205.7, 257.1, 308.5].map((deg) => (
              <line
                key={deg}
                x1="0"
                y1="0"
                x2="0"
                y2="-13"
                stroke="#FFFFFF"
                strokeWidth="2"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>

          {/* Micro Terminal Badge */}
          <rect x="-34" y="32" width="68" height="18" rx="6" fill="#2c2e2a" />
          <circle cx="-24" cy="41" r="2" fill="#34A853" />
          <line x1="-16" y1="41" x2="20" y2="41" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Google Cloud Sparkle Orbs */}
        <circle cx="48" cy="55" r="9" fill="#34A853" stroke="#2c2e2a" strokeWidth="2" />
        <circle cx="192" cy="115" r="11" fill="#EA4335" stroke="#2c2e2a" strokeWidth="2" />
        <circle cx="180" cy="45" r="7" fill="#FBBC04" stroke="#2c2e2a" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// 2. Flutter & Android Cross-Platform Device Canvas
function FlutterAndroidDeviceArt() {
  return (
    <div className="w-full h-full bg-[#FEF08A] relative flex items-center justify-center overflow-hidden select-none">
      <svg viewBox="0 0 240 180" className="w-[85%] h-[85%] max-w-[260px] drop-shadow-xs" fill="none">
        {/* Floating Smartphone Device */}
        <g transform="translate(85, 30)">
          <rect width="65" height="115" rx="14" fill="#FFFFFF" stroke="#2c2e2a" strokeWidth="3" />
          {/* Top Notch */}
          <rect x="22" y="6" width="21" height="4" rx="2" fill="#2c2e2a" />
          {/* Screen area */}
          <rect x="6" y="16" width="53" height="88" rx="8" fill="#F0FDF4" />
          
          {/* Flutter Dash / Wings Winglet */}
          <path d="M 20 40 L 45 40 L 32 55 Z" fill="#02569B" stroke="#2c2e2a" strokeWidth="1.5" />
          <path d="M 28 58 L 45 78 L 36 78 L 22 62 Z" fill="#0175C2" stroke="#2c2e2a" strokeWidth="1.5" />
          <path d="M 33 67 L 45 55 L 45 63 L 38 72 Z" fill="#29B6F6" stroke="#2c2e2a" strokeWidth="1.5" />
        </g>

        {/* Playful Android Bot Peeking */}
        <g transform="translate(165, 85)">
          {/* Head dome */}
          <path d="M -24 0 A 24 24 0 0 1 24 0 Z" fill="#3DDC84" stroke="#2c2e2a" strokeWidth="2.5" />
          {/* Eyes */}
          <circle cx="-10" cy="-10" r="2.5" fill="#FFFFFF" />
          <circle cx="10" cy="-10" r="2.5" fill="#FFFFFF" />
          {/* Antennas */}
          <line x1="-14" y1="-18" x2="-20" y2="-28" stroke="#2c2e2a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="14" y1="-18" x2="20" y2="-28" stroke="#2c2e2a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Body */}
          <rect x="-24" y="6" width="48" height="32" rx="6" fill="#3DDC84" stroke="#2c2e2a" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

// 3. Gemini Multimodal Generative AI Studio Canvas
function GeminiAIStudioArt() {
  return (
    <div className="w-full h-full bg-[#E0E7FF] relative flex items-center justify-center overflow-hidden select-none">
      <svg viewBox="0 0 240 180" className="w-[85%] h-[85%] max-w-[260px] drop-shadow-xs" fill="none">
        {/* Multimodal Connection Rays */}
        <line x1="120" y1="90" x2="55" y2="45" stroke="#818CF8" strokeWidth="2" strokeDasharray="4,4" />
        <line x1="120" y1="90" x2="190" y2="50" stroke="#818CF8" strokeWidth="2" strokeDasharray="4,4" />
        <line x1="120" y1="90" x2="60" y2="135" stroke="#818CF8" strokeWidth="2" strokeDasharray="4,4" />
        <line x1="120" y1="90" x2="185" y2="135" stroke="#818CF8" strokeWidth="2" strokeDasharray="4,4" />

        {/* Central Gemini 4-Point Star */}
        <g transform="translate(120, 90)">
          <path
            d="M 0 -45
               Q 7 -14 42 0
               Q 7 14 0 45
               Q -7 14 -42 0
               Q -7 -14 0 -45 Z"
            fill="#4F46E5"
            stroke="#2c2e2a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Glowing Inner Core */}
          <circle cx="0" cy="0" r="10" fill="#FFFFFF" />
          <circle cx="0" cy="0" r="4" fill="#F43F5E" />
        </g>

        {/* Satellite Data Nodes */}
        {/* Vision / Image Token */}
        <g transform="translate(55, 45)">
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#2c2e2a" strokeWidth="2" />
          <rect x="-7" y="-6" width="14" height="12" rx="2" stroke="#4285F4" strokeWidth="1.8" fill="none" />
          <circle cx="-2" cy="-2" r="1.5" fill="#4285F4" />
        </g>

        {/* Code / Logic Token */}
        <g transform="translate(190, 50)">
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#2c2e2a" strokeWidth="2" />
          <path d="M -5 -4 L -9 0 L -5 4" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
          <path d="M 5 -4 L 9 0 L 5 4" stroke="#34A853" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Audio / Voice Wave Token */}
        <g transform="translate(60, 135)">
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#2c2e2a" strokeWidth="2" />
          <line x1="-7" y1="-3" x2="-7" y2="3" stroke="#FBBC04" strokeWidth="2" strokeLinecap="round" />
          <line x1="-2" y1="-7" x2="-2" y2="7" stroke="#FBBC04" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="-4" x2="3" y2="4" stroke="#FBBC04" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="-1" x2="8" y2="1" stroke="#FBBC04" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Deployment Rocket Token */}
        <g transform="translate(185, 135)">
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#2c2e2a" strokeWidth="2" />
          <path d="M -4 4 L 4 -4" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="1,-6 5,-5 6,-1" fill="#34A853" />
        </g>
      </svg>
    </div>
  );
}

// 4. Mint Green Canvas with Coding Clover Bot
function MintCloverBotArt() {
  return (
    <div className="w-full h-full bg-[#D2F4B8] relative flex items-center justify-center overflow-hidden select-none">
      <svg viewBox="0 0 240 180" className="w-[85%] h-[85%] max-w-[260px] drop-shadow-xs" fill="none">
        {/* Soft Organic Clover Shape */}
        <g transform="translate(120, 90)">
          <circle cx="-24" cy="-15" r="22" fill="#8ED462" />
          <circle cx="24" cy="-15" r="22" fill="#8ED462" />
          <circle cx="0" cy="20" r="24" fill="#8ED462" />

          {/* Cute Face */}
          <circle cx="-10" cy="-2" r="3" fill="#2c2e2a" />
          <circle cx="10" cy="-2" r="3" fill="#2c2e2a" />
          <path d="M -5 8 Q 0 13 5 8" stroke="#2c2e2a" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Laptop Base */}
          <rect x="-38" y="32" width="76" height="8" rx="4" fill="#2c2e2a" />
          <rect x="-28" y="10" width="56" height="24" rx="4" fill="#FFFFFF" stroke="#2c2e2a" strokeWidth="2.5" />
          {/* Laptop Screen Code Lines */}
          <line x1="-20" y1="18" x2="-2" y2="18" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
          <line x1="-20" y1="24" x2="6" y2="24" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Android Antennas */}
        <line x1="105" y1="46" x2="95" y2="30" stroke="#2c2e2a" strokeWidth="3" strokeLinecap="round" />
        <line x1="135" y1="46" x2="145" y2="30" stroke="#2c2e2a" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Map art components
const ART_COMPONENTS = [
  CloudKubernetesClusterArt,
  FlutterAndroidDeviceArt,
  GeminiAIStudioArt,
  MintCloverBotArt,
];

interface OngoingEventItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  tag: string;
  date?: string;
  endDate?: string;
  registrationLastDate?: string;
  isOngoing?: boolean;
  status?: string;
  isHidden?: boolean;
  artIndex: number;
  posterUrl?: string;
}

// =============================================================================
// DEFAULT / CURATED ONGOING EVENTS (High-polish fallback ensuring vibrancy)
// =============================================================================
// No default events, purely dynamic from firestore

export default function OngoingEventsSection() {
  const [events, setEvents] = useState<OngoingEventItem[]>([]);
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch live ongoing events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const now = new Date();

        const liveEvents: OngoingEventItem[] = snapshot.docs
          .map((doc, idx) => {
            const data = doc.data();
            return {
              id: doc.id,
              slug: data.slug || doc.id,
              title: data.title,
              description: data.tagline || (data.description ? data.description.substring(0, 95) + "..." : ""),
              tag: data.status === "ongoing" || data.isOngoing ? "LIVE NOW" : "REGISTRATION OPEN",
              date: data.date,
              endDate: data.endDate,
              registrationLastDate: data.registrationLastDate,
              isOngoing: data.isOngoing || false,
              status: data.status || "upcoming",
              isHidden: data.isHidden || false,
              artIndex: idx % ART_COMPONENTS.length,
              posterUrl: data.posterUrl,
            };
          })
          .filter((event) => {
            if (event.isHidden) return false;
            if (event.isOngoing || event.status === "ongoing" || event.status === "live") return true;

            if (event.date) {
              const start = new Date(event.date);
              const end = event.endDate ? new Date(event.endDate) : new Date(start.getTime() + 86400000);
              if (!isNaN(start.getTime()) && now >= start && now <= end) return true;
            }

            if (event.registrationLastDate) {
              const regEnd = new Date(event.registrationLastDate);
              if (!isNaN(regEnd.getTime()) && now <= regEnd) return true;
            }
            return false;
          });

        if (liveEvents.length > 0) {
          setEvents(liveEvents);
        }
      } catch (err) {
        console.warn("Using default curated ongoing events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 360;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribing(true);
    try {
      await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage_ongoing_events" }),
      });
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail("");
    } catch {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
    } finally {
      setSubscribing(false);
    }
  };

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".events-headline-wrap", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".event-carousel-card", {
        scrollTrigger: {
          trigger: scrollRef.current || sectionRef.current,
          start: "top 85%",
        },
        x: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [events]);

  return (
    <section ref={sectionRef} className="relative w-full bg-transparent py-14 sm:py-20 px-4 sm:px-6 select-none overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        {/* TOP / TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ===================== LEFT COLUMN (HEADLINE & SUBSCRIBE) ===================== */}
          <div className="events-headline-wrap lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Header Status Chip */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[50px] bg-[#ffffff] border border-[#d5d5d4] text-[12px] font-medium text-[#2c2e2a] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#EA4335] animate-ping" />
                <span>Active & Live Now</span>
              </div>

              {/* 3-Line Inter Display Headline (Exactly matched to reference mockup) */}
              <h2 className="text-[44px] sm:text-[54px] md:text-[62px] font-bold text-[#2c2e2a] leading-[1.02] tracking-[-0.04em]">
                Build Bold.<br />
                Code Free.<br />
                Ship Hard.
              </h2>

              {/* Descriptive Paragraph */}
              <p className="text-[15px] sm:text-[16px] font-normal text-[#80827f] leading-relaxed max-w-md">
                A community where student developers discover tech through building, sprints, and teamwork. 
                Our clubs help members grow stronger, more confident, and launch real projects in a collaborative environment.
              </p>
            </div>

            {/* Newsletter / Event Alert Input (Pill-rounded proper input box) */}
            <div className="pt-2 max-w-md">
              <form onSubmit={handleSubscribe} className="relative">
                <div className="flex items-center bg-[#ffffff] border border-[#d5d5d4] hover:border-[#2c2e2a]/40 focus-within:border-[#2c2e2a] focus-within:ring-2 focus-within:ring-[#2c2e2a]/10 rounded-[50px] p-1.5 sm:p-2 shadow-xs transition-all">
                  <div className="pl-3.5 pr-2.5 text-[#80827f]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-transparent text-[14px] sm:text-[15px] text-[#2c2e2a] placeholder-[#80827f]/80 outline-none font-medium pr-2"
                    required
                  />
                  <button
                    type="submit"
                    disabled={subscribing}
                    className="group shrink-0 inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-[50px] bg-[#2c2e2a] hover:bg-[#1b1c19] text-[#ffffff] text-[13px] sm:text-[14px] font-medium transition-all duration-300 active:scale-95 shadow-xs cursor-pointer disabled:opacity-60"
                  >
                    <span>
                      {subscribing ? "Subscribing..." : subscribed ? "Subscribed!" : "Subscribe"}
                    </span>
                    {subscribed ? (
                      <Check className="w-3.5 h-3.5 text-[#8ed462]" />
                    ) : subscribing ? (
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#8ed462] transition-all duration-300 group-hover:scale-125" />
                    )}
                  </button>
                </div>
              </form>

              {/* Quick Link to Master Programs directory */}
              <div className="pt-5">
                <Link
                  href="/programs/ongoing"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2c2e2a] hover:text-[#ff705d] transition-colors group"
                >
                  <span>Explore all active & ongoing sessions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* ===================== RIGHT COLUMN (CAROUSEL OF CARDS) ===================== */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Navigational Controls Header */}
            <div className="flex items-center justify-between px-1 pb-1">
              <span className="text-xs font-mono text-[#80827f] uppercase tracking-wider">
                {events.length} Live Opportunities
              </span>

              {/* Carousel Next / Prev Pill Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  aria-label="Previous events"
                  className="w-9 h-9 rounded-full bg-[#ffffff] border border-[#e5e1d5] hover:border-[#2c2e2a]/40 text-[#2c2e2a] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  aria-label="Next events"
                  className="w-9 h-9 rounded-full bg-[#ffffff] border border-[#e5e1d5] hover:border-[#2c2e2a]/40 text-[#2c2e2a] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Horizontal Scrollable Track */}
            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth snap-x snap-mandatory px-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {events.map((event, idx) => {
                const ArtComponent = ART_COMPONENTS[event.artIndex % ART_COMPONENTS.length];

                return (
                  <motion.div
                    key={event.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="event-carousel-card snap-start flex-shrink-0 w-[260px] sm:w-[325px] rounded-[36px] bg-[#ffffff] border border-[#e5e1d5] p-5 sm:p-6 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#2c2e2a]/40 hover:shadow-md transition-all duration-300 group"
                  >
                    <div>
                      {/* Top Row: Pill Chip + Round Arrow Link Button */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`inline-flex items-center px-3.5 py-1 rounded-[50px] text-[11px] font-bold tracking-tight shadow-xs ${
                          event.tag.includes("LIVE") 
                            ? "bg-[#EA4335] text-white" 
                            : "bg-[#E8F0FE] text-[#1967D2] border border-[#D2E3FC]"
                        }`}>
                          {event.tag}
                        </span>

                        <Link
                          href={`/programs/${event.slug}`}
                          aria-label={`View ${event.title}`}
                          className="w-8 h-8 rounded-full border border-[#e5e1d5] bg-[#ffffff] text-[#4285F4] group-hover:bg-[#4285F4] group-hover:text-white group-hover:border-[#4285F4] flex items-center justify-center transition-all duration-200 shadow-xs"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>

                      {/* Card Title */}
                      <h3 className="text-[23px] sm:text-[25px] font-bold text-[#2c2e2a] leading-tight tracking-[-0.03em] mt-3.5 mb-2">
                        <Link href={`/programs/${event.slug}`} className="hover:underline">
                          {event.title}
                        </Link>
                      </h3>

                      {/* Card Description */}
                      <p className="text-[13px] text-[#80827f] line-clamp-2 leading-relaxed mb-5">
                        {event.description}
                      </p>
                    </div>

                    {/* Bottom Poster / Illustration Block (Rounded, Pastel & Playful) */}
                    <div className="w-full h-[205px] sm:h-[220px] rounded-[26px] overflow-hidden border border-[#e5e1d5]/70 relative">
                      <CreativeEventPoster
                        posterUrl={event.posterUrl}
                        title={event.title}
                        seed={event.slug || event.title}
                        variant={event.artIndex}
                        showBadges={false}
                        aspectRatio="auto"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
