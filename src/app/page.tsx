"use client";

import { useState, useRef, ChangeEvent } from "react";
import { IDCard } from "@/components/IDCard";
import { toPng } from "html-to-image";
import { Upload, Download, Share2, Loader2 } from "lucide-react";
import { LandingPage } from "@/components/LandingPage";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";

export default function Home() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const idCardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Effect State
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17deg", "-17deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17deg", "17deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      let processFile: File | Blob = file;
      // Handle HEIC from iPhone
      if (file.name.toLowerCase().endsWith(".heic") || file.type === "image/heic") {
        const heic2any = (await import("heic2any")).default;
        const converted = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.8,
        });
        processFile = Array.isArray(converted) ? converted[0] : converted;
      }

      const objectUrl = URL.createObjectURL(processFile);
      setPhoto(objectUrl);
    } catch (error) {
      console.error("Error processing image", error);
      alert("Failed to process image. Try a standard JPG or PNG.");
    }
  };

  const generateImage = async (): Promise<string | null> => {
    if (!idCardRef.current) return null;
    try {
      setIsGenerating(true);
      // Wait for fonts to be ready
      await document.fonts.ready;
      
      const dataUrl = await toPng(idCardRef.current, {
        quality: 1,
        pixelRatio: 2, // High resolution
        cacheBust: false,
      });
      return dataUrl;
    } catch (err) {
      console.error("Failed to generate image", err);
      alert("Failed to generate image.");
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;
    
    const link = document.createElement("a");
    link.download = `hh-goa-id-${name.replace(/\s+/g, '-').toLowerCase() || 'builder'}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleShare = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], "badge.png", { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My HH Goa 2026 ID",
          text: "I'm heading to Hacker House Goa 2026! 🌴💻 #FrameInGoa",
          files: [file],
        });
      } else {
        handleDownload();
        const tweetText = encodeURIComponent("I'm heading to Hacker House Goa 2026! 🌴💻 I've attached my builder ID. #FrameInGoa");
        window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank");
      }
    } catch (error) {
      console.error("Share failed", error);
    }
  };

  return (
    <>
      <LandingPage isRevealed={isRevealed} onEnter={() => setIsRevealed(true)} />
      
      <main className="min-h-screen w-full overflow-x-hidden flex flex-col xl:flex-row items-center justify-center p-4 py-12 xl:py-4 bg-black text-white selection:bg-[#9AC95F] selection:text-black">
        {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
         <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#FF0E7F]/10 blur-[120px] rounded-full" />
         <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#00FFFF]/10 blur-[100px] rounded-full" />
      </div>

      <div className="z-10 w-full max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-center mt-8 xl:mt-0">
        
        {/* LEFT COL: Form */}
        <div className="flex flex-col gap-8 order-2 xl:order-1 max-w-lg mx-auto xl:mx-0 w-full z-10 xl:pl-16">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif text-white uppercase leading-none tracking-tight font-[family-name:var(--font-imbue)] drop-shadow-lg" style={{ textShadow: '4px 4px 0 #FF0E7F, -4px -4px 0 #00FFFF' }}>
              Mint Your <span className="text-[#FFE114]">Identity</span>
            </h1>
          </div>

          <div className="space-y-6 font-mono">
            <div className="flex flex-col gap-2 group">
              <label className="text-gray-500 uppercase text-xs font-bold tracking-widest transition-colors group-focus-within:text-[#FF0E7F] group-focus-within:animate-pulse">
                [ BUILDER_NAME ]
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="> Atharva Wani_"
                className="bg-black/50 border border-gray-800 focus:border-[#FF0E7F] focus:shadow-[0_0_15px_rgba(255,14,127,0.3)] px-4 py-3 text-[#FF0E7F] outline-none transition-all placeholder:text-gray-700 font-bold"
                maxLength={20}
              />
            </div>
            
            <div className="flex flex-col gap-2 group">
              <label className="text-gray-500 uppercase text-xs font-bold tracking-widest transition-colors group-focus-within:text-[#FFE114] group-focus-within:animate-pulse">
                [ TECH_STACK / ROLE ]
              </label>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="> Fullstack Web3 Dev_"
                className="bg-black/50 border border-gray-800 focus:border-[#FFE114] focus:shadow-[0_0_15px_rgba(255,225,20,0.3)] px-4 py-3 text-[#FFE114] outline-none transition-all placeholder:text-gray-700 font-bold"
                maxLength={25}
              />
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="text-gray-500 uppercase text-xs font-bold tracking-widest transition-colors group-hover:text-[#00FFFF] group-hover:animate-pulse">
                [ PROFILE_PHOTO ]
              </label>
              <label className="relative bg-black/50 border border-gray-800 hover:border-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] px-4 py-8 flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group/drop">
                {/* Scanner animation on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00FFFF] shadow-[0_0_10px_#00FFFF] opacity-0 group-hover/drop:opacity-100 group-hover/drop:animate-scan z-0" />
                
                <Upload className="w-8 h-8 text-gray-700 group-hover/drop:text-[#00FFFF] mb-3 transition-colors relative z-10" />
                <span className="text-gray-600 text-xs tracking-widest uppercase group-hover/drop:text-[#00FFFF] transition-colors relative z-10 font-bold">
                  {photo ? "> IMAGE_LOADED. CLICK_TO_REPLACE" : "> AWAITING_UPLOAD (JPG/PNG/HEIC)"}
                </span>
                <input 
                  type="file" 
                  accept="image/jpeg, image/png, image/heic" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mt-6">
            <button 
              onClick={handleDownload}
              disabled={isGenerating}
              className="group relative flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#FFE114] text-black font-bold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 overflow-hidden shadow-[4px_4px_0_#FF0E7F] hover:shadow-[0px_0px_0_#FF0E7F] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-2 active:translate-y-2 text-base"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>MINTING...</span>
                </>
              ) : (
                <>
                  <Download className="w-6 h-6" />
                  <span>DOWNLOAD</span>
                </>
              )}
            </button>
            <button 
              onClick={handleShare}
              disabled={isGenerating}
              className="group relative flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-black border-2 border-dashed border-[#FF0E7F] text-[#FF0E7F] font-bold uppercase tracking-widest hover:bg-[#FF0E7F]/10 hover:shadow-[0_0_15px_rgba(255,14,127,0.4)] transition-all disabled:opacity-50 text-base"
            >
              <Share2 className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
              <span>SHARE TO X</span>
            </button>
          </div>
        </div>

        {/* RIGHT COL: Preview */}
        <div className="order-1 xl:order-2 flex flex-col items-center justify-center w-full z-10 perspective-[2000px]">
          <motion.div 
            className="scale-[0.75] sm:scale-[0.85] md:scale-90 xl:scale-95 2xl:scale-100 origin-center transform transition-transform relative cursor-zoom-in group/card"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsFullscreen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* The actual ID card - isolated so html-to-image doesn't break */}
            <IDCard 
              ref={idCardRef} 
              name={name} 
              role={role} 
              photoUrl={photo} 
            />
            
            {/* 3D Glare Overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-xl z-50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
              style={{
                background: glareBackground,
                mixBlendMode: "overlay"
              }}
            />
          </motion.div>
        </div>

      </div>
      </main>

      {/* Fullscreen 3D Experience Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center cursor-zoom-out perspective-[2000px]"
            onClick={() => setIsFullscreen(false)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100, rotateX: 20 }}
              animate={{ scale: typeof window !== 'undefined' && window.innerHeight > 800 ? 1.4 : 1.1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.5, y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="origin-center relative group/modal cursor-default"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onClick={(e) => e.stopPropagation()}
            >
              <IDCard 
                name={name} 
                role={role} 
                photoUrl={photo} 
              />
              
              {/* 3D Glare Overlay for Modal */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-xl z-50 opacity-0 group-hover/modal:opacity-100 transition-opacity duration-300"
                style={{
                  background: glareBackground,
                  mixBlendMode: "overlay"
                }}
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-12 text-[#FF0E7F] font-mono tracking-widest text-sm uppercase animate-pulse pointer-events-none"
            >
              [ CLICK_ANYWHERE_TO_EXIT ]
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
