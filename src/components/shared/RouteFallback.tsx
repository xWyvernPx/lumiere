type Props = {
  /** Fill the whole viewport (for top-level route chunks) rather than the content area. */
  fullScreen?: boolean;
};

/**
 * Suspense fallback shown while a lazily-loaded route chunk is fetched.
 * Mirrors the spinner used by ProtectedRoute for visual consistency.
 */
export function RouteFallback({ fullScreen = false }: Props) {
  return (
    <div
      className={`flex w-full items-center justify-center ${
        fullScreen ? "h-screen" : "h-full py-20"
      }`}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary)] border-t-transparent" />
    </div>
  );
}
