'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { initializeApp, getApps } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  push,
  query,
  limitToLast,
} from 'firebase/database';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowLeft, Send, Trophy, User, Sparkles } from 'lucide-react';

/**
 * 🔥 Firebase (client-safe) config
 * Tip: apiKey is safe to expose for client SDKs.
 */
const firebaseConfig = {
  apiKey: 'AIzaSyCUYEBK79RlMZQf-VNYfCP6x1aATY5bjd8',
  authDomain: 'porgichatroom.firebaseapp.com',
  databaseURL: 'https://porgichatroom-default-rtdb.firebaseio.com/',
  projectId: 'porgichatroom',
  storageBucket: 'porgichatroom.firebasestorage.app',
  messagingSenderId: '472911808034',
  appId: '1:472911808034:web:9a6ab56f350708f3d8ac7b',
  measurementId: 'G-NM8F5PJZQW',
};

// Avoid re-initializing during HMR
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getDatabase(app);

// Types
export type Message = {
  id: string;
  user: string;
  text: string;
  timestamp: number;
};

export type Result = {
  player: string;
  score: number;
};

// --- Small UI helpers ------------------------------------------------------
const GlassCard: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className = '',
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    className={
      'relative rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-emerald-700/10 backdrop-blur-xl ' +
      className
    }
  >
    {/* neon rim */}
    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-emerald-400/10" />
    {children}
  </motion.div>
);

const TiltCard: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className = '',
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const tX = useTransform(ry, [ -15, 15 ], [ -8, 8 ]);
  const tY = useTransform(rx, [ -15, 15 ], [ 8, -8 ]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        rx.set((py - 0.5) * 30);
        ry.set((px - 0.5) * 30);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, translateX: tX, translateY: tY, transformStyle: 'preserve-3d' }}
      className={'[perspective:1000px] ' + className}
    >
      {children}
    </motion.div>
  );
};

const NeonBadge: React.FC<{ icon?: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300 shadow-[0_0_24px] shadow-emerald-500/20">
    {icon}
    <span className="text-xs font-semibold tracking-wide">{children}</span>
  </span>
);

// Format time like 09:12 PM
const formatTime = (ts: number) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// --- Main Component ---------------------------------------------------------
export default function LiveChatTournament() {
  const router = useRouter();

  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Static demo tournament results (replace with live DB later if desired)
  const [results] = useState<Result[]>([
    { player: 'Khuslee', score: 0 },
    { player: 'Muunuu', score: 0 },
    { player: 'Hurdee', score: 0 },
    { player: 'Osor', score: 0 },
    { player: 'P', score: 0 },
    { player: 'Tsoomoo', score: 0 },
    { player: 'Esika', score: 0 },
  ]);

  useEffect(() => {
    const messagesRef = query(ref(db, 'messages'), limitToLast(100));
    const off = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded: Message[] = Object.entries<any>(data)
          .map(([key, val]) => ({ id: key, user: val.user, text: val.text, timestamp: val.timestamp }))
          .sort((a, b) => a.timestamp - b.timestamp);
        setMessages(loaded);
      } else {
        setMessages([]);
      }
    });
    return () => off();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !username.trim()) {
      alert('Please enter your name and message.');
      return;
    }
    const messagesRef = ref(db, 'messages');
    push(messagesRef, { user: username.trim(), text: input.trim(), timestamp: Date.now() });
    setInput('');
  };

  const meColor = 'from-emerald-500/30 via-emerald-400/10 to-transparent';
  const otherColor = 'from-white/20 via-white/5 to-transparent';

  const initials = useMemo(() => (username?.trim() ? username.trim()[0]?.toUpperCase() : 'U'), [username]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950">
      {/* Animated gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-1/3 top-[-20%] h-[60vh] w-[60vw] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute right-[-20%] top-1/3 h-[55vh] w-[55vw] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(6,182,212,.12),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,.10),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,.05)_30%,transparent_60%)] animate-[shine_6s_linear_infinite]" />
      </div>

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:36px_36px]" />

      <main className="mx-auto max-w-6xl px-4 py-8 text-white">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            Home
          </button>

          <NeonBadge icon={<Sparkles className="h-3.5 w-3.5" />}>Live • Realtime</NeonBadge>
        </div>

        {/* Title */}
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="bg-gradient-to-br from-white via-white to-emerald-200 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl">
              Live Chat & Tournament Results
            </h1>
            <p className="mt-2 text-sm text-neutral-300/80">JACK • DANEILS • BRO'S</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-neutral-200">
              <User className="h-4 w-4 text-emerald-300" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                className="w-40 bg-transparent placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Chat */}
          <TiltCard>
            <GlassCard className="relative h-[70vh] md:h-[560px]">
              <header className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative inline-flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-sm font-semibold text-neutral-200">Chat</span>
                </div>
                <NeonBadge>100 latest</NeonBadge>
              </header>

              <div className="custom-scroll mr-[-6px] h-[calc(70vh-120px)] md:h-[440px] overflow-y-auto pr-2 pb-20">
                {messages.length === 0 && (
                  <div className="mt-24 text-center text-neutral-400">No messages yet. Start the chat!</div>
                )}

                <div className="space-y-3">
                  {messages.map((msg) => {
                    const mine = username && msg.user === username;
                    return (
                      <div key={msg.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                        {!mine && (
                          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white/90">
                            {msg.user?.[0]?.toUpperCase() || '?'}
                          </div>
                        )}
                        <div className="max-w-[80%]">
                          <div
                            className={`relative rounded-xl border ${
                              mine ? 'border-emerald-400/20' : 'border-white/10'
                            } bg-gradient-to-br ${mine ? meColor : otherColor} p-3 shadow-lg`}
                          >
                            <div className="text-[13px] leading-relaxed text-neutral-100">{msg.text}</div>
                            <div className="mt-1 flex items-center justify-between text-[10px] text-neutral-400">
                              <span className="font-medium text-neutral-300/80">{msg.user}</span>
                              <span>{formatTime(msg.timestamp)}</span>
                            </div>
                            {/* glossy shine */}
                            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent" />
                          </div>
                        </div>
                        {mine && (
                          <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/20 text-xs font-bold text-emerald-200">
                            {initials}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input */}
              <div className="absolute inset-x-4 bottom-[max(env(safe-area-inset-bottom),1rem)]">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 p-1.5 pl-3 backdrop-blur-md">
                  <input
                    type="text"
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-400 focus:outline-none"
                    placeholder="Write a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMessage}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black shadow-[0_8px_24px_-8px_rgba(16,185,129,.6)] transition hover:bg-emerald-300"
                  >
                    <Send className="h-4 w-4" /> Send
                  </motion.button>
                </div>
              </div>
            </GlassCard>
          </TiltCard>

          {/* Tournament */}
          <TiltCard>
            <GlassCard className="h-[auto] md:h-[560px] max-h-[70vh] overflow-auto">
              <header className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-emerald-300" />
                  <h2 className="text-sm font-semibold text-neutral-200">Tournament Results</h2>
                </div>
                <NeonBadge>Season • Alpha</NeonBadge>
              </header>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {results.map((r, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg"
                  >
                    {/* Accent ring */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-emerald-400/10" />

                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/20 text-sm font-bold text-emerald-200">
                          {r.player[0]}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white/90">{r.player}</div>
                          <div className="text-xs text-neutral-400">Score</div>
                        </div>
                      </div>
                      <div className="text-lg font-black text-emerald-300">{r.score}</div>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="absolute inset-y-0 left-0 rounded-r-full bg-gradient-to-r from-emerald-400/40 via-emerald-400/60 to-emerald-300"
                        style={{ width: `${Math.min(100, r.score)}%` }}
                      />
                    </div>

                    {/* Shine */}
                    <div className="pointer-events-none absolute -top-12 left-0 right-0 h-24 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </motion.div>
                ))}
              </div>

              {/* Table fallback / export (optional) */}
              <div className="mt-4 text-center text-xs text-neutral-400">A man can be destroyed, but not defeated!</div>
            </GlassCard>
          </TiltCard>
        </div>
      </main>

      {/* Little CSS extras */}
      <style jsx global>{`
        @keyframes shine { to { background-position: 200% 0; } }
        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(16,185,129,.35); border-radius: 9999px; }
        .custom-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,.04); }
      `}</style>
    </div>
  );
}
