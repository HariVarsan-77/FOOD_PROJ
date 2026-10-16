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
      {heights.map((height, index) => (
        <rect
          key={index}
          x={index * (barWidth + gap)}
          y={52 - height}
          width={barWidth}
          height={height}
          rx={4}
          fill={index === highestIndex ? "#C1440E" : "#EDC884"}
        />
      ))}
      {variant === "delivery" ? (
        <line
          x1={0}
          y1={24}
          x2={width}
          y2={24}
          stroke="#171008"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
      ) : null}
    </svg>
  );
}
