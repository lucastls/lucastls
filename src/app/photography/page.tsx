import type { Metadata } from "next";
import { PhotoGallery } from "@/components/photo-gallery";
import { getPhotos } from "@/lib/photos";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Photographs",
  description:
    "Explore the photography collection of Lucas Teodoro. Street scenes, landscapes, architecture, and everyday life.",
  alternates: { canonical: "/photography" },
};

export default async function PhotographyPage() {
  const photos = await getPhotos();
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">
          <span className="status-dot" /> The photography collection
        </p>
        <div className="page-intro-layout">
          <h1>
            A closer <em>look.</em>
          </h1>
          <p>
            A few fragments of the world,
            <br />
            collected one photograph at a time.
          </p>
        </div>
      </section>
      <section className="archive-section" aria-label="Photograph collection">
        <PhotoGallery photos={photos} />
        <div className="archive-end">
          <span className="status-dot" />
          <p>There is always more to notice.</p>
          <span className="eyebrow">
            {String(photos.length).padStart(2, "0")} photographs & counting
          </span>
        </div>
      </section>
    </>
  );
}
