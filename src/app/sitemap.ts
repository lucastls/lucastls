import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/photography", "/about"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path ? 0.8 : 1,
  }));
}
