"use client";

import { useId } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";

/** One bar: its label, its value and the colour to draw it with. */
export interface BarChartPoint {
  name: string;
  value: number;
  color: string;
}

export interface CategoryBarChartProps {
  data: BarChartPoint[];
  /** Name of the value, used in the tooltip, e.g. "Revenue". */
  valueLabel: string;
  /** Formats the numbers shown in the tooltip and on the axis. */
  formatValue: (value: number) => string;
  /** Optional shorter format for the label drawn above each bar. */
  formatLabel?: (value: number) => string;
  /** Caption of the vertical axis, e.g. "Revenue (INR)". */
  valueAxisLabel: string;
  /** Dashed horizontal line, e.g. the overall average delivery time. */
  referenceValue?: number;
  referenceLabel?: string;
  /** Fixed vertical axis range, e.g. [0, 5] to show a rating scale clearly. */
  valueDomain?: [number, number];
  height?: number;
}

/* Refined chart tokens */
const GRID_COLOR = "rgba(212, 160, 23, 0.22)";
const AXIS_TEXT_COLOR = "#5a4020";
const INK_COLOR = "#0d0a06";

/**
 * Adjusts hex color lightness to create a rich 2.5D specular highlight and drop shadow.
 */
function adjustColor(hex: string, percent: number): string {
  const cleanHex = hex.replace("#", "");
  const num = parseInt(cleanHex.length === 3 ? cleanHex.split("").map((c) => c + c).join("") : cleanHex, 16);
  let r = (num >> 16) + Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00ff) + Math.round(255 * (percent / 100));
  let b = (num & 0x0000ff) + Math.round(255 * (percent / 100));
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

interface CustomChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value?: number | string;
    payload?: BarChartPoint;
  }>;
  label?: string | number;
  valueLabel: string;
  formatValue: (value: number) => string;
}

/**
 * Premium 2.5D Floating Tooltip with backdrop blur, depth elevation,
 * and high-contrast typography.
 */
function CustomChartTooltip({
  active,
  payload,
  label,
  valueLabel,
  formatValue,
}: CustomChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const current = payload[0];
  const value = Number(current.value);
  const color = current.payload?.color || "#e85d04";

  return (
    <div
      className="relative z-50 min-w-[170px] rounded-2xl p-3.5 text-xs transition-all duration-150"
      style={{
        background: "linear-gradient(145deg, #1f150b 0%, #100b05 100%)",
        border: "1.5px solid rgba(212, 160, 23, 0.50)",
        boxShadow:
          "0 8px 24px -4px rgba(0, 0, 0, 0.65), 0 2px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(240, 200, 66, 0.25)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
        <p className="font-display text-sm font-bold text-ivory tracking-wide">
          {label}
        </p>
      </div>

      <div className="mt-2.5 border-t border-peach-deep/30 pt-2">
        <p className="text-[11px] font-semibold text-gold-soft uppercase tracking-wider">
          {valueLabel}
        </p>
        <p className="mt-0.5 font-display text-lg font-extrabold text-[#f0c842]">
          {formatValue(value)}
        </p>
      </div>
    </div>
  );
}

/**
 * 2.5D Dimensional Bar Chart.
 *
 * Implements cylindrical SVG linear gradients, a recessed plotting bed,
 * layered ambient elevation, smooth entrance reveals, and custom floating tooltips.
 */
export function CategoryBarChart({
  data,
  valueLabel,
  formatValue,
  formatLabel,
  valueAxisLabel,
  referenceValue,
  referenceLabel,
  valueDomain,
  height = 420,
}: CategoryBarChartProps) {
  const chartId = useId().replace(/:/g, "_");
  const labelFormatter = formatLabel ?? formatValue;

  return (
    <div
      className="relative w-full rounded-3xl p-3 sm:p-5 transition-all duration-300"
      style={{
        background: "linear-gradient(165deg, #ffffff 0%, #fffcf5 55%, #fef3dc 100%)",
        border: "1.5px solid rgba(212, 160, 23, 0.35)",
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 1), 0 4px 12px -2px rgba(13, 10, 6, 0.05), 0 18px 36px -10px rgba(13, 10, 6, 0.08)",
      }}
    >
      {/* Visual stage header with subtle depth badge */}
      <div className="mb-2 flex items-center justify-between px-2 text-xs text-brown-soft">
        <span className="inline-flex items-center gap-1.5 font-bold tracking-wider uppercase text-[11px] text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" />
          Interactive Visualization
        </span>
        <span className="text-[11px] font-semibold opacity-75">
          {data.length} categories plotted
        </span>
      </div>

      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 32, right: 20, bottom: 64, left: 10 }}>
            {/* SVG Defs for 2.5D Cylindrical Gradients */}
            <defs>
              {data.map((point, index) => {
                const gradId = `bar-25d-${chartId}-${index}`;
                const highlight = adjustColor(point.color, 24);
                const shadow = adjustColor(point.color, -28);

                return (
                  <linearGradient
                    key={gradId}
                    id={gradId}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor={highlight} stopOpacity={1} />
                    <stop offset="35%" stopColor={point.color} stopOpacity={1} />
                    <stop offset="85%" stopColor={point.color} stopOpacity={1} />
                    <stop offset="100%" stopColor={shadow} stopOpacity={1} />
                  </linearGradient>
                );
              })}
            </defs>

            <CartesianGrid
              stroke={GRID_COLOR}
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              interval={0}
              angle={-24}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12, fill: AXIS_TEXT_COLOR, fontWeight: 700 }}
              tickLine={false}
              axisLine={{ stroke: "rgba(212, 160, 23, 0.45)", strokeWidth: 1.5 }}
            />

            <YAxis
              width={82}
              domain={valueDomain ?? [0, "auto"]}
              tickFormatter={(value: unknown) => formatValue(Number(value))}
              tick={{ fontSize: 11, fill: AXIS_TEXT_COLOR, fontWeight: 600 }}
              tickLine={false}
              axisLine={false}
              label={{
                value: valueAxisLabel,
                angle: -90,
                position: "insideLeft",
                style: {
                  fontSize: 12,
                  fill: AXIS_TEXT_COLOR,
                  textAnchor: "middle",
                  fontWeight: 700,
                },
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(212, 160, 23, 0.14)",
                radius: 12,
              }}
              content={
                <CustomChartTooltip
                  valueLabel={valueLabel}
                  formatValue={formatValue}
                />
              }
            />

            {referenceValue !== undefined ? (
              <ReferenceLine
                y={referenceValue}
                stroke="#c44b02"
                strokeWidth={2}
                strokeDasharray="6 4"
                label={{
                  value: referenceLabel ?? "",
                  position: "insideTopRight",
                  style: {
                    fontSize: 11,
                    fill: "#c44b02",
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                  },
                }}
              />
            ) : null}

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
              maxBarSize={68}
              animationDuration={1100}
              animationEasing="ease-out"
            >
              <LabelList
                dataKey="value"
                position="top"
                formatter={(value: unknown) => labelFormatter(Number(value))}
                style={{
                  fontSize: 11,
                  fill: INK_COLOR,
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                }}
              />
              {data.map((point, index) => (
                <Cell
                  key={point.name}
                  fill={`url(#bar-25d-${chartId}-${index})`}
                  stroke="rgba(13, 10, 6, 0.15)"
                  strokeWidth={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
