export function Section({ id, className = "", children }:
  { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-5xl px-6 py-20 sm:px-8 md:px-10 ${className}`}>
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </section>
  );
}
