import type { Metadata } from "next";
import Link from "next/link";
import { PhotoImage } from "@/components/photo-image";
import { Arrow } from "@/components/icons";
import { getPhotos } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "About",
  description: "Behind the photographs. A visual journal by Lucas Teodoro.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const photos = await getPhotos();
  const photo = photos.find((item) => item.id === "DSCF6442") || photos[0];
  return (
    <section className="about-page">
      <div className="page-intro">
        <p className="eyebrow">
          <span className="status-dot" /> Behind the camera
        </p>
        <h1>
          Always <em>looking.</em>
        </h1>
      </div>
      <div className="about-page-grid">
        {photo && (
          <figure>
            <PhotoImage
              photo={photo}
              priority
              sizes="(max-width: 640px) 92vw, 42vw"
            />
            <figcaption>{photo.title}</figcaption>
          </figure>
        )}
        <div className="about-copy">
          <p className="eyebrow">Hello, I’m Lucas Teodoro.</p>
          <h2>
            A camera.
            <br />A little curiosity.
            <br />
            <em>An open eye.</em>
          </h2>
          <p>
            This is my photographic journal: a collection of moments from the
            streets, the places I visit, and the everyday scenes that make me
            stop and look.
          </p>
          <p>
            I’m drawn to the way light changes a familiar place. To small
            details and passing gestures. To the stories a single frame can
            leave open.
          </p>
          <p>Thanks for taking a moment to see the world through my lens.</p>
          <Link className="text-link" href="/photography">
            Explore my photographs <Arrow direction="up-right" />
          </Link>
          {(site.email || site.instagram) && (
            <div className="about-contact">
              <p className="eyebrow">Let’s keep in touch</p>
              {site.email && (
                <a className="text-link" href={`mailto:${site.email}`}>
                  {site.email}
                  <Arrow direction="up-right" />
                </a>
              )}
              {site.instagram && (
                <a
                  className="text-link"
                  href={site.instagram}
                  rel="noreferrer"
                  target="_blank"
                >
                  Instagram <Arrow direction="up-right" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
