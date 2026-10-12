import Link from "next/link";
import { Arrow } from "./icons";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-identity">
        <Link className="wordmark" href="/">
          lucas teodoro<span className="wordmark-dot">.</span>
        </Link>
        <p>Looking a little closer.</p>
      </div>
      <div className="footer-links">
        {site.instagram && (
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram <Arrow direction="up-right" />
          </a>
        )}
        {site.email && (
          <a href={`mailto:${site.email}`}>
            Email <Arrow direction="up-right" />
          </a>
        )}
        <a href="#top">
          Back to top <Arrow direction="up" />
        </a>
      </div>
      <p className="copyright">© {new Date().getFullYear()} Lucas Teodoro</p>
      <span className="footer-signoff">Made to be seen slowly.</span>
    </footer>
  );
}
