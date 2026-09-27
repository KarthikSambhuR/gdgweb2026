"use client";

import React, { useState, useMemo } from "react";
import { Calendar, Sparkles } from "lucide-react";

// Deterministic string hasher
export function hashPosterSeed(str?: string | null): number {
  if (!str) return 0;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// =============================================================================
// 8 STORYBOOK EVENT POSTER ARTWORKS (DIRECTLY MATCHED TO THE LANDING PAGE)
// =============================================================================

// 1. Google Cloud Computing Engine & Kubernetes Cluster
export function CloudKubernetesClusterArt() {
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
export function FlutterAndroidDeviceArt() {
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
export function GeminiAIStudioArt() {
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
        <g transform="translate(55, 45)">
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#2c2e2a" strokeWidth="2" />
          <rect x="-7" y="-6" width="14" height="12" rx="2" stroke="#4285F4" strokeWidth="1.8" fill="none" />
          <circle cx="-2" cy="-2" r="1.5" fill="#4285F4" />
        </g>

        <g transform="translate(190, 50)">
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#2c2e2a" strokeWidth="2" />
          <path d="M -5 -4 L -9 0 L -5 4" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
          <path d="M 5 -4 L 9 0 L 5 4" stroke="#34A853" strokeWidth="2" strokeLinecap="round" />
        </g>

        <g transform="translate(60, 135)">
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#2c2e2a" strokeWidth="2" />
          <line x1="-7" y1="-3" x2="-7" y2="3" stroke="#FBBC04" strokeWidth="2" strokeLinecap="round" />
          <line x1="-2" y1="-7" x2="-2" y2="7" stroke="#FBBC04" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="-4" x2="3" y2="4" stroke="#FBBC04" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="-1" x2="8" y2="1" stroke="#FBBC04" strokeWidth="2" strokeLinecap="round" />
        </g>

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
export function MintCloverBotArt() {
  return (
    <div className="w-full h-full bg-[#D2F4B8] relative flex items-center justify-center overflow-hidden select-none">
      <svg viewBox="0 0 240 180" className="w-[85%] h-[85%] max-w-[260px] drop-shadow-xs" fill="none">
        {/* Soft Organic Clover Shape */}
        <g transform="translate(120, 90)">
          <circle cx="-24" cy="-15" r="22" fill="#8ED462" stroke="#2c2e2a" strokeWidth="2" />
          <circle cx="24" cy="-15" r="22" fill="#8ED462" stroke="#2c2e2a" strokeWidth="2" />
          <circle cx="0" cy="20" r="24" fill="#8ED462" stroke="#2c2e2a" strokeWidth="2" />

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

// 5. Sky Blue Canvas with Soaring Google Rocket & Storybook Clouds
export function SkyRocketCloudArt() {
  return (
    <div className="w-full h-full bg-[#BAE6FD] relative flex items-center justify-center overflow-hidden select-none">
      <svg viewBox="0 0 240 180" className="w-[85%] h-[85%] max-w-[260px] drop-shadow-xs" fill="none">
        {/* Background Clouds */}
        <g fill="#FFFFFF" opacity="0.85">
          <ellipse cx="60" cy="140" rx="35" ry="20" />
          <ellipse cx="40" cy="130" rx="20" ry="16" />
          <ellipse cx="180" cy="50" rx="28" ry="16" />
        </g>

        {/* Diagonal Soaring Rocket */}
        <g transform="translate(125, 88) rotate(-35)">
          {/* Exhaust Flame */}
          <path d="M -10 32 Q 0 52 0 60 Q 0 52 10 32 Z" fill="#FBBC04" stroke="#2c2e2a" strokeWidth="2" />
          <path d="M -5 32 Q 0 46 0 50 Q 0 46 5 32 Z" fill="#EA4335" />

          {/* Fins */}
          <path d="M -16 18 L -28 32 L -14 30 Z" fill="#4285F4" stroke="#2c2e2a" strokeWidth="2" />
          <path d="M 16 18 L 28 32 L 14 30 Z" fill="#4285F4" stroke="#2c2e2a" strokeWidth="2" />

          {/* Rocket Body */}
          <path d="M -14 28 L -14 -4 Q -14 -32 0 -42 Q 14 -32 14 -4 L 14 28 Z" fill="#FFFFFF" stroke="#2c2e2a" strokeWidth="2.5" />
          
          {/* Nosecone */}
          <path d="M -14 -8 Q 0 -42 0 -42 Q 0 -42 14 -8 Z" fill="#EA4335" stroke="#2c2e2a" strokeWidth="2" />

          {/* Porthole with Cute Face */}
          <circle cx="0" cy="4" r="8" fill="#BAE6FD" stroke="#2c2e2a" strokeWidth="2" />
          <circle cx="-2.5" cy="3" r="1.5" fill="#2c2e2a" />
          <circle cx="2.5" cy="3" r="1.5" fill="#2c2e2a" />
          <path d="M -1.5 6 Q 0 7.5 1.5 6" stroke="#2c2e2a" strokeWidth="1" strokeLinecap="round" fill="none" />
        </g>

        {/* Floating Google 4-Color Sparkles */}
        <polygon points="195,95 197,90 202,88 197,86 195,81 193,86 188,88 193,90" fill="#FBBC04" />
        <polygon points="50,60 52,56 56,54 52,52 50,48 48,52 44,54 48,56" fill="#34A853" />
      </svg>
    </div>
  );
}

// 6. Coral Peach Canvas with Gemini AI Multi-Lobe Sparkle Galaxy
export function GeminiSparkleGalaxyArt() {
  return (
    <div className="w-full h-full bg-[#FED7AA] relative flex items-center justify-center overflow-hidden select-none">
      <svg viewBox="0 0 240 180" className="w-[85%] h-[85%] max-w-[260px] drop-shadow-xs" fill="none">
        {/* Orbit Ring */}
        <ellipse cx="120" cy="90" rx="75" ry="32" stroke="#2c2e2a" strokeWidth="2.5" strokeDasharray="6,6" fill="none" transform="rotate(-15 120 90)" />

        {/* Central Gemini Star Creature */}
        <g transform="translate(120, 88)">
          {/* 4-point curved Gemini diamond */}
          <path
            d="M 0 -44
               Q 6 -12 36 0
               Q 6 12 0 44
               Q -6 12 -36 0
               Q -6 -12 0 -44 Z"
            fill="#5483F6"
            stroke="#2c2e2a"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Cute Face in center */}
          <circle cx="-6" cy="-4" r="3" fill="#ffffff" />
          <circle cx="-5" cy="-4" r="1.8" fill="#2c2e2a" />
          <circle cx="6" cy="-4" r="3" fill="#ffffff" />
          <circle cx="7" cy="-4" r="1.8" fill="#2c2e2a" />
          <path d="M -3 4 Q 0 8 3 4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* Orbiting Planets / Spheres */}
        <circle cx="58" cy="68" r="10" fill="#34A853" stroke="#2c2e2a" strokeWidth="2" />
        <circle cx="182" cy="112" r="12" fill="#EA4335" stroke="#2c2e2a" strokeWidth="2" />
        <circle cx="148" cy="40" r="7" fill="#FBBC04" stroke="#2c2e2a" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// 7. Sunshine Cream Canvas with Retro Terminal & Steaming Coffee
export function TerminalCoffeeArt() {
  return (
    <div className="w-full h-full bg-[#FEF08A] relative flex items-center justify-center overflow-hidden select-none">
      <svg viewBox="0 0 240 180" className="w-[85%] h-[85%] max-w-[260px] drop-shadow-xs" fill="none">
        {/* Terminal Window */}
        <g transform="translate(70, 40)">
          <rect width="115" height="85" rx="10" fill="#2c2e2a" stroke="#2c2e2a" strokeWidth="2" />
          {/* Window Buttons */}
          <circle cx="14" cy="13" r="3" fill="#EA4335" />
          <circle cx="24" cy="13" r="3" fill="#FBBC04" />
          <circle cx="34" cy="13" r="3" fill="#34A853" />
          <line x1="0" y1="24" x2="115" y2="24" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

          {/* Syntax Lines */}
          <line x1="12" y1="36" x2="45" y2="36" stroke="#4285F4" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="36" x2="78" y2="36" stroke="#8ED462" strokeWidth="3" strokeLinecap="round" />
          <line x1="18" y1="46" x2="58" y2="46" stroke="#FFAFF6" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="56" x2="88" y2="56" stroke="#FBBC04" strokeWidth="3" strokeLinecap="round" />
          <line x1="12" y1="68" x2="38" y2="68" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <rect x="42" y="65" width="6" height="7" fill="#8ED462" />
        </g>

        {/* Steaming Coffee Cup */}
        <g transform="translate(165, 115)">
          <rect x="-14" y="-18" width="28" height="26" rx="6" fill="#FF705D" stroke="#2c2e2a" strokeWidth="2" />
          {/* Handle */}
          <path d="M 14 -12 C 22 -12 22 2 14 2" stroke="#2c2e2a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Steam curves */}
          <path d="M -6 -24 Q -2 -28 -6 -32" stroke="#2c2e2a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 2 -24 Q 6 -28 2 -32" stroke="#2c2e2a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

// 8. Fresh Sage Canvas with Google Code Brackets & Robotic Squircle
export function CodeMatrixSquircleArt() {
  return (
    <div className="w-full h-full bg-[#D1FAE5] relative flex items-center justify-center overflow-hidden select-none">
      <svg viewBox="0 0 240 180" className="w-[85%] h-[85%] max-w-[260px] drop-shadow-xs" fill="none">
        {/* Big Code Squircle Container */}
        <g transform="translate(120, 90)">
          <rect x="-48" y="-48" width="96" height="96" rx="28" fill="#FFFFFF" stroke="#2c2e2a" strokeWidth="3" />

          {/* Left Google Blue Bracket < */}
          <path d="M -12 -24 L -28 0 L -12 24" stroke="#4285F4" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

          {/* Right Google Red Bracket > */}
          <path d="M 12 -24 L 28 0 L 12 24" stroke="#EA4335" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

          {/* Center Tech Dots */}
          <circle cx="0" cy="-10" r="4" fill="#FBBC04" stroke="#2c2e2a" strokeWidth="1.5" />
          <circle cx="0" cy="10" r="4" fill="#34A853" stroke="#2c2e2a" strokeWidth="1.5" />
        </g>

        {/* Floating Accent Petals */}
        <circle cx="48" cy="48" r="8" fill="#FBBC04" stroke="#2c2e2a" strokeWidth="1.5" />
        <circle cx="192" cy="132" r="8" fill="#8ED462" stroke="#2c2e2a" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// Master Art List
export const CREATIVE_POSTER_ARTS = [
  CloudKubernetesClusterArt,
  FlutterAndroidDeviceArt,
  GeminiAIStudioArt,
  MintCloverBotArt,
  SkyRocketCloudArt,
  GeminiSparkleGalaxyArt,
  TerminalCoffeeArt,
  CodeMatrixSquircleArt,
];

export interface CreativeEventPosterProps {
  /** Uploaded image URL if any */
  posterUrl?: string | null;
  /** Event title */
  title: string;
  /** Category badge text (e.g. "Codelab", "Hackathon", "Cloud Sprint") */
  category?: string;
  /** Event date */
  date?: string;
  /** Registration status */
  isClosed?: boolean;
  /** Seed string to deterministically select vector illustration */
  seed?: string | number | null;
  /** Explicit variant index (0-7) */
  variant?: number;
  /** Aspect ratio preset */
  aspectRatio?: "video" | "square" | "banner" | "wide" | "auto";
  /** Additional container classes */
  className?: string;
  /** Whether to show status chips on top */
  showBadges?: boolean;
}

const ASPECT_CLASSES = {
  video: "aspect-video",
  square: "aspect-square",
  banner: "aspect-[21/9]",
  wide: "aspect-[16/10]",
  auto: "h-full",
};

export default function CreativeEventPoster({
  posterUrl,
  title,
  category = "Event",
  date,
  isClosed = false,
  seed,
  variant,
  aspectRatio = "video",
  className = "",
  showBadges = true,
}: CreativeEventPosterProps) {
  const [imgError, setImgError] = useState(false);

  // Deterministically select artwork if no poster uploaded
  const artIndex = useMemo(() => {
    if (typeof variant === "number") {
      return Math.abs(variant) % CREATIVE_POSTER_ARTS.length;
    }
    const seedVal = seed !== undefined && seed !== null ? String(seed) : title || "GDG Event";
    return hashPosterSeed(seedVal) % CREATIVE_POSTER_ARTS.length;
  }, [variant, seed, title]);

  const ArtComponent = CREATIVE_POSTER_ARTS[artIndex];
  const aspectClass = ASPECT_CLASSES[aspectRatio];

  const hasValidImage = Boolean(posterUrl && !imgError && posterUrl.trim().length > 0);

  return (
    <div
      className={`relative w-full overflow-hidden border-b border-[#d5d5d4] select-none ${aspectClass} ${className}`}
    >
      {/* Top Status & Category Badges */}
      {showBadges && (
        <>
          <div className="absolute top-3 left-3 z-20 flex items-center h-7 px-3.5 rounded-[50px] bg-[#ffffff]/95 backdrop-blur-sm border border-[#d5d5d4] text-[#2c2e2a] text-xs font-medium shadow-xs">
            <Calendar className="w-3 h-3 mr-1.5 text-[#ff705d]" />
            <span>{category}</span>
          </div>

          <div
            className={`absolute top-3 right-3 z-20 flex items-center h-7 px-3.5 rounded-[50px] border text-xs font-medium shadow-xs ${
              isClosed
                ? "text-[#ffffff] bg-[#2c2e2a] border-[#2c2e2a]"
                : "text-[#2c2e2a] bg-[#ffffff]/95 backdrop-blur-sm border-[#d5d5d4]"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                isClosed ? "bg-[#ff705d]" : "bg-[#8ed462] animate-pulse"
              }`}
            />
            <span>{isClosed ? "Closed" : "Open"}</span>
          </div>
        </>
      )}

      {/* Main Visual: Uploaded Image OR Creative Storybook Vector Art */}
      {hasValidImage ? (
        <img
          src={posterUrl!}
          alt={title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.02]">
          <ArtComponent />
        </div>
      )}
    </div>
  );
}
