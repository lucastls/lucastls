import Image from "next/image";
import type { Photo } from "@/lib/photo";

export function PhotoImage({
  photo,
  priority = false,
  sizes = "(max-width: 640px) 92vw, (max-width: 1000px) 44vw, 30vw",
  className = "",
}: {
  photo: Photo;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <Image
      className={className}
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      preload={priority}
      placeholder={photo.blurDataURL ? "blur" : "empty"}
      blurDataURL={photo.blurDataURL}
    />
  );
}
