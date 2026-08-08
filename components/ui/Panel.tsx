/** Hairline rule plus corner ticks — the Blueprint stand-in for a card border. */
export function Panel({ className = "", children }:
  { className?: string; children: React.ReactNode }) {
  return (
    <div className={`tick relative border border-rule bg-surface p-5 ${className}`}>
      {children}
    </div>
  );
}
