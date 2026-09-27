"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, Award, Users, Flame, ArrowUpRight, Sparkles, Zap, Star } from "lucide-react";
import GoogleLabsMemberCard from "@/components/cards/GoogleLabsMemberCard";
import { GDG_EXECOM_2026 } from "@/lib/data/TeamData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Contributor {
  rank: number;
  name: string;
  dept: string;
  points: number;
  badge: string;
  dotColor: string;
  streak?: number;
}



export default function MindMarketCommunity() {
  const [activeTab, setActiveTab] = useState<"xp" | "streaks" | "badges">("xp");
  const [cheers, setCheers] = useState<Record<string, number>>({});

    const [execomMembers, setExecomMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");
        const snap = await getDocs(collection(db, "coreProfiles"));
        if (!snap.empty) {
          const fetched = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          fetched.sort((a: any, b: any) => {
            const orderA = typeof a.sortOrder === "number" ? a.sortOrder : 9999;
            const orderB = typeof b.sortOrder === "number" ? b.sortOrder : 9999;
            return orderA - orderB;
          });
          setExecomMembers(fetched);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeam();
  }, []);

  const handleCheer = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { x, y },
        colors: ["#ffd600", "#ff705d", "#8ed462", "#2ba0ff"],
        disableForReducedMotion: true,
      });
    } catch {
      // fallback
    }

    setCheers((prev) => ({
      ...prev,
      [name]: (prev[name] || 0) + 1,
    }));
  };

  const communityRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!communityRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Reveal Section Header
      gsap.from(".community-header", {
        scrollTrigger: {
          trigger: communityRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });

      // 2. Reveal Leaderboard and Side Cards
      gsap.from(".community-panel", {
        scrollTrigger: {
          trigger: ".community-panel",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.85,
        ease: "power3.out",
      });

      // 3. Execom Grid Reveal
      gsap.from(".execom-grid-item", {
        scrollTrigger: {
          trigger: ".execom-grid-item",
          start: "top 85%",
        },
        y: 45,
        scale: 0.96,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: "back.out(1.4)",
      });
    }, communityRef);

    return () => ctx.revert();
  }, [execomMembers]);

  return (
    <section ref={communityRef} className="relative w-full bg-transparent py-20 px-4 sm:px-6 select-none">
      <div className="max-w-[1200px] mx-auto space-y-16">
        
        {/* SECTION HEADER */}
        <div className="community-header flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[50px] bg-[#ffffff] border border-[#d5d5d4] text-xs font-medium text-[#2c2e2a]">
              <span className="w-2 h-2 rounded-full bg-[#ff705d]" />
              <span>Campus Impact & Recognition</span>
            </div>
            <h2 className="text-[42px] sm:text-[60px] md:text-[72px] font-medium tracking-[-0.04em] text-[#2c2e2a] leading-[1.05]">
              Real Builders. Real Code.
            </h2>
          </div>
          <p className="text-[17px] font-normal text-[#80827f] max-w-md leading-relaxed">
            Our campus community ranks among the most active developer chapters in Kerala. Earn badges, build portfolio solutions, and celebrate peer milestones.
          </p>
        </div>

        {/* 2-COLUMN SPLIT: Leaderboard (Left) + Credential & Solution Challenge (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: ARENA LEADERBOARD CARD (50px white card with interactive tabs & cheer) */}
          <div
            className="community-panel lg:col-span-7 rounded-[50px] bg-[#ffffff] border border-[#d5d5d4] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[50px] bg-[#f5f1e4] text-xs font-medium text-[#2c2e2a]">
                    <Trophy className="w-3.5 h-3.5 text-[#ff705d]" />
                    <span>Spring 2026 Sprint Arena</span>
                  </div>
                  <h3 className="text-[26px] sm:text-[34px] font-medium text-[#2c2e2a] tracking-[-0.03em] pt-2">
                    Chapter Leaderboard
                  </h3>
                </div>

                {/* Interactive Highlights Pill Selector */}
                <div className="flex items-center bg-[#f5f1e4] p-1 rounded-[50px] border border-[#d5d5d4] self-start sm:self-auto overflow-x-auto no-scrollbar shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("xp")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                      activeTab === "xp" ? "bg-white text-[#2c2e2a] shadow-xs" : "text-[#80827f] hover:text-[#2c2e2a]"
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-[#f59e0b]" />
                    <span>Top XP</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("streaks")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                      activeTab === "streaks" ? "bg-white text-[#2c2e2a] shadow-xs" : "text-[#80827f] hover:text-[#2c2e2a]"
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 text-[#ff705d]" />
                    <span>Streaks</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("badges")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                      activeTab === "badges" ? "bg-white text-[#2c2e2a] shadow-xs" : "text-[#80827f] hover:text-[#2c2e2a]"
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-[#2ba0ff]" />
                    <span>Badges</span>
                  </button>
                </div>
              </div>

              {/* Contributor List with Interactive Cheer */}
              <div className="space-y-3 pt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {[] /* Replaced TAB_DATA with empty since we remove mock data */.map((c: any) => (
                      <div
                        key={c.name}
                        className="flex items-center justify-between p-4 rounded-[28px] bg-[#f5f1e4] hover:bg-[#eae5d7] transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-8 h-8 rounded-full bg-[#ffffff] text-[#2c2e2a] font-mono text-xs font-semibold flex items-center justify-center border border-[#d5d5d4]">
                            0{c.rank}
                          </span>
                          <div>
                            <h4 className="text-[16px] font-medium text-[#2c2e2a] group-hover:text-[#ff705d] transition">
                              {c.name}
                            </h4>
                            <span className="text-xs text-[#80827f]">
                              {c.dept} • {c.badge}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-semibold text-[#2c2e2a]">
                            {c.points} pts
                          </span>

                          {/* Interactive High-Five Cheer Button */}
                          <button
                            type="button"
                            onClick={(e) => handleCheer(c.name, e)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-[#8ed462] border border-[#d5d5d4] text-[11px] font-medium text-[#2c2e2a] transition active:scale-95 cursor-pointer shadow-xs"
                            title="Cheer this student!"
                          >
                            <Sparkles className="w-3 h-3 text-[#ff705d]" />
                            <span>{cheers[c.name] || 0}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Card Action */}
            <div className="pt-8 mt-8 border-t border-[#f5f1e4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link
                href="/leaderboard"
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-[50px] bg-[#ffffff] hover:bg-[#f5f1e4] border border-[#d5d5d4] hover:border-[#2c2e2a]/30 text-[#2c2e2a] text-[15px] font-medium transition-all duration-300 hover:-translate-y-[1px] active:scale-95 transition-mindmarket"
              >
                <span>View Full Standings & Simulator</span>
                <span className="w-2 h-2 rounded-full bg-[#8ed462] action-dot-expand" />
              </Link>
              <span className="text-xs font-mono text-[#80827f]">
                Live Sync via Firestore
              </span>
            </div>
          </div>

          {/* RIGHT: CREDENTIALS & SOLUTION CHALLENGE CARDS */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* CARD 1: VERIFIED SKILL BADGES */}
            <div
              className="community-panel rounded-[50px] bg-[#ffffff] border border-[#d5d5d4] p-6 sm:p-8 flex flex-col justify-between flex-1 shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[50px] bg-[#f5f1e4] text-xs font-medium text-[#2c2e2a]">
                    <Award className="w-3.5 h-3.5 text-[#2ba0ff]" />
                    <span>Skill Verification</span>
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2ba0ff]" />
                </div>

                <h3 className="text-[24px] sm:text-[28px] font-medium text-[#2c2e2a] tracking-[-0.03em] leading-snug">
                  Official Google Skill Badges
                </h3>
                <p className="text-[15px] text-[#80827f] leading-relaxed">
                  Earn verifiable, shareable Google Cloud & AI credentials directly credited to your Google Developer Profile.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-[20px] bg-[#f5f1e4] border border-[#e0dbce]">
                    <div className="text-[22px] font-medium text-[#2c2e2a]">120+</div>
                    <div className="text-xs text-[#80827f]">Cloud Badges Issued</div>
                  </div>
                  <div className="p-3.5 rounded-[20px] bg-[#f5f1e4] border border-[#e0dbce]">
                    <div className="text-[22px] font-medium text-[#2c2e2a]">98%</div>
                    <div className="text-xs text-[#80827f]">Lab Completion Rate</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#f5f1e4] flex items-center justify-between">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 text-[15px] font-medium text-[#2c2e2a] pb-0.5 border-b border-[#80827f] hover:border-[#2c2e2a] transition-colors"
                >
                  <span>Explore Study Jams</span>
                  <ArrowUpRight className="w-4 h-4 text-[#80827f]" />
                </Link>
              </div>
            </div>

            {/* CARD 2: GOOGLE SOLUTION CHALLENGE */}
            <div
              className="community-panel rounded-[50px] bg-[#ffffff] border border-[#d5d5d4] p-6 sm:p-8 flex flex-col justify-between flex-1 shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[50px] bg-[#f5f1e4] text-xs font-medium text-[#2c2e2a]">
                    <Users className="w-3.5 h-3.5 text-[#8ed462]" />
                    <span>Global Competition</span>
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8ed462]" />
                </div>

                <h3 className="text-[24px] sm:text-[28px] font-medium text-[#2c2e2a] tracking-[-0.03em] leading-snug">
                  UN Solution Challenge 2026
                </h3>
                <p className="text-[15px] text-[#80827f] leading-relaxed">
                  Join cross-department teams solving one of the 17 UN Sustainable Development Goals using Google Cloud, Flutter, and Vertex AI.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#f5f1e4] flex items-center justify-between">
                <Link
                  href="/programs"
                  className="group inline-flex items-center gap-2 px-5 py-2 rounded-[50px] bg-[#ff705d] hover:bg-[#ee6350] text-[#ffffff] text-[14px] font-medium transition-all duration-300 hover:-translate-y-[1px] active:scale-95 transition-mindmarket"
                >
                  <span>Submit Your Team</span>
                  <span className="w-2 h-2 rounded-full bg-white action-dot-expand" />
                </Link>
                <span className="text-xs font-mono text-[#80827f]">
                  Amal Jyothi Chapter
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 3. EXECOM LEADERSHIP SHOWCASE */}
        <div className="pt-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[50px] bg-[#ffffff] border border-[#d5d5d4] text-xs font-medium text-[#2c2e2a]">
                <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                <span>Chapter Leadership</span>
              </div>
              <h2 className="text-[36px] sm:text-[50px] md:text-[60px] font-medium tracking-[-0.04em] text-[#2c2e2a] leading-[1.08]">
                Meet the Execom
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-[15px] font-normal text-[#80827f] max-w-xs leading-relaxed hidden sm:block">
                The organizers, track leads, and student innovators driving community initiatives.
              </p>
              <Link
                href="/about#execom"
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-[50px] bg-[#ffffff] hover:bg-[#eae5d7] border border-[#d5d5d4] hover:border-[#2c2e2a]/30 text-[#2c2e2a] text-[15px] font-medium transition-all duration-300 hover:-translate-y-[1px] active:scale-95"
              >
                <span>All {execomMembers.length} Leads</span>
                <ArrowUpRight className="w-4 h-4 text-[#80827f] group-hover:text-[#2c2e2a] transition-colors" />
              </Link>
            </div>
          </div>

          {/* 4 Featured Google Labs Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {execomMembers.slice(0, 4).map((member, idx) => (
              <div key={member.username || idx} className="execom-grid-item">
                <GoogleLabsMemberCard
                  member={member}
                  index={idx}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
