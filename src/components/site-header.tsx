"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Arrow } from "./icons";
import { site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header" id="top">
      <Link className="wordmark" href="/" aria-label="Lucas Teodoro — home">
        lucas teodoro<span className="wordmark-dot">.</span>
      </Link>
      <span className="header-note">A photographic journal</span>
      <nav aria-label="Main navigation">
        <Link
          href="/photography"
          aria-current={pathname === "/photography" ? "page" : undefined}
        >
          Photographs
        </Link>
        <Link
          href="/about"
          aria-current={pathname === "/about" ? "page" : undefined}
        >
          About
        </Link>
        {site.email && (
          <a className="contact-link" href={`mailto:${site.email}`}>
            Get in touch <Arrow direction="up-right" />
          </a>
        )}
      </nav>
    </header>
  );
}
