"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="message-page">
      <p className="eyebrow">A brief pause</p>
      <h1>
        Let’s try <em>that again.</em>
      </h1>
      <p>Something interrupted this page. Please give it another try.</p>
      <button className="solid-button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
