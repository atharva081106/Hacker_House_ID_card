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
        className="relative w-[400px] h-[580px] bg-black/40 border border-white/20 backdrop-blur-xl overflow-hidden flex flex-col items-center font-mono z-10 mx-auto rounded-3xl"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Sunrise Background Image */}
        <img 
          src="/assets/Sun rise.png" 
          alt="Sunrise" 
          aria-hidden="true" 
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-90"
        />

        {/* Soft Glass Reflection Overlay */}
        <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.15]" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.3) 100%)',
          mixBlendMode: 'overlay'
        }} />

        {/* Subtle Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Watermark */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.25] pointer-events-none z-0 mix-blend-overlay">
          <img src="/assets/goa_hindi.svg" alt="" className="w-80 h-auto filter invert brightness-0 saturate-[0]" />
        </div>

        {/* Lanyard Punch Hole */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/60 border border-white/20 rounded-full z-20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" />

        {/* Header */}
        <div className="w-full bg-white/10 backdrop-blur-md text-white pt-10 pb-4 px-6 flex justify-between items-center z-10 border-b border-white/20">
          <span className="font-bold text-2xl uppercase tracking-widest font-[family-name:var(--font-imbue)] drop-shadow-md">HH GOA '26</span>
          <span className="text-xs font-bold bg-white/20 text-white px-4 py-1 rounded-full uppercase tracking-widest border border-white/30 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            BUILDER
          </span>
        </div>

        {/* Photo Container */}
        <div className="relative mt-8 z-10">
          <div className="w-[180px] h-[180px] bg-white/5 border border-white/30 p-1 overflow-hidden relative group rounded-2xl backdrop-blur-sm" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
            {photoUrl ? (
              <img 
                src={photoUrl} 
                alt="Builder Photo" 
                className="w-full h-full object-cover object-center rounded-xl" 
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-black/20 text-white/70 rounded-xl">
                <div className="w-full h-[1px] bg-white/40 animate-scan absolute top-0 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                <span className="text-xs tracking-widest font-light">[ PHOTO ]</span>
              </div>
            )}
          </div>
        </div>

        {/* Identity Details */}
        <div className="flex flex-col items-center justify-center w-full px-8 py-6 z-10 text-center flex-1 mt-2">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mb-6 relative">
             <div className="absolute left-1/2 -top-[3px] -translate-x-1/2 w-2 h-2 bg-white/80 rotate-45 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          </div>
          
          <h2 className="text-3xl md:text-4xl uppercase font-[family-name:var(--font-imbue)] text-white mb-3 leading-none tracking-wide relative drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
            {name || "GUEST BUILDER"}
          </h2>
          
          <div className="text-white font-mono tracking-widest uppercase text-[10px] mt-1 font-semibold px-5 py-1.5 border border-white/30 bg-white/10 rounded-full backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            {role || "UNKNOWN STACK"}
          </div>
        </div>

        {/* Footer / Barcode */}
        <div className="w-full px-8 pb-6 pt-4 z-10 flex flex-col items-center gap-4 bg-gradient-to-t from-black/40 to-transparent mt-auto border-t border-white/5">
          <div className="w-full flex justify-between gap-[3px] h-8 opacity-80">
            {/* Minimal barcode generation */}
            {Array.from({ length: 45 }).map((_, i) => (
              <div key={i} className="bg-white/90 rounded-sm" style={{ width: Math.random() > 0.5 ? '2px' : '3px', height: Math.random() > 0.8 ? '100%' : '70%', alignSelf: 'flex-end', opacity: Math.random() * 0.6 + 0.4 }} />
            ))}
          </div>
          <div className="flex justify-between w-full text-[9px] text-white/70 tracking-widest font-medium">
            <span>ID: {(name ? name.replace(/\s/g, '') : 'GUEST').substring(0, 6).toUpperCase()}{Math.random().toString(36).substr(2, 4).toUpperCase()}</span>
            <span>AUTH: 2:47PM-{Date.now().toString().slice(-4)}</span>
          </div>
        </div>
      </div>
    );
  }
);

IDCard.displayName = 'IDCard';
