import Link from "next/link";
import { Arrow } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="message-page">
      <p className="eyebrow">404 / Out of frame</p>
      <h1>
        A little <em>off the path.</em>
      </h1>
      <p>
        The page you’re looking for isn’t here. There are still plenty of
        photographs to explore.
      </p>
      <Link className="text-link" href="/photography">
        Back to the collection <Arrow />
      </Link>
    </section>
  );
}
