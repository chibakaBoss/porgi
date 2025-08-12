'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const images = [
  '/img1.jpg',
  '/img2.jpg',
  '/img3.jpg',
  '/img4.jpg',
  '/img5.jpg',
  '/img6.jpg',
  '/img7.jpg',
  '/img8.jpg',
  '/img9.jpg',
  '/img10.jpg',
];

export default function MyComponent() {
  const [index, setIndex] = useState(0);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  // Автоматаар солигдох
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

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
            backdropFilter: "blur(20px)",
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
          <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT: Intro text */}
        {/* ... чиний intro text хэсэг ... */}

        {/* RIGHT: Slideshow */}
        <div className="relative w-[320px] h-[380px] md:w-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-lg border border-white/10">
          <AnimatePresence>
            <motion.img
              key={images[index]}
              src={images[index]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full"
          >
            ›
          </button>

          {/* Small indicator dots */}
          <div className="absolute bottom-3 w-full flex justify-center gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

        </motion.div>

        {/* RIGHT: 3D Orb/Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center"
        >
          
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
        <p className="text-neutral-300">
          Za tegeed eniig hogjuuleed yawnaa, zurag horog medeelel sponsor oor yu baina ted nariig end shaanaa "Iveen tetgegchiin neriig end shaana 20k sawaad iveen tetgech bolooroi"
        </p>
      </section>

      <section id="contact" className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold mb-4">Get in touch</h3>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="p-3 rounded bg-neutral-900 border border-neutral-800" placeholder="Your name" />
          <input className="p-3 rounded bg-neutral-900 border border-neutral-800" placeholder="Email" />
          <textarea
            className="sm:col-span-2 p-3 rounded bg-neutral-900 border border-neutral-800"
            rows={5}
            placeholder="Message"
          />
          <button className="sm:col-span-2 px-4 py-3 rounded bg-emerald-500/95 text-black font-semibold">Send message</button>
        </form>
      </section>

      <footer className="border-t border-neutral-800 mt-12 py-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} ChibakaBoss — Built with Osor + his heart
      </footer>
    </main>
  );
}
