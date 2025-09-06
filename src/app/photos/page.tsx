"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation'; 

const images = Array.from({ length: 29 }, (_, i) => `/images/photo${i + 1}.JPEG`);

export default function PhotosPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const closeModal = () => setSelectedImage(null);
   const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white p-8">
      {/* Header */}
      {/* Буцах товч */}
            <button
              onClick={() => router.push('/')}  // Үндсэн page руу шилжүүлэх
              className="mb-4 self-start bg-emerald-500 hover:bg-emerald-600 text-black px-2 py-1 rounded font-semibold"
            >
              ← Back to Home
            </button>
            <div  className="mb-3 text-green-200">ЛАЛАРЫН ЗУРАГНУУД</div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-8 gap-3">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.1 }}
            className="relative w-full aspect-square cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:brightness-110"
            onClick={() => setSelectedImage(src)}
          >
            <Image
              src={src}
              alt={`Photo ${idx + 1}`}
              fill
              className="object-cover rounded-xl"
            />
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal} // overlay дээр дархад хаагдах
          >
            <motion.div
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              initial={{ scale: 0.8 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // modal доторх image дээр дарсан click overlay-д дамжихгүй
            >
              <button
                className="absolute top-3 right-3 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 z-50"
                onClick={closeModal}
              >
                ✕
              </button>
              <Image
                src={selectedImage}
                alt="Selected"
                width={1000}
                height={1000}
                className="object-contain w-full h-full rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
