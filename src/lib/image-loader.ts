"use client";

import type { ImageLoaderProps } from "next/image";

// Cloudinary does the resizing; Next.js supplies responsive sizes and srcsets.
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith("https://res.cloudinary.com/")) return src;
  return src.replace(
    "/image/upload/",
    `/image/upload/f_auto,q_${quality || 85},w_${width},c_limit/`,
  );
}
