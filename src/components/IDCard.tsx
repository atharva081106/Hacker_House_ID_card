import React from 'react';

interface IDCardProps {
  name: string;
  role: string;
  photoUrl: string | null;
}

export const IDCard = React.forwardRef<HTMLDivElement, IDCardProps>(
  ({ name, role, photoUrl }, ref) => {
    return (
      <div 
        ref={ref}
        className="relative w-[400px] h-[580px] bg-black border-[2px] border-[#9AC95F] overflow-hidden flex flex-col items-center font-mono z-10 mx-auto rounded-xl"
        style={{
          boxShadow: '0 0 40px rgba(154, 201, 95, 0.2), inset 0 0 20px rgba(154, 201, 95, 0.1)',
        }}
      >
        {/* Holographic Glass Overlay */}
        <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.25]" style={{
          background: 'linear-gradient(135deg, transparent 10%, rgba(0,255,255,0.4) 30%, rgba(255,14,127,0.5) 50%, rgba(255,225,20,0.4) 70%, transparent 90%)',
          mixBlendMode: 'screen'
        }} />

        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 14, 127, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Watermark */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.1] pointer-events-none z-0 mix-blend-screen">
          <img src="/assets/goa_hindi.svg" alt="" className="w-80 h-auto filter sepia hue-rotate-[300deg] saturate-[3]" />
        </div>

        {/* Lanyard Punch Hole */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-black border border-[#FF0E7F]/50 rounded-full z-20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_0_10px_rgba(255,14,127,0.3)]" />

        {/* Header */}
        <div className="w-full bg-gradient-to-r from-[#FF0E7F] via-[#9AC95F] to-[#00FFFF] text-black pt-10 pb-3 px-6 flex justify-between items-center z-10 border-b-2 border-white/40 shadow-[0_4px_15px_rgba(255,14,127,0.3)]">
          <span className="font-bold text-2xl uppercase tracking-widest font-[family-name:var(--font-imbue)] mix-blend-color-burn">HH GOA '26</span>
          <span className="text-xs font-bold bg-black text-[#FFE114] px-3 py-1 rounded-sm uppercase tracking-widest border border-[#FFE114]/50 shadow-[0_0_10px_rgba(255,225,20,0.3)]">
            BUILDER
          </span>
        </div>

        {/* Photo Container */}
        <div className="relative mt-8 z-10">
          <div className="w-[180px] h-[180px] bg-[#00FFFF] border border-[#FF0E7F] p-1 overflow-hidden relative group" style={{ boxShadow: '0 0 30px rgba(255, 14, 127, 0.4)' }}>
            {photoUrl ? (
              <img 
                src={photoUrl} 
                alt="Builder Photo" 
                className="w-full h-full object-cover grayscale contrast-[1.5] brightness-75 mix-blend-multiply opacity-90" 
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-black text-[#FF0E7F]/50 bg-[url('/assets/noise.png')]">
                <div className="w-full h-[1px] bg-[#00FFFF]/40 animate-scan absolute top-0 shadow-[0_0_10px_#00FFFF]" />
                <span className="text-xs tracking-widest">[ NO_SIGNAL ]</span>
              </div>
            )}
            
            {/* Cyberpunk corner markers */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#FFE114]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#FFE114]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#FFE114]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#FFE114]" />
          </div>
        </div>

        {/* Identity Details */}
        <div className="flex flex-col items-center justify-center w-full px-8 py-6 z-10 text-center flex-1">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FFFF]/50 to-transparent mb-6 relative">
             <div className="absolute left-1/2 -top-[3px] -translate-x-1/2 w-2 h-2 bg-[#FF0E7F] rotate-45 shadow-[0_0_15px_#FF0E7F]" />
          </div>
          
          <h2 className="text-3xl md:text-4xl uppercase font-[family-name:var(--font-imbue)] text-white mb-2 leading-none tracking-wide animate-glitch relative" style={{ textShadow: '2px 0 #FF0E7F, -2px 0 #00FFFF' }}>
            {name || "GUEST BUILDER"}
          </h2>
          
          <div className="text-[#00FFFF] font-mono tracking-widest uppercase text-xs mt-2 font-bold px-4 py-1 border border-[#00FFFF]/30 bg-[#00FFFF]/10 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
            {role || "UNKNOWN STACK"}
          </div>
        </div>

        {/* Footer / Barcode */}
        <div className="w-full px-8 pb-8 pt-2 z-10 flex flex-col items-center gap-3 bg-gradient-to-t from-[#9AC95F]/10 to-transparent mt-auto">
          <div className="w-full flex justify-between gap-[2px] h-10 opacity-90">
            {/* Fake barcode generation */}
            {Array.from({ length: 45 }).map((_, i) => (
              <div key={i} className="bg-[#9AC95F]" style={{ width: Math.random() > 0.5 ? '2px' : '4px', height: Math.random() > 0.8 ? '100%' : '80%', alignSelf: 'flex-end', opacity: Math.random() * 0.5 + 0.5 }} />
            ))}
          </div>
          <div className="flex justify-between w-full text-[9px] text-[#9AC95F] opacity-70 tracking-widest font-bold">
            <span>ID: {(name ? name.replace(/\s/g, '') : 'GUEST').substring(0, 6).toUpperCase()}{Math.random().toString(36).substr(2, 4).toUpperCase()}</span>
            <span>AUTH: 2:47PM-{Date.now().toString().slice(-4)}</span>
          </div>
        </div>
      </div>
    );
  }
);

IDCard.displayName = 'IDCard';
