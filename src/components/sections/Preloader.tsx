"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

const statuses = [
  "Initializing Experience...",
  "Loading Components...",
  "Optimizing Assets...",
  "Preparing Interface...",
  "Launching WebNest..."
];

export function Preloader() {
  const [isOverlayRemoved, setIsOverlayRemoved] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const logoSubRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* ── Timer manager ───────────────────────── */
    const timers: NodeJS.Timeout[] = [];
    function later(fn: () => void, ms: number) {
      const id = setTimeout(fn, ms);
      timers.push(id);
      return id;
    }
    function cancelAll() {
      timers.forEach(clearTimeout);
      timers.length = 0;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    const laptop = laptopRef.current;
    const lid = lidRef.current;
    const screen = screenRef.current;
    const flash = flashRef.current;
    const display = displayRef.current;
    const logoText = logoTextRef.current;
    const logoSub = logoSubRef.current;
    const scene = sceneRef.current;
    const bar = barRef.current;
    const barFill = barFillRef.current;
    const skipBtn = skipBtnRef.current;
    const scrollInd = scrollIndRef.current;

    /* Lock scroll */
    document.body.style.overflow = 'hidden';

    /* ── Finish: zoom → fade overlay → show scroll indicator ── */
    function finish() {
      cancelAll();

      /* 1. Zoom scene into screen */
      if (scene) scene.classList.add('intro-scene--zoom');

      /* 2. Fade overlay after zoom begins */
      later(() => {
        if (overlay) overlay.classList.add('intro-overlay--fade');
      }, 350);

      /* 3. Remove overlay + unlock scroll */
      later(() => {
        setIsOverlayRemoved(true);
        document.body.style.overflow = '';
        window.scrollTo(0, 0);

        /* 4. Show scroll indicator */
        later(() => {
          if (scrollInd) scrollInd.classList.add('scroll-indicator--visible');
        }, 300);

      }, 1100);
    }

    /* ── Skip ─────────────────────────────── */
    function skip() {
      cancelAll();
      if (!overlay) return;
      /* Hard cut — remove overlay immediately */
      overlay.style.transition = 'opacity 0.4s ease';
      overlay.style.opacity = '0';
      later(() => {
        setIsOverlayRemoved(true);
        document.body.style.overflow = '';
        window.scrollTo(0, 0);
        later(() => {
          if (scrollIndRef.current) scrollIndRef.current.classList.add('scroll-indicator--visible');
        }, 400);
      }, 420);
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', skip);
    }
    
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', onKey);
        skip();
      }
    };
    document.addEventListener('keydown', onKey);

    /* Status text animation */
    const statusInt = setInterval(() => {
      setStatusIndex(prev => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 1000);

    /* ═══════════════════════════════════════
       TIMELINE
    ═══════════════════════════════════════ */

    /* STEP 1 — Laptop fades + rises into view (200ms) */
    later(() => {
      if (laptop) laptop.classList.add('intro-laptop--visible');
    }, 200);

    /* Show skip hint (900ms) */
    later(() => {
      if (skipBtn) skipBtn.classList.add('intro-skip--visible');
    }, 900);

    /* STEP 2 — Lid begins flipping open (800ms) */
    later(() => {
      if (lid) lid.classList.add('intro-lid--open');
    }, 800);

    /* STEP 3 — White flash on screen
       Lid takes ~2s to open. Flash triggers near the end of lid travel. */

    /* Screen glows blue as lid opens */
    later(() => {
      if (screen) screen.classList.add('intro-screen--on');
    }, 2000);

    /* Flash to white (simulates screen powering on) */
    later(() => {
      if (flash) flash.classList.add('intro-flash--on');
    }, 2600);

    /* Peak white — hold for a moment, then fade */
    later(() => {
      if (flash) {
        flash.classList.remove('intro-flash--on');
        flash.classList.add('intro-flash--dim');
      }
      /* Display content fades in behind the receding white flash */
      if (display) display.classList.add('intro-display--on');
    }, 2900);

    /* STEP 4 — Logo appears as flash fades (3100ms) */
    later(() => {
      if (logoText) {
        logoText.classList.add('intro-logo-text--visible');
        /* Start bounce 80ms after logo is visible (let drop-in settle) */
        later(() => {
          logoText.classList.add('intro-logo-text--bounce');
        }, 80);
      }
      if (logoSub) logoSub.classList.add('intro-logo-sub--visible');
    }, 3100);

    /* Progress bar (3200ms) */
    later(() => {
      if (bar) bar.classList.add('intro-bar--visible');
      if (barFill) barFill.classList.add('intro-bar__fill--full');
    }, 3200);

    /* Bounce ends → gentle float (3100 + 1800 = 4900ms) */
    later(() => {
      if (logoText) {
        logoText.classList.remove('intro-logo-text--bounce');
        logoText.classList.add('intro-logo-text--float');
      }
    }, 4900);

    /* STEP 4 — Zoom into screen (5200ms) */
    later(() => {
      finish();
    }, 5200);

    /* ── Scroll indicator auto-hide ──────────── */
    let hidden = false;
    function hideOnScroll() {
      if (!hidden && window.scrollY > 60) {
        hidden = true;
        if (scrollInd) scrollInd.classList.add('scroll-indicator--hidden');
        window.removeEventListener('scroll', hideOnScroll);
      }
    }
    window.addEventListener('scroll', hideOnScroll, { passive: true });

    return () => {
      clearInterval(statusInt);
      cancelAll();
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', hideOnScroll);
      if (skipBtn) skipBtn.removeEventListener('click', skip);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div id="preloader-container" suppressHydrationWarning>
      {!isOverlayRemoved && (
        <div 
          ref={overlayRef} 
          id="intro-overlay" 
          className="fixed inset-0 z-[100] bg-[radial-gradient(circle_at_center,#1B2D52_0%,#14213D_45%,#0D1830_100%)] flex items-center justify-center transition-opacity duration-[700ms]"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] animate-[pulse_4s_ease-in-out_infinite] pointer-events-none"></div>

          <div 
            ref={sceneRef} 
            id="intro-scene" 
            className="relative perspective-[1500px] w-full h-full flex items-center justify-center transition-transform duration-[1000ms] ease-[cubic-bezier(0.8,0,0.2,1)]"
          >
            {/* Laptop */}
            <div 
              ref={laptopRef} 
              id="intro-laptop" 
              className="relative w-[300px] sm:w-[400px] md:w-[600px] aspect-[16/10] transform-style-3d opacity-0 translate-y-12 transition-all duration-1000 ease-out"
            >
              {/* Lid */}
              <div 
                ref={lidRef} 
                id="intro-lid" 
                className="absolute bottom-0 left-0 w-full h-full origin-bottom transform-style-3d rotate-x-[-95deg] transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] rounded-t-[20px] bg-gray-900 border-[4px] border-gray-700 shadow-2xl"
              >
                {/* Screen Content */}
                <div 
                  ref={screenRef} 
                  id="intro-screen" 
                  className="absolute inset-0.5 bg-[linear-gradient(180deg,#31486F_0%,#22324F_60%,#18263D_100%)] overflow-hidden flex items-center justify-center rounded-t-[14px] transition-shadow duration-[1000ms] shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                >
                  {/* Glass Reflection */}
                  <div className="absolute top-0 left-0 w-[150%] h-[150%] bg-gradient-to-tr from-transparent via-white/5 to-transparent -rotate-12 translate-x-[-50%] translate-y-[-50%] pointer-events-none"></div>

                  {/* Flash */}
                  <div 
                    ref={flashRef} 
                    id="intro-flash" 
                    className="absolute inset-0 bg-white opacity-0 z-20 pointer-events-none"
                  ></div>
                  
                  {/* Display */}
                  <div 
                    ref={displayRef} 
                    id="intro-display" 
                    className="relative z-10 flex flex-col items-center opacity-0 transition-opacity duration-[800ms] w-full"
                  >
                    <div 
                      ref={logoTextRef} 
                      id="intro-logo-text" 
                      className="opacity-0 translate-y-8 flex justify-center"
                    >
                      <img src="https://res.cloudinary.com/dixbhnqnf/image/upload/v1783074928/WhatsApp_Image_2026-07-03_at_3.48.58_PM-Photoroom_gk5hxf.png" alt="WebNest Logo" className="h-24 md:h-32 object-contain filter brightness-[1.15] contrast-[1.15] drop-shadow-[0_0_20px_rgba(59,130,246,0.35)]" />
                    </div>
                    <div 
                      ref={logoSubRef} 
                      id="intro-logo-sub" 
                      className="text-xs md:text-sm font-semibold text-[#A7D2FF] mt-2 opacity-0 tracking-[0.4em] uppercase transition-all duration-[800ms] drop-shadow-[0_0_8px_rgba(167,210,255,0.4)]"
                    >
                      Premium Agency
                    </div>
                    
                    {/* Progress Bar */}
                    <div 
                      ref={barRef} 
                      id="intro-bar" 
                      className="w-48 h-1.5 bg-white/10 mt-8 rounded-full overflow-hidden opacity-0 transition-opacity duration-500 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                    >
                      <div 
                        ref={barFillRef} 
                        id="intro-bar-fill" 
                        className="relative h-full bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#2563EB] w-0 transition-all duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)] rounded-full overflow-hidden"
                      >
                         <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[pulse_1.5s_infinite] -translate-x-1/2"></div>
                      </div>
                    </div>

                    {/* Status Text */}
                    <div className="mt-4 h-4 relative w-full flex justify-center">
                      {statuses.map((status, i) => (
                        <span 
                          key={i} 
                          className={`absolute text-[10px] uppercase tracking-widest text-[#A7D2FF]/60 transition-opacity duration-500 ${i === statusIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                          {status}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop Base */}
              <div className="absolute top-full left-[-2%] w-[104%] h-[12px] bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 rounded-b-[16px] rounded-t-sm flex justify-center shadow-[0_40px_60px_-10px_rgba(0,0,0,0.8)] border-b border-gray-400/50 relative overflow-hidden">
                 {/* Metallic Highlight */}
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-white/50"></div>
                 {/* Trackpad indentation */}
                 <div className="w-1/4 h-1 bg-gray-400/50 rounded-b-md shadow-inner mt-px"></div>
              </div>
            </div>
          </div>
          
          <button 
            suppressHydrationWarning
            ref={skipBtnRef} 
            id="intro-skip" 
            className="absolute bottom-10 right-10 text-white/70 hover:text-white text-xs font-medium tracking-widest uppercase opacity-0 transition-all duration-500 border border-white/20 hover:border-white/50 px-5 py-2.5 rounded-full hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] bg-white/5 backdrop-blur-sm"
          >
            Skip Intro
          </button>
        </div>
      )}

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndRef} 
        id="scroll-indicator" 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 opacity-0 transition-all duration-700 pointer-events-none"
      >
        <span className="text-xs font-medium uppercase tracking-widest text-ink-900">Scroll</span>
        <div className="w-8 h-12 rounded-full border-2 border-ink-900 flex justify-center p-1">
          <div className="w-1 h-3 bg-brand-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
