export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <rect width="16" height="16" fill="currentColor" />
      <rect x="4" y="4" width="8" height="8" fill="#fff" />
      <rect x="6.5" y="6.5" width="3" height="3" fill="currentColor" />
    </svg>
  );
}
