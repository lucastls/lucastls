import "server-only";
import { cache } from "react";
import snapshot from "@/data/photos.json";
import { categories, type Category, type Photo } from "./photo";

const publicPhotos = snapshot as Photo[];

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  context?: { custom?: { caption?: string; alt?: string; category?: string } };
};

export const getPhotos = cache(
  async (folder: "photo" | "natal2022" = "photo"): Promise<Photo[]> => {
    const {
      CLOUDINARY_CLOUD_NAME: cloud,
      CLOUDINARY_API_KEY: key,
      CLOUDINARY_API_SECRET: secret,
    } = process.env;
    if (!cloud || !key || !secret)
      return folder === "photo" ? publicPhotos : [];

    try {
      const resources: CloudinaryResource[] = [];
      let cursor: string | undefined;
      do {
        const query = new URLSearchParams({
          prefix: `${folder}/`,
          max_results: "500",
          context: "true",
        });
        if (cursor) query.set("next_cursor", cursor);
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloud)}/resources/image/upload?${query}`,
          {
            headers: {
              Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}`,
            },
            ...(folder === "photo"
              ? { next: { revalidate: 3600 } }
              : { cache: "no-store" as const }),
            signal: AbortSignal.timeout(10000),
          },
        );
        if (!response.ok)
          throw new Error(`Cloudinary returned ${response.status}`);
        const result = (await response.json()) as {
          resources: CloudinaryResource[];
          next_cursor?: string;
        };
        resources.push(...result.resources);
        cursor = result.next_cursor;
      } while (cursor);

      return resources
        .filter(
          (photo) =>
            photo.public_id.slice(0, photo.public_id.lastIndexOf("/")) ===
              folder &&
            ["jpg", "jpeg", "webp", "png", "avif"].includes(photo.format),
        )
        .sort((a, b) =>
          folder === "photo"
            ? b.public_id.localeCompare(a.public_id)
            : a.public_id.localeCompare(b.public_id),
        )
        .map((photo, index) => {
          const id = photo.public_id.split("/").pop()!;
          const existing =
            folder === "photo"
              ? publicPhotos.find((item) => item.id === id)
              : undefined;
          const custom = photo.context?.custom;
          const category = categories.includes(custom?.category as Category)
            ? (custom?.category as Category)
            : existing?.category;
          return {
            id,
            src: photo.secure_url,
            width: photo.width,
            height: photo.height,
            title:
              custom?.caption ||
              existing?.title ||
              `Photograph ${String(index + 1).padStart(2, "0")}`,
            alt:
              custom?.alt ||
              existing?.alt ||
              custom?.caption ||
              `Photograph ${index + 1} by Lucas Teodoro`,
            ...(category ? { category } : {}),
            ...(existing?.blurDataURL
              ? { blurDataURL: existing.blurDataURL }
              : {}),
          };
        });
    } catch {
      // Never log the authenticated request or return private photographs as a fallback.
      console.error(
        `Unable to load the ${folder === "photo" ? "public" : "private"} gallery from Cloudinary.`,
      );
      if (folder === "photo") return publicPhotos;
      throw new Error(
        "The album could not be loaded. Please try again shortly.",
      );
    }
  },
);

export function selectPhotographs(photos: Photo[]) {
  const ids = ["DSCF6042", "DSCF5014-Enhanced-NR", "DSCF6489", "DSCF6420-Edit"];
  const selected = ids.flatMap(
    (id) => photos.find((photo) => photo.id === id) ?? [],
  );
  return [
    ...selected,
    ...photos.filter((photo) => !selected.includes(photo)),
  ].slice(0, 4);
}
