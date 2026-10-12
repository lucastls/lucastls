"use client";

import { useState } from "react";
import { categories, type Photo } from "@/lib/photo";
import { Lightbox } from "./lightbox";
import { PhotoImage } from "./photo-image";
import { Arrow, GridIcon } from "./icons";

export function PhotoGallery({
  photos,
  selected = false,
}: {
  photos: Photo[];
  selected?: boolean;
}) {
  const [category, setCategory] = useState("All photographs");
  const [compact, setCompact] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible =
    category === "All photographs"
      ? photos
      : photos.filter((photo) => photo.category === category);
  const filters = [
    "All photographs",
    ...categories.filter((item) =>
      photos.some((photo) => photo.category === item),
    ),
  ];

  return (
    <>
      {!selected && (
        <div className="gallery-toolbar">
          <div className="gallery-filters" aria-label="Filter photographs">
            {filters.map((filter) => (
              <button
                key={filter}
                aria-pressed={category === filter}
                onClick={() => setCategory(filter)}
              >
                {filter}
                {filter === "All photographs" && <span>{photos.length}</span>}
              </button>
            ))}
          </div>
          <div className="gallery-view" aria-label="Gallery layout">
            <button
              aria-label="Comfortable grid"
              aria-pressed={!compact}
              onClick={() => setCompact(false)}
            >
              <GridIcon />
            </button>
            <button
              aria-label="Compact grid"
              aria-pressed={compact}
              onClick={() => setCompact(true)}
            >
              <GridIcon compact />
            </button>
          </div>
        </div>
      )}
      {!selected && (
        <p className="sr-only" role="status">
          Showing {visible.length} photographs
          {category === "All photographs" ? "" : ` in ${category}`}
        </p>
      )}
      <div
        className={
          selected
            ? "selected-grid"
            : `photo-grid${compact ? " photo-grid-compact" : ""}`
        }
      >
        {visible.map((photo, index) => (
          <figure className="photo-card" key={photo.id}>
            <button
              className="photo-button"
              onClick={() => setOpenIndex(index)}
              aria-label={`View ${photo.title}`}
            >
              <PhotoImage
                photo={photo}
                sizes={
                  selected
                    ? "(max-width: 640px) 92vw, 44vw"
                    : compact
                      ? "(max-width: 640px) 44vw, 22vw"
                      : "(max-width: 640px) 92vw, (max-width: 1000px) 44vw, 30vw"
                }
              />
              <span className="photo-open" aria-hidden="true">
                <Arrow direction="up-right" />
              </span>
            </button>
            <figcaption>
              <span className="photo-number">
                {String(photos.indexOf(photo) + 1).padStart(2, "0")}
              </span>
              <span className="photo-title">{photo.title}</span>
              <span className="photo-category">{photo.category}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {visible.length === 0 && (
        <div className="empty-gallery">
          <h2>A little quiet here.</h2>
          <p>New photographs will appear here soon.</p>
        </div>
      )}
      {openIndex !== null && (
        <Lightbox
          photos={visible}
          initialIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
