"use client";

import React, { useRef, useState, useEffect } from "react";
import MindMarketHero from "@/components/home/MindMarketHero";
import OngoingEventsSection from "@/components/home/OngoingEventsSection";
import MindMarketTracks from "@/components/home/MindMarketTracks";
import MindMarketCommunity from "@/components/home/MindMarketCommunity";
import MindMarketContact from "@/components/home/MindMarketContact";
import ScrollDrawnPath from "@/components/home/ScrollDrawnPath";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState({
    showHero: true,
    showEvents: true,
    showTracks: true,
    showCommunity: true,
    showContact: true,
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, "settings", "homepage");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setConfig({
            showHero: data.showHero ?? true,
            showEvents: data.showEvents ?? true,
            showTracks: data.showTracks ?? true,
            showCommunity: data.showCommunity ?? true,
            showContact: data.showContact ?? true,
          });
        }
      } catch (e) {
        console.error("Error fetching homepage config:", e);
      }
    };
    fetchConfig();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-[#f6f2e8] select-none overflow-x-hidden">
      {/* Dynamic Ambient Background: Subtle Google color blooms & precision tech dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Tech Blueprint Dot Grid */}
        <div 
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: `radial-gradient(#2c2e2a 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)",
          }}
        />

        {/* Ambient Google Color Gradient Orbs for Depth & Vibrancy */}
        <div className="absolute -top-[12%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[#4285F4]/12 blur-[130px] mix-blend-multiply pointer-events-none" />
        <div className="absolute top-[18%] -right-[12%] w-[650px] h-[650px] rounded-full bg-[#FBBC04]/14 blur-[140px] mix-blend-multiply pointer-events-none" />
        <div className="absolute top-[48%] -left-[14%] w-[700px] h-[700px] rounded-full bg-[#EA4335]/10 blur-[150px] mix-blend-multiply pointer-events-none" />
        <div className="absolute top-[75%] -right-[10%] w-[650px] h-[650px] rounded-full bg-[#34A853]/12 blur-[140px] mix-blend-multiply pointer-events-none" />

        {/* Subtle noise grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{ backgroundImage: `url('/noise.png')` }}
        />
      </div>

      {/* Scroll-Driven Animated Line starting from the letter 'E' in 'AJCE' */}
      <ScrollDrawnPath containerRef={containerRef} />

      {/* 1. Hero on Cream Paper (#f5f1e4) with 140px Inter Display & Paper-Cut Characters */}
      {config.showHero && (
        <div className="relative z-10">
          <MindMarketHero />
        </div>
      )}

      {/* 2. Ongoing & Live Events Showcase (Reference Pattern Mockup) */}
      {config.showEvents && (
        <div className="relative z-10">
          <OngoingEventsSection />
        </div>
      )}

      {/* 3. Innovation Pathways on Cream Paper (#f5f1e4) with 50px White Cards */}
      {config.showTracks && (
        <div className="relative z-10">
          <MindMarketTracks />
        </div>
      )}

      {/* 4. Chapter Arena Leaderboard & Credentials in 50px White Cards */}
      {config.showCommunity && (
        <div className="relative z-10">
          <MindMarketCommunity />
        </div>
      )}

      {/* 5. Direct Connect & Dispatch Desk (Contact Section) */}
      {config.showContact && (
        <div className="relative z-10">
          <MindMarketContact />
        </div>
      )}
    </div>
  );
}
