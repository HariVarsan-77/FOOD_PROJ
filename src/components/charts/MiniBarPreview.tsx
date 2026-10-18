/**
 * Tiny SVG previews of the chart shape each analysis uses, shown on the home
 * page cards so a visitor can see what to expect before opening a page.
 */

/** The four chart shapes shown on the home page cards. */
export type PreviewVariant = "revenue" | "popularity" | "delivery" | "satisfaction";

const BAR_HEIGHTS: Record<PreviewVariant, number[]> = {
  revenue: [26, 44, 18, 32, 12],
  popularity: [46, 20, 30, 14, 24],
  delivery: [16, 28, 22, 46, 34],
  satisfaction: [40, 26],
};

export function MiniBarPreview({
  variant,
  className = "",
}: {
  variant: PreviewVariant;
  className?: string;
}) {
  const heights = BAR_HEIGHTS[variant];
  const barWidth = 10;
  const gap = 6;
  const width = heights.length * barWidth + (heights.length - 1) * gap;
  const highestIndex = heights.indexOf(Math.max(...heights));

  return (
    <svg
      viewBox={`0 0 ${width} 52`}
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`mini-primary-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff8c3a" />
          <stop offset="60%" stopColor="#e85d04" />
          <stop offset="100%" stopColor="#b33e00" />
        </linearGradient>
        <linearGradient id={`mini-muted-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f5dfaa" />
          <stop offset="60%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#a3780a" />
        </linearGradient>
      </defs>
      {heights.map((height, index) => {
        const isHighest = index === highestIndex;
        return (
          <g key={index}>
            <rect
              x={index * (barWidth + gap)}
              y={52 - height}
              width={barWidth}
              height={height}
              rx={3.5}
              fill={isHighest ? `url(#mini-primary-${variant})` : `url(#mini-muted-${variant})`}
              stroke="rgba(0, 0, 0, 0.25)"
              strokeWidth={0.5}
            />
            {/* Specular cap on top of bar for 2.5D shine */}
            <line
              x1={index * (barWidth + gap) + 1.5}
              y1={52 - height + 1}
              x2={index * (barWidth + gap) + barWidth - 1.5}
              y2={52 - height + 1}
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth={1}
              strokeLinecap="round"
            />
          </g>
        );
      })}
      {variant === "delivery" ? (
        <line
          x1={0}
          y1={24}
          x2={width}
          y2={24}
          stroke="#f0c842"
          strokeWidth={1.5}
          strokeDasharray="3 2"
        />
      ) : null}
    </svg>
  );
}
