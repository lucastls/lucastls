import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import "./globals.css";

const workSans = localFont({
  src: "../../public/fonts/WorkSans-VariableFont_wght.ttf",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Lucas Teodoro — Photography",
    template: "%s — Lucas Teodoro",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    description: site.description,
    images: [
      {
        url: "https://res.cloudinary.com/di59emuos/image/upload/f_jpg,q_85,w_1200,h_630,c_fill/v1747670417/photo/DSCF0818-RAF_DxO_DeepPRIMEXD.jpg",
        width: 1200,
        height: 630,
        alt: "A white tower on a rocky shoreline — photography by Lucas Teodoro",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#f6f5f0" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={workSans.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="site-shell">
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
