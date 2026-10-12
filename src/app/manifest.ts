import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lucas Teodoro — Photography",
    short_name: "Lucas Teodoro",
    description: "A photographic journal by Lucas Teodoro.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f5f0",
    theme_color: "#f6f5f0",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
