export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="rounded-3xl border border-[var(--yieldlens-border)] bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-3">
          Checking access
        </p>

        <h1 className="text-3xl font-bold text-stone-950 mb-4">
          Loading your viability file.
        </h1>

        <p className="text-sm text-[var(--yieldlens-muted)] leading-7 max-w-2xl">
          We are checking access and preparing the memo. If you have just
          completed checkout, this can take a few seconds.
        </p>
      </div>
    </div>
  );
}
