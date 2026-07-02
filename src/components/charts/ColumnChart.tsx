import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatBucketLabel } from "@/lib/time";
import { formatNumber } from "@/lib/formatters";
import { PRIMARY_BLUE } from "@/lib/colors";
import type { TimeSeriesPoint, TimeUnit } from "@/types";

interface ColumnChartProps {
  data: TimeSeriesPoint[];
  unit: TimeUnit;
}

export function ColumnChart({ data, unit }: ColumnChartProps) {
  const chartData = data.map((point) => ({
    ...point,
    label: formatBucketLabel(point.timestamp, unit),
  }));

  return (
    <div className="w-full" style={{ height: 220 }}>
      <ResponsiveContainer width="100%" height="100%" debounce={0}>
        <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="label"
            tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 12 }}
            axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatNumber}
            width={40}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            formatter={(value: number) => formatNumber(value)}
            labelFormatter={(label: string) => label}
            contentStyle={{
              background: "#08101d",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Bar dataKey="count" fill={PRIMARY_BLUE} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
