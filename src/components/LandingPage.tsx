"use client";

import { motion } from "framer-motion";
import React from "react";

interface LandingPageProps {
  isRevealed: boolean;
  onEnter: () => void;
}

const Marquee = ({ text, reverse = false }: { text: string, reverse?: boolean }) => (
  <div className="flex overflow-hidden whitespace-nowrap opacity-30 pointer-events-none select-none">
    <motion.div
      className="flex gap-4 font-mono text-2xl tracking-[0.2em] text-[#FFE114]"
      animate={{ x: reverse ? [0, -1000] : [-1000, 0] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    >
      {[...Array(10)].map((_, i) => (
        <span key={i} className="mx-4">{text}</span>
      ))}
    </motion.div>
  </div>
);

const Content = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <div className="w-screen h-screen bg-[#0d5e38] flex flex-col justify-between p-4 md:p-8 text-[#FFE114] font-mono selection:bg-[#FF0E7F] selection:text-white relative overflow-hidden">
      {/* Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}
      />
      
      {/* Top Marquee */}
      <div className="absolute top-0 left-0 w-full py-2 bg-black/20 border-b border-[#FFE114]/20 z-0">
        <Marquee text="BUILD • SHIP • CONNECT • GOA 2026 •" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-start z-10 mt-12 relative">
        <div>
          <img 
            src="/assets/2-47.svg" 
            alt="2:47 PM Studio" 
            className="w-24 md:w-28 h-auto object-contain drop-shadow-xl"
          />
        </div>
        <div className="flex items-center gap-4 md:gap-8">

          <button 
            onClick={onEnter}
            className="group relative px-6 md:px-8 py-3 bg-[#FFE114] text-[#0d5e38] font-bold text-lg md:text-xl uppercase tracking-widest border-2 border-dashed border-[#FF0E7F] hover:bg-white hover:text-black transition-colors shadow-[6px_6px_0_#FF0E7F] hover:shadow-[2px_2px_0_#FF0E7F] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-2 active:translate-y-2 z-50"
          >
            GENERATE ID
            <motion.div 
              className="absolute inset-0 bg-[#FF0E7F] opacity-0 group-hover:opacity-10 mix-blend-multiply pointer-events-none" 
            />
          </button>
        </div>
      </div>

      {/* Center huge text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <div className="relative flex flex-col items-center w-[90vw] md:w-[75vw] max-w-[1162px]">
          <div className="drop-shadow-2xl flex items-center justify-center w-full">
            <img 
              src="/assets/Hacker_house.png" 
              alt="Hacker House" 
              className="w-full h-auto object-contain"
            />
          </div>
          {/* Pink Hindi text overlay */}
          <motion.div 
            animate={{ 
              filter: [
                'drop-shadow(0 0 10px #FF0E7F)',
                'drop-shadow(0 0 30px #FF0E7F)',
                'drop-shadow(0 0 10px #FF0E7F)'
              ],
              scale: [1, 1.05, 1],
              rotate: [-5, -2, -5]
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] z-20"
          >
            <img 
              src="/assets/goa_hindi.svg" 
              alt="gaaevaa" 
              className="w-32 md:w-48 h-auto object-contain"
            />
          </motion.div>

          {/* Texts directly under logo */}
          <div className="flex justify-between items-start w-full mt-2 md:mt-4 text-[14px] md:text-[22px] font-semibold text-[#FEE101] uppercase px-1">
            <div>GOA, INDIA &nbsp;·&nbsp; 28 – 31 OCT 2026</div>
            <div className="hidden md:block">2:47 pm Studio</div>
          </div>
        </div>
      </div>

      
      {/* Bottom Marquee */}
      <div className="absolute bottom-0 left-0 w-full py-2 bg-black/20 border-t border-[#FFE114]/20 z-0">
        <Marquee text="THE BUILDER MOVEMENT • JOIN THE HYPE •" reverse />
      </div>
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ isRevealed, onEnter }) => {
  // Jagged edges to simulate a tear. 
  // We use coordinates that match perfectly in the center.
  const leftClip = "polygon(0% 0%, 50% 0%, 48% 10%, 52% 20%, 49% 30%, 53% 40%, 48% 50%, 52% 60%, 47% 70%, 51% 80%, 49% 90%, 50% 100%, 0% 100%)";
  const rightClip = "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 49% 90%, 51% 80%, 47% 70%, 52% 60%, 48% 50%, 53% 40%, 49% 30%, 52% 20%, 48% 10%)";

  return (
    <>
      {/* Left Torn Half */}
      <motion.div
        className="fixed inset-0 w-screen h-screen overflow-hidden z-50 pointer-events-auto shadow-2xl"
        initial={{ x: 0, y: 0, rotateZ: 0, opacity: 1 }}
        animate={isRevealed ? { 
          x: "-50vw", 
          y: 40, 
          rotateZ: -4,
          opacity: 0
        } : {}}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        style={{ 
          clipPath: leftClip,
          pointerEvents: isRevealed ? 'none' : 'auto',
          filter: isRevealed ? 'drop-shadow(10px 10px 20px rgba(0,0,0,0.5))' : 'none'
        }}
      >
        <div className="absolute top-0 left-0 w-screen h-screen">
          <Content onEnter={onEnter} />
        </div>
        {/* Torn edge highlight */}
        <div className="absolute inset-y-0 left-[50%] w-4 bg-white/10 blur-sm mix-blend-overlay -translate-x-1/2" />
      </motion.div>

      {/* Right Torn Half */}
      <motion.div
        className="fixed inset-0 w-screen h-screen overflow-hidden z-50 pointer-events-auto shadow-2xl"
        initial={{ x: 0, y: 0, rotateZ: 0, opacity: 1 }}
        animate={isRevealed ? { 
          x: "50vw", 
          y: 60, 
          rotateZ: 6,
          opacity: 0
        } : {}}
        transition={{ duration: 1.3, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
        style={{ 
          clipPath: rightClip,
          pointerEvents: isRevealed ? 'none' : 'auto',
          filter: isRevealed ? 'drop-shadow(-10px 10px 20px rgba(0,0,0,0.5))' : 'none'
        }}
      >
        <div className="absolute top-0 left-0 w-screen h-screen">
          <Content onEnter={onEnter} />
        </div>
        {/* Torn edge highlight */}
        <div className="absolute inset-y-0 left-[50%] w-4 bg-black/20 blur-sm mix-blend-overlay -translate-x-1/2" />
      </motion.div>
    </>
  );
};
