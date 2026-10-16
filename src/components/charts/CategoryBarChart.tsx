"use client";

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

/* Chart colours, kept in the same orange + black palette as the rest of the site. */
const GRID_COLOR = "#D9B264";
const AXIS_TEXT_COLOR = "#4A3B2C";
const INK_COLOR = "#171008";

/**
 * The one bar chart used by all four analyses.
 *
 * Every analysis page feeds it prepared data, so the chart style - colours,
 * grid, tooltip, labels and the optional average line - stays identical
 * everywhere and only the numbers change.
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
  height = 400,
}: CategoryBarChartProps) {
  const labelFormatter = formatLabel ?? formatValue;

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 28, right: 16, bottom: 64, left: 8 }}>
          <CartesianGrid stroke={GRID_COLOR} strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-25}
            textAnchor="end"
            height={64}
            tick={{ fontSize: 12, fill: AXIS_TEXT_COLOR }}
            tickLine={false}
            axisLine={{ stroke: GRID_COLOR }}
          />
          <YAxis
            width={80}
            domain={valueDomain ?? [0, "auto"]}
            tickFormatter={(value: unknown) => formatValue(Number(value))}
            tick={{ fontSize: 12, fill: AXIS_TEXT_COLOR }}
            tickLine={false}
            axisLine={false}
            label={{
              value: valueAxisLabel,
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 12, fill: AXIS_TEXT_COLOR, textAnchor: "middle" },
            }}
          />
          <Tooltip
            cursor={{ fill: "#EDC884", fillOpacity: 0.45 }}
            formatter={(value: unknown) => [formatValue(Number(value)), valueLabel]}
            contentStyle={{
              borderRadius: 16,
              border: `1px solid ${GRID_COLOR}`,
              backgroundColor: "#FDF4DE",
              color: INK_COLOR,
              fontSize: 12,
            }}
          />
          {referenceValue !== undefined ? (
            <ReferenceLine
              y={referenceValue}
              stroke={INK_COLOR}
              strokeDasharray="6 4"
              label={{
                value: referenceLabel ?? "",
                position: "insideTopRight",
                style: { fontSize: 11, fill: INK_COLOR, fontWeight: 700 },
              }}
            />
          ) : null}
          <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={72}>
            <LabelList
              dataKey="value"
              position="top"
              formatter={(value: unknown) => labelFormatter(Number(value))}
              style={{ fontSize: 11, fill: INK_COLOR, fontWeight: 700 }}
            />
            {data.map((point) => (
              <Cell key={point.name} fill={point.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
