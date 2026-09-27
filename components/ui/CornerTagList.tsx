export function CornerTagList({
  lines,
  inverse = true,
  className = "",
}: {
  lines?: readonly string[];
  inverse?: boolean;
  className?: string;
}) {
  if (!lines || lines.length === 0) return null;

  return (
    <div
      className={`text-[11px] uppercase leading-relaxed tracking-label ${
        inverse ? "text-cream-50/80" : "text-brown-500"
      } ${className}`.trim()}
    >
      {lines.map((line) => (
        <p key={line} className="whitespace-nowrap">
          {line}
        </p>
      ))}
    </div>
  );
}
