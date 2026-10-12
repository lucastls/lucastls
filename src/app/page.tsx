import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/icons";
import { FeaturedPhoto } from "@/components/featured-photo";
import { PhotoGallery } from "@/components/photo-gallery";
import { getPhotos, selectPhotographs } from "@/lib/photos";

export const revalidate = 3600;
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  const photos = await getPhotos();
  const featured =
    photos.find((photo) => photo.id === "DSCF0818-RAF_DxO_DeepPRIMEXD") ||
    photos[0];
  return (
    <>
      <section className="home-intro" aria-labelledby="home-heading">
        <p className="eyebrow intro-eyebrow">
          <span className="status-dot" /> A visual journal by Lucas Teodoro
        </p>
        <div className="intro-layout">
          <h1 id="home-heading">
            The art of
            <br />
            <em>paying attention.</em>
          </h1>
          <div className="intro-aside">
            <p>
              Places, people, and the quiet
              <br className="desktop-break" /> moments in between.
            </p>
            <a className="text-link" href="#selected">
              Explore the photographs <Arrow direction="down" />
            </a>
          </div>
        </div>
      </section>
      {featured && <FeaturedPhoto photo={featured} />}
      <section
        className="selected-section"
        id="selected"
        aria-labelledby="selected-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / A few things that caught my eye</p>
            <h2 id="selected-heading">
              Selected photographs<span className="small-dot">.</span>
            </h2>
          </div>
          <Link className="text-link" href="/photography">
            View the collection{" "}
            <span className="link-count">
              ({String(photos.length).padStart(2, "0")})
            </span>
            <Arrow direction="up-right" />
          </Link>
        </div>
        <PhotoGallery photos={selectPhotographs(photos)} selected />
      </section>
      <section className="about-strip" aria-labelledby="about-heading">
        <p className="eyebrow">02 / Behind the camera</p>
        <div className="about-strip-content">
          <h2 id="about-heading">
            Some things are worth
            <br />
            <em>looking at twice.</em>
          </h2>
          <div>
            <p>
              Photography is a reason to slow down. To notice the light, follow
              a little curiosity, and find something unexpected in the everyday.
            </p>
            <Link className="text-link" href="/about">
              A little about me <Arrow direction="up-right" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
