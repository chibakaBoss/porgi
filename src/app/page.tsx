'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { collection, addDoc, onSnapshot, query, deleteDoc, doc } from 'firebase/firestore';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import { app } from '../../firebaseConfig';

// ------------ Slideshow assets ---------------------------------------------
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

// ------------ Small UI helpers --------------------------------------------
const Glass: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = '', children }) => (
  <div className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${className}`}>
    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-emerald-400/10" />
    {children}
  </div>
);

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="bg-gradient-to-br from-white via-white to-emerald-200 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent md:text-3xl">
      {title}
    </h2>
    {subtitle && <p className="mt-1 text-sm text-neutral-300/80">{subtitle}</p>}
  </div>
);

// ------------ Mobile menu modal -------------------------------------------
function MobileMenuModal() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = [
    { href: '#projects', label: 'ХАЛИНДАЙР' },
    { href: '/photos', label: "ЛАЛАРЫН ЗУРАГНУУД" },
    { href: '/chatroom', label: 'ЧАЛЧИХ ӨРӨӨ' },
  ];

  return (
    <div className="relative md:hidden">
      <button
        onClick={() => setMenuOpen(true)}
        className="px-3 py-2 rounded-full border border-white/10 bg-white/10 text-sm font-semibold"
      >
        Menu
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/70"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-80 rounded-2xl border border-white/10 bg-neutral-900 p-5 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="my-1 block w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 font-semibold text-neutral-200 hover:bg-emerald-400 hover:text-black"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => setMenuOpen(false)}
                className="mt-4 rounded-full bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
              >
                close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------ Firebase helpers --------------------------------------------
const deleteEvent = (id: string) => {
  const db = getDatabase(app);
  const eventRef = ref(db, `events/${id}`);
  remove(eventRef);
};

// ------------ SimpleGallery -------------------------------------------------
function SimpleGallery() {
  const images = [
    { src: '/images/photo34.jpg', label: 'Johnny Sins', description: 'Donate hiigeed end durtai yumaa bichuuleerei' },
    { src: '/images/photo33.jpeg', label: 'Jordi El Niño Polla', description: 'Donate hiigeed end durtai yumaa bichuuleerei' },
    { src: '/images/photo30.jpg', label: 'Eva Elfie', description: 'Donate hiigeed end durtai yumaa bichuuleerei' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 p-6 md:flex-row md:justify-center">
      {images.map((img, index) => (
        <Glass key={index} className="w-48 p-3">
          <img src={img.src} alt={img.label} className="h-44 w-full rounded-xl object-cover" />
          <h3 className="mt-3 text-center text-base font-semibold text-white">{img.label}</h3>
          <p className="mt-1 text-center text-sm text-neutral-300">{img.description}</p>
        </Glass>
      ))}
    </div>
  );
}

// ------------ Calendar ------------------------------------------------------
function Calendar() {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventText, setNewEventText] = useState('');
  const [events, setEvents] = useState<Record<string, { id: string; text: string }[]>>({});

  useEffect(() => {
    const db = getDatabase(app);
    const eventsRef = ref(db, 'events');
    onValue(eventsRef, (snapshot) => {
      const data: Record<string, { id: string; text: string }[]> = {};
      const val = snapshot.val();
      if (val) {
        Object.entries(val).forEach(([id, item]: any) => {
          if (item.date && item.text) {
            if (!data[item.date]) data[item.date] = [];
            data[item.date].push({ id, text: item.text });
          }
        });
      }
      setEvents(data);
    });
  }, []);

  const addEvent = () => {
    if (!newEventDate || !newEventText) return;
    const db = getDatabase(app);
    const eventsRef = ref(db, 'events');
    push(eventsRef, { date: newEventDate, text: newEventText });
    setNewEventDate('');
    setNewEventText('');
  };

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: (number | null)[][] = [];
  let dayCount = 1 - firstDay;
  for (let w = 0; w < 6; w++) {
    const days: (number | null)[] = [];
    for (let d = 0; d < 7; d++) {
      if (dayCount > 0 && dayCount <= daysInMonth) days.push(dayCount); else days.push(null);
      dayCount++;
    }
    weeks.push(days);
  }

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const prevMonth = () => setDate(new Date(year, month - 1, 1));
  const nextMonth = () => setDate(new Date(year, month + 1, 1));

  const getEventsForDate = (y: number, m: number, d: number) => {
    const key = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return events[key] || [];
  };

  return (
    <Glass className="mx-auto max-w-md p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={prevMonth} className="rounded-full border border-white/10 px-3 py-1">‹</button>
        <h2 className="text-lg font-semibold">{monthNames[month]} {year}</h2>
        <button onClick={nextMonth} className="rounded-full border border-white/10 px-3 py-1">›</button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs text-neutral-400">
        {dayNames.map((d) => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weeks.flat().map((day, i) => {
          const isSelected =
            selectedDate &&
            day === selectedDate.getDate() &&
            month === selectedDate.getMonth() &&
            year === selectedDate.getFullYear();
          const hasEvent = day !== null && getEventsForDate(year, month, day).length > 0;
          return (
            <button
              key={i}
              onClick={() => day && setSelectedDate(new Date(year, month, day))}
              className={`rounded-lg py-2 text-sm ${day === null ? 'text-neutral-700' : 'text-neutral-200'} ${
                isSelected ? 'bg-emerald-500 text-black font-bold' : 'hover:bg-white/5'
              } ${hasEvent ? 'border border-emerald-400/60' : 'border border-white/5'}`}
            >
              {day ?? ''}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {selectedDate ? (
          <>
            <h3 className="mb-2 text-lg font-semibold">Events for {selectedDate.toLocaleDateString()}</h3>
            <ul className="list-inside space-y-2 text-neutral-300">
              {getEventsForDate(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).length > 0 ? (
                getEventsForDate(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).map((event) => (
                  <li key={event.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span>{event.text}</span>
                    <button onClick={() => deleteEvent(event.id)} className="text-xs text-red-400 hover:text-red-500">Delete</button>
                  </li>
                ))
              ) : (
                <li className="text-neutral-500">No events for this day.</li>
              )}
            </ul>
          </>
        ) : (
          <p className="italic text-neutral-500">Select a day to see events.</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">Add new event</h3>
        <div className="flex flex-col md:flex-row">
          <input type="date" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} className="rounded-lg border border-white/10 bg-neutral-900 p-2 md:w-48" />
          <input type="text" placeholder="Event description" value={newEventText} onChange={(e) => setNewEventText(e.target.value)} className="flex-1 rounded-lg border border-white/10 bg-neutral-900 p-2" />
          <button type="button" onClick={addEvent} className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-black">Add Event</button>
        </div>
      </div>
    </Glass>
  );
}

// ------------ Main ----------------------------------------------------------
export default function MyComponent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % slideshowImages.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => setIndex((p) => (p + 1) % slideshowImages.length);
  const prevImage = () => setIndex((p) => (p - 1 + slideshowImages.length) % slideshowImages.length);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Cosmic gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-1/3 top-[-20%] h-[60vh] w-[60vw] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute right-[-20%] top-1/3 h-[55vh] w-[55vw] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(6,182,212,.12),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,.10),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:36px_36px]" />
      </div>

      {/* Header */}
      <header className="relative mx-auto mt-6 flex max-w-7xl items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-6 backdrop-blur-xl">
        <div className="absolute inset-0 -z-10 opacity-60" style={{ background: 'linear-gradient(135deg, rgba(28,129,107,.15), rgba(0,100,255,.15) 50%, rgba(255,0,200,.15))' }} />
        <h1 className="text-xl font-semibold tracking-tight">JACK DANIELS BROS</h1>
        <nav className="hidden items-center gap-4 md:flex">
          <a href="#projects" className="rounded-full px-3 py-1 text-neutral-300 hover:bg-white/10 hover:text-white">CHAMPS ZONE</a>
          <a href="/photos" className="rounded-full px-3 py-1 text-neutral-300 hover:bg-white/10 hover:text-white">FUCKING FOTO'S</a>
          <a href="/chatroom" className="rounded-full px-3 py-1 text-neutral-300 hover:bg-white/10 hover:text-white">DRUNK LVL RUSSIA</a>
        </nav>
        <MobileMenuModal />
      </header>

      {/* Intro + Slideshow */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 py-12 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
          <p className="text-sm font-medium text-emerald-400">"We are stronger when we are all together"</p>
          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">PORGI EVENT ZONE 2025</h2>
          <p className="max-w-xl text-neutral-300">
            We’ve walked through storms, through rain and sun, <br />
            Shared battles lost, and victories won. <br />
            Not bound by blood, but something more- <br />
            A brotherhood we can’t ignore.
          </p>
          <div className="flex gap-3">
            <a href="#projects" className="rounded-full bg-emerald-500 px-4 py-2 font-semibold text-black">Lets drink!!!</a>
            <a href="#contact" className="rounded-full border border-neutral-700 px-4 py-2">Problem?</a>
          </div>
          <div className="flex gap-3 text-sm text-neutral-400"><span>Drink</span><span>•</span><span>Vodka</span><span>•</span><span>Play</span><span>•</span><span>Dotka</span></div>
        </motion.div>

        <Glass className="relative h-[380px] w-full overflow-hidden rounded-3xl border-white/10 md:h-[520px]">
          <AnimatePresence>
            <motion.img
              key={slideshowImages[index]}
              src={slideshowImages[index]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
          <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 hover:bg-black/60">‹</button>
          <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 hover:bg-black/60">›</button>
          <div className="absolute bottom-3 flex w-full justify-center gap-2">
            {slideshowImages.map((_, i) => (
              <div key={i} className={`h-2 w-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`} />
            ))}
          </div>
        </Glass>
      </section>

      {/* Calendar Section */}
      <section id="projects" className="mx-auto max-w-4xl px-6 py-12">
        <SectionTitle title="Calendar" subtitle="Plan the chaos • Log the glory • Цэргийн баярын битүүн • Уулзаа учраа • Бүх эвентийг энд нэмж бусаддаа тогтмол мэдэгдэнэ үү!" />
        <Calendar />
      </section>

      {/* Simple Gallery Section */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <SectionTitle title="Top Donater and CEO's " subtitle="Дараах Хаан банк: 5925271827 дансанд donate хийж энд зургаа тавиулаарай." />
        <SimpleGallery />
      </section>

      {/* Contact Section */}
      <section id="contact" className="mx-auto max-w-4xl px-6 py-12">
        <SectionTitle title="Get in touch" />
        <Glass className="p-6">
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input className="rounded-lg border border-white/10 bg-neutral-900 p-3" placeholder="Your name" />
            <input className="rounded-lg border border-white/10 bg-neutral-900 p-3" placeholder="Email" />
            <textarea className="sm:col-span-2 rounded-lg border border-white/10 bg-neutral-900 p-3" rows={5} placeholder="Message" />
            <button className="sm:col-span-2 rounded-lg bg-emerald-500 px-4 py-3 font-semibold text-black">Send message</button>
          </form>
        </Glass>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-neutral-800 py-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} ChibakaBoss — Built with Osor + his heart
      </footer>
    </main>
  );
}
