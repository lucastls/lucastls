"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PhotoImage } from "./photo-image";
import { Arrow, CloseIcon } from "./icons";
import type { Photo } from "@/lib/photo";

export function Lightbox({
  photos,
  initialIndex,
  onClose,
}: {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);
  const [index, setIndex] = useState(initialIndex);
  const photo = photos[index];
  const navigate = useCallback(
    (direction: number) =>
      setIndex(
        (current) => (current + direction + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  if (!photo) return null;

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label="Photograph viewer"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          navigate(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          navigate(-1);
        }
      }}
    >
      <div className="lightbox-top">
        <span>Lucas Teodoro / Photographs</span>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close photograph"
        >
          <CloseIcon />
        </button>
      </div>
      <div
        className="lightbox-stage"
        onTouchStart={(event) => {
          touchStart.current = event.changedTouches[0].clientX;
        }}
        onTouchEnd={(event) => {
          if (touchStart.current !== null) {
            const delta = touchStart.current - event.changedTouches[0].clientX;
            if (Math.abs(delta) > 50) navigate(delta > 0 ? 1 : -1);
            touchStart.current = null;
          }
        }}
      >
        <PhotoImage key={photo.id} photo={photo} sizes="92vw" priority />
      </div>
      <div className="lightbox-bottom">
        <div aria-live="polite" aria-atomic="true">
          <span className="lightbox-counter">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(photos.length).padStart(2, "0")}
          </span>
          <h2>{photo.title}</h2>
          {photo.category && <p>{photo.category}</p>}
        </div>
        {photos.length > 1 && (
          <div className="lightbox-controls">
            <button
              className="icon-button previous-photo"
              onClick={() => navigate(-1)}
              aria-label="Previous photograph"
            >
              <Arrow />
            </button>
            <button
              className="icon-button"
              onClick={() => navigate(1)}
              aria-label="Next photograph"
            >
              <Arrow />
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
