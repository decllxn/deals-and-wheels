export default function GlassPanel({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_var(--shadow-color)] ${className}`}
    >
      {children}
    </div>
  );
}