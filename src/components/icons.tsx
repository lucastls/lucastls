export function Arrow({
  direction = "right",
  className = "",
}: {
  direction?: "right" | "up-right" | "down" | "up";
  className?: string;
}) {
  const rotation = { right: 0, "up-right": -45, down: 90, up: -90 }[direction];
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function GridIcon({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
    >
      {(compact ? [2, 8, 14] : [2, 11]).flatMap((x) =>
        [2, 11].map((y) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={compact ? 4 : 7}
            height="7"
            fill="currentColor"
          />
        )),
      )}
    </svg>
  );
}
