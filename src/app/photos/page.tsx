"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const images = Array.from({ length: 29 }, (_, i) => `/images/photo${i + 1}.JPEG`);


export default function PhotosPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Back to Home + Title */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/"
          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          ← Back to Home
        </Link>
        <h1 className="flex justify-center text-3xl font-bold">Photo Gallery</h1>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => setSelectedImage(src)}
          >
            <div className="relative w-full aspect-square">
              <Image
                src={src}
                alt={`Photo ${idx + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
            >
              <Image
                src={selectedImage}
                alt="Selected"
                width={1000}
                height={1000}
                className="object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
