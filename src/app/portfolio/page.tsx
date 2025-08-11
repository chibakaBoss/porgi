'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// PortfolioPage.jsx
// Single-file React component (Next.js app/page or any React app)
// Requirements: Tailwind CSS configured in the project, and framer-motion installed.
// How to use in Next.js: save as app/portfolio/page.jsx (or pages/portfolio.jsx), ensure Tailwind is set up.

export default function PortfolioPage() {
  const orbRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const el = orbRef.current;
    if (!el) return;
  
    function handleMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const ry = (x / rect.width) * 20; // rotateY
      const rx = -(y / rect.height) * 20; // rotateX
      setTilt({ rx, ry });
    }
  
    function handleLeave() {
      setTilt({ rx: 0, ry: 0 });
    }
  
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
  
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);
  


  const projects = [
    { title: 'Interactive 3D UI', desc: 'WebGL-like 3D interactions using CSS and JS', tags: ['React', 'Tailwind'] },
    { title: 'Next.js Blog', desc: 'Fast, SEO-friendly blog with MDX', tags: ['Next.js', 'MDX'] },
    { title: 'Mobile-first App', desc: 'Responsive PWA with offline support', tags: ['PWA', 'Performance'] },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-white antialiased">
            <header className="relative max-w-7xl mx-auto px-6 py-8 flex items-center justify-between overflow-hidden rounded-xl">
        {/* 3D gradient background */}
        <div
            className="absolute inset-0 -z-10"
            style={{
            background: "linear-gradient(135deg, rgba(0,255,200,0.15) 0%, rgba(0,100,255,0.15) 50%, rgba(255,0,200,0.15) 100%)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)"
            }}
        />

        <h1 className="text-xl font-semibold tracking-tight">JACK DANIELS BROS</h1>
        
        <nav className="space-x-4 hidden md:flex">
            <a href="#projects" className="text-neutral-300 hover:text-white transition-all duration-200 hover:scale-105">CHAMPS ZONE</a>
            <a href="#about" className="text-neutral-300 hover:text-white transition-all duration-200 hover:scale-105">FUCKING FOTO'S</a>
            <a href="#contact" className="text-neutral-300 hover:text-white transition-all duration-200 hover:scale-105">DRUNK LVL RUSSIA</a>
        </nav>
        
        <button className="md:hidden px-3 py-1 border rounded text-sm bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-200">
            Menu
        </button>
        </header>


      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT: Intro text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p className="text-sm text-emerald-400 font-medium">Your blood my invo</p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">PORGI EVENT ZONE 2025</h2>
          <p className="text-neutral-300 max-w-xl">
            A man can be drunk, but we can't shit our pants. 
          </p>

          <div className="flex gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 bg-emerald-500/90 hover:bg-emerald-500 px-4 py-2 rounded shadow">Kalendair</a>
            <a href="#contact" className="inline-flex items-center gap-2 border border-neutral-700 px-4 py-2 rounded">Problem?</a>
          </div>

          <div className="flex gap-3 text-sm text-neutral-400">
            <span>Drink</span>
            <span>•</span>
            <span>Vodka</span>
            <span>•</span>
            <span>Play</span>
            <span>•</span>
            <span>Dotka</span>
          </div>
        </motion.div>

        {/* RIGHT: 3D Orb/Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center"
        >
          <div
            ref={orbRef}
            className="relative w-[320px] h-[380px] md:w-[420px] md:h-[520px] perspective-1000"
            style={{ perspective: '1200px' }}
          >
            <div
              className="absolute inset-0 rounded-3xl shadow-2xl bg-gradient-to-br from-indigo-800 via-violet-700 to-emerald-600/30 overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
                transition: 'transform 0.08s linear',
                border: '1px solid rgba(255,255,255,0.04)'
              }}
            >
              {/* layered decorative circles to create depth */}
              <div className="absolute -left-24 -top-12 w-56 h-56 rounded-full blur-3xl mix-blend-screen opacity-70" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 30%)' }} />
              <div className="absolute right-[-60px] bottom-[-40px] w-72 h-72 rounded-full blur-2xl opacity-60" style={{ background: 'radial-gradient(circle at 60% 60%, rgba(255,255,255,0.04), transparent 35%)' }} />

              {/* center content card */}
              <div className="relative z-10 m-6 p-6 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/5 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-yellow-400 flex items-center justify-center text-black font-bold">P.CH</div>
                    <div>
                      <div className="text-sm text-neutral-300">Boss · Bang2</div>
                      <div className="text-lg font-semibold">Here will upload someone's shitty pic!!!</div>
                    </div>
                  </div>

                  <p className="mt-4 text-neutral-300 text-sm">
                    Hen negnii lalriin zurgiig oruulhiig huswel chataar yawuulaarai, 24/7 zurag huleej awna...
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs text-neutral-400">Za tged sanaa onoo bnu?</div>
                    <div className="text-sm font-medium">Saihan heltsgeegeerei</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded bg-emerald-500/95 text-black text-sm">Orgre</button>
                    <button className="px-3 py-1 rounded border border-neutral-700 text-sm">Osor</button>
                  </div>
                </div>
              </div>

              {/* floating grid in the background to accent 3d */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                <rect x="10" y="10" width="120" height="120" rx="8" fill="url(#g1)" transform="translate(40,40) rotate(12)" />
                <rect x="60" y="160" width="80" height="80" rx="8" fill="url(#g1)" transform="translate(120,30) rotate(-6)" />
              </svg>
            </div>

            {/* subtle outer rim */}
            <div className="absolute -inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)' }} />
          </div>
        </motion.div>
      </section>

      <section id="projects" className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold mb-6">End temtseen bolon hezee uuh uultiin medeelel!!!</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.article key={i} whileHover={{ y: -6 }} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
              <div className="text-sm text-neutral-400">Next event</div>
              <div className="mt-2 font-semibold text-lg">{p.title}</div>
              <p className="mt-3 text-neutral-300 text-sm">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded bg-white/3">{t}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="about" className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold mb-4">Temtseenii medeelel zurag horog</h3>
        <p className="text-neutral-300">Za tegeed eniig hogjuuleed yawnaa, zurag horog medeelel sponsor oor yu baina ted nariig end shaanaa "Iveen tetgegchiin neriig end shaana 20k sawaad iveen tetgech bolooroi"</p>
      </section>

      <section id="contact" className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold mb-4">Get in touch</h3>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="p-3 rounded bg-neutral-900 border border-neutral-800" placeholder="Your name" />
          <input className="p-3 rounded bg-neutral-900 border border-neutral-800" placeholder="Email" />
          <textarea className="sm:col-span-2 p-3 rounded bg-neutral-900 border border-neutral-800" rows={5} placeholder="Message" />
          <button className="sm:col-span-2 px-4 py-3 rounded bg-emerald-500/95 text-black font-semibold">Send message</button>
        </form>
      </section>

      <footer className="border-t border-neutral-800 mt-12 py-6 text-center text-sm text-neutral-500">© {new Date().getFullYear()} ChibakaBoss — Built with Osor + his heart </footer>
    </main>
  );
}
