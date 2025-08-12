'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Slideshow-д ашиглах зургууд
const slideshowImages = [
  '/images/photo28.JPEG',
  '/images/photo1.JPEG',
  '/images/photo7.JPEG',
  '/images/photo17.JPEG',
  '/images/photo3.JPEG',
  '/images/photo6.JPEG',
  '/images/photo13.JPEG',
  '/images/photo16.JPEG',
  '/images/photo19.JPEG',
  '/images/photo20.JPEG',
  '/images/photo22.JPEG',
];

// SimpleGallery component
function SimpleGallery() {
  const images = [
    {
      src: '/images/photo34.jpg',
      label: 'Johnny Sins',
      description: 'Donate hiigeed end durtai yumaa bichuuleerei',
    },
    {
      src: '/images/photo33.jpeg',
      label: 'Jordi El Niño Polla',
      description: 'Donate hiigeed end durtai yumaa bichuuleerei',
    },
    {
      src: '/images/photo30.jpg',
      label: 'Eva Elfie',
      description: 'Donate hiigeed end durtai yumaa bichuuleerei',
    },
  ];

  return (
    <div className="flex gap-6 p-6 bg-gray-900 justify-center">
      {images.map((img, index) => (
        <div
          key={index}
          className="w-40 flex flex-col items-center rounded overflow-hidden bg-neutral-800 p-2"
        >
          <img
            src={img.src}
            alt={img.label}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="text-white mt-2 text-center font-semibold">{img.label}</h3>
          <p className="text-gray-300 text-sm mt-1 text-center">{img.description}</p>
        </div>
      ))}
    </div>
  );
}

// Calendar component
function Calendar() {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const events: Record<string, string[]> = {
    '2025-08-31': ['Awards ceremony', 'Party at Rage’s home', 'Meet at 8pm'],
    '2025-08-30': ['Tournament day'],
    '2025-08-29': ['Strategy technical meeting at 20:00PM'],
    '2025-09-12': ['Tsoomoo’s birthday'],
    '2025-08-26': ['P’s birthday'],
    '2025-06-23': ['Khuslee’s birthday'],
    '2025-04-08': ['Ruhde’s birthday'],
    '2025-04-28': ['Nine’s birthday'],
    '2025-01-31': ['Moonoo’s birthday'],
    '2025-04-02': ['Osor’s birthday'],
    '2026-09-12': ['Tsoomoo’s birthday'],
    '2026-08-26': ['P’s birthday'],
    '2026-06-23': ['Khuslee’s birthday'],
    '2026-04-08': ['Ruhde’s birthday'],
    '2026-04-28': ['Nine’s birthday'],
    '2026-01-31': ['Moonoo’s birthday'],
    '2026-04-02': ['Osor’s birthday'],
  };

  const weeks = [];
  let dayCount = 1 - firstDay;

  for (let week = 0; week < 6; week++) {
    const days = [];
    for (let day = 0; day < 7; day++) {
      if (dayCount > 0 && dayCount <= daysInMonth) {
        days.push(dayCount);
      } else {
        days.push(null);
      }
      dayCount++;
    }
    weeks.push(days);
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => {
    setDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const getEventsForDate = (year: number, month: number, day: number) => {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events[key] || [];
  };

  return (
    <section className="max-w-md mx-auto bg-neutral-900 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="text-emerald-400 hover:text-emerald-600 font-bold"
          aria-label="Previous Month"
        >
          ‹
        </button>
        <h2 className="text-lg font-semibold select-none">
          {monthNames[month]} {year}
        </h2>
        <button
          onClick={nextMonth}
          className="text-emerald-400 hover:text-emerald-600 font-bold"
          aria-label="Next Month"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-neutral-400 mb-2 select-none">
        {dayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weeks.flat().map((day, i) => {
          const isSelected =
            selectedDate &&
            day === selectedDate.getDate() &&
            month === selectedDate.getMonth() &&
            year === selectedDate.getFullYear();

          const isToday =
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();

          const hasEvent = day !== null && getEventsForDate(year, month, day).length > 0;

          return (
            <div
              key={i}
              onClick={() => {
                if (day) setSelectedDate(new Date(year, month, day));
              }}
              className={`
                py-2 rounded cursor-pointer select-none
                ${isSelected ? 'bg-emerald-500 text-black font-bold' : ''}
                ${isToday && !isSelected ? 'bg-emerald-700 text-white' : ''}
                ${day === null ? 'text-neutral-700 cursor-default' : 'text-neutral-300'}
                ${hasEvent ? 'border border-emerald-400' : ''}
                hover:bg-emerald-600 hover:text-black transition
              `}
              title={hasEvent ? 'Has events' : undefined}
            >
              {day ?? ''}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        {selectedDate ? (
          <>
            <h3 className="text-lg font-semibold mb-2">
              Events for {selectedDate.toLocaleDateString()}
            </h3>
            <ul className="list-disc list-inside text-neutral-300">
              {getEventsForDate(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate()
              ).length > 0 ? (
                getEventsForDate(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  selectedDate.getDate()
                ).map((event, idx) => <li key={idx}>{event}</li>)
              ) : (
                <li>No events for this day.</li>
              )}
            </ul>
          </>
        ) : (
          <p className="text-neutral-500 italic select-none">
            Select a day to see events.
          </p>
        )}
      </div>
    </section>
  );
}

// Гол component
export default function MyComponent() {
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Автомат зургуудыг солих
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () =>
    setIndex((prev) => (prev + 1) % slideshowImages.length);
  const prevImage = () =>
    setIndex((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);

  // Menu анимэйшн variant-ууд
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-white antialiased">
      {/* Header */}
      <header className="relative max-w-7xl mx-auto px-6 py-8 flex items-center justify-between overflow-hidden rounded-xl">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(135deg, rgba(28, 129, 107, 0.15) 0%, rgba(0,100,255,0.15) 50%, rgba(255,0,200,0.15) 100%)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
          }}
        />
        <h1 className="text-xl font-semibold tracking-tight">JACK DANIELS BROS</h1>

        {/* Desktop nav */}
        <nav className="space-x-4 hidden md:flex">
          <a
            href="#projects"
            className="text-neutral-300 hover:text-white transition-all duration-200 hover:scale-105"
          >
            CHAMPS ZONE
          </a>
          <a
            href="/photos"
            className="text-neutral-300 hover:text-white transition-all duration-200 hover:scale-105"
          >
            FUCKING FOTO'S
          </a>
          <a
            href="/chatroom"
            className="text-neutral-300 hover:text-white transition-all duration-200 hover:scale-105"
          >
            DRUNK LVL RUSSIA
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden px-3 py-1 border rounded text-sm bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          Menu
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="absolute top-full right-6 mt-2 bg-neutral-900 rounded shadow-lg py-2 px-4 flex flex-col space-y-2 md:hidden z-50 min-w-[180px]"
            >
              {[
                { href: '#projects', label: 'CHAMPS ZONE' },
                { href: '/photos', label: "FUCKING FOTO'S" },
                { href: '/chatroom', label: 'DRUNK LVL RUSSIA' },
              ].map(({ href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  variants={itemVariants}
                  className="text-neutral-300 hover:text-white transition-all duration-200 hover:scale-105"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </motion.a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Intro + Slideshow */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p className="text-sm text-emerald-400 font-medium">Your blood my invo</p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            PORGI EVENT ZONE 2025
          </h2>
          <p className="text-neutral-300 max-w-xl">
            We’ve walked through storms, through rain and sun, <br />
            Shared battles lost, and victories won. <br />
            Not bound by blood, but something more- <br />
            A brotherhood we can’t ignore.
          </p>
          <div className="flex gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-emerald-500/90 hover:bg-emerald-500 px-4 py-2 rounded shadow"
            >
              Lets drink!!!
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-neutral-700 px-4 py-2 rounded"
            >
              Problem?
            </a>
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

        <div className="relative w-full h-[380px] md:h-[520px] rounded-3xl overflow-hidden shadow-lg border border-white/10">
          <AnimatePresence>
            <motion.img
              key={slideshowImages[index]}
              src={slideshowImages[index]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>

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

          <div className="absolute bottom-3 w-full flex justify-center gap-2">
            {slideshowImages.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === index ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section id="projects" className="max-w-4xl mx-auto py-12">
        <Calendar />
      </section>

      {/* Simple Gallery Section */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold mb-4">Top Donater and CEO's </h3>
        <p className="text-neutral-300 mb-6">
          Дараах Хаан банк: 5925271827 дансанд donate хийж энд зургаа
          тавиулаарай. Та бүгдийн хийсэн donate сайн үйлсэд зориулагдах ба
          вэбсайт-даа хувь нэмэр оруулсан оюунлаг архичин танд баярлалараа.
        </p>
        <SimpleGallery />
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold mb-4">Get in touch</h3>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="p-3 rounded bg-neutral-900 border border-neutral-800"
            placeholder="Your name"
          />
          <input
            className="p-3 rounded bg-neutral-900 border border-neutral-800"
            placeholder="Email"
          />
          <textarea
            className="sm:col-span-2 p-3 rounded bg-neutral-900 border border-neutral-800"
            rows={5}
            placeholder="Message"
          />
          <button className="sm:col-span-2 px-4 py-3 rounded bg-emerald-500/95 text-black font-semibold">
            Send message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 mt-12 py-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} ChibakaBoss — Built with Osor + his heart
      </footer>
    </main>
  );
}
