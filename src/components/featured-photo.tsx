"use client";

import { useState } from "react";
import type { Photo } from "@/lib/photo";
import { PhotoImage } from "./photo-image";
import { Lightbox } from "./lightbox";
import { Arrow } from "./icons";

export function FeaturedPhoto({ photo }: { photo: Photo }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <figure className="featured-photo">
        <button
          className="photo-button"
          onClick={() => setOpen(true)}
          aria-label={`View ${photo.title}`}
        >
          <PhotoImage
            photo={photo}
            priority
            sizes="(max-width: 1440px) 92vw, 1328px"
          />
          <span className="featured-open" aria-hidden="true">
            Take a closer look <Arrow direction="up-right" />
          </span>
        </button>
        <figcaption>
          <span className="eyebrow">Featured photograph</span>
          <span>{photo.title}</span>
          <span className="featured-category">{photo.category}</span>
        </figcaption>
      </figure>
      {open && (
        <Lightbox
          photos={[photo]}
          initialIndex={0}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
