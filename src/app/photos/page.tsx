'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const images = Array.from({ length: 29 }, (_, i) => `/images/photo${i + 1}.JPEG`);

// Static (no animation) background
function CosmicBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* Nebula blobs (static) */}
      <div className="absolute -left-1/4 top-[-10%] h-[55vh] w-[55vw] rounded-full bg-fuchsia-600/25 blur-3xl" />
      <div className="absolute right-[-15%] top-1/3 h-[60vh] w-[55vw] rounded-full bg-indigo-500/25 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(168,85,247,.18),transparent_45%),radial-gradient(circle_at_85%_35%,rgba(16,185,129,.14),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,.12),transparent_40%)]" />
      {/* Subtle star grid (static) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:36px_36px]" />
      {/* Removed shimmer/twinkle animations */}
    </div>
  );
}

export default function PhotosPage() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage = useMemo(() => (selectedIndex !== null ? images[selectedIndex] : null), [selectedIndex]);

  const closeModal = () => setSelectedIndex(null);
  const openWithIndex = (i: number) => setSelectedIndex(i);
  const prev = () => setSelectedIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  const next = () => setSelectedIndex((i) => (i === null ? i : (i + 1) % images.length));

  // Keyboard navigation inside modal
  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <CosmicBackdrop />

      {/* Header */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 pt-6">
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold"
        >
          <span>←</span>
          Home
        </button>
        <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-fuchsia-200">
          JACK • DANEILS • BRO'S
        </span>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-[max(env(safe-area-inset-bottom),2rem)] pt-6">
        <div className="mb-6">
          <h1 className="bg-gradient-to-br from-white via-white to-fuchsia-200 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl">
            Boy's Gallery
          </h1>
          <p className="mt-1 text-sm text-neutral-300/80">Миний сэтгэл тэнгэр шиг байна... Б.Мөнх-эрдэнэ</p>
        </div>

        {/* 8-per-row Grid (static, no hover animations) */}
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => openWithIndex(idx)}
              className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl"
            >
              {/* Rim */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-fuchsia-400/10" />
              <Image
                src={src}
                alt={`Photo ${idx + 1}`}
                fill
                quality={95}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, (max-width: 1536px) 16vw, 12vw"
                className="object-cover"
                priority={idx < 8}
              />
              {/* Subtle shine (static) */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_20%,rgba(255,255,255,.12),transparent_60%)]" />
            </button>
          ))}
        </div>
      </main>

      {/* Modal (static show/hide, no motion) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeModal}
        >
          {/* star specks behind modal (static) */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(2px_2px_at_20%_30%,rgba(255,255,255,.25),transparent),radial-gradient(1.5px_1.5px_at_70%_40%,rgba(255,255,255,.2),transparent),radial-gradient(1.5px_1.5px_at_40%_70%,rgba(255,255,255,.18),transparent)] opacity-40" />

          <div
            className="relative mx-4 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-md shadow-[0_40px_120px_-20px_rgba(168,85,247,.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Frame rim */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-fuchsia-400/20" />

            {/* Controls (no hover/transition effects) */}
            <button aria-label="Close" onClick={closeModal} className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-2 text-white">✕</button>
            <button aria-label="Previous" onClick={prev} className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-xl leading-none">‹</button>
            <button aria-label="Next" onClick={next} className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-xl leading-none">›</button>

            <div className="relative max-h-[82vh] w-full">
              <Image
                src={selectedImage}
                alt="Selected photo"
                width={2000}
                height={1200}
                quality={100}
                className="h-full w-full max-h-[82vh] object-contain"
                priority
              />
            </div>

            {/* Filmstrip */}
            <div className="flex items-center gap-2 overflow-x-auto p-3">
              {images.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border ${i === selectedIndex ? 'border-fuchsia-400/70' : 'border-white/10'}`}
                >
                  <Image src={s} alt={`Thumb ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
