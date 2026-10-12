import type { Metadata } from "next";
import { hasAlbumSession } from "@/lib/album-session";
import { getPhotos } from "@/lib/photos";
import { AlbumPasswordForm } from "@/components/album-password-form";
import { PhotoGallery } from "@/components/photo-gallery";
import { lockAlbum } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Natal 2022",
  robots: { index: false, follow: false },
};

export default async function AlbumPage() {
  if (!(await hasAlbumSession())) {
    return (
      <section className="message-page">
        <p className="eyebrow">A collection for friends & family</p>
        <h1>
          Natal <em>2022.</em>
        </h1>
        <p>
          A few memories, kept between us. Enter the album password to take a
          look.
        </p>
        <AlbumPasswordForm />
      </section>
    );
  }
  // Private image data is fetched only after the server has verified the session.
  const photos = await getPhotos("natal2022");
  return (
    <>
      <div className="album-heading">
        <section className="page-intro">
          <p className="eyebrow">Friends, family & good memories</p>
          <h1>
            Natal <em>2022.</em>
          </h1>
        </section>
        <form action={lockAlbum}>
          <button type="submit">Lock album</button>
        </form>
      </div>
      <PhotoGallery photos={photos} />
    </>
  );
}
