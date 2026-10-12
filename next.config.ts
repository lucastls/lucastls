import type { NextConfig } from "next";

const config: NextConfig = {
  devIndicators: false,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  async redirects() {
    return [
      {
        source: "/old_photography",
        destination: "/photography",
        permanent: true,
      },
      { source: "/art", destination: "/photography", permanent: true },
    ];
  },
};

export default config;
