import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatBucketLabel } from "@/lib/time";
import { formatNumber } from "@/lib/formatters";
import type { TimeUnit } from "@/types";

export interface LineSeriesConfig {
  key: string;
  label: string;
  color: string;
}

interface LineChartMultiProps {
  data: Array<Record<string, number | string>>;
  timestampKey: string;
  unit: TimeUnit;
  series: LineSeriesConfig[];
}

export function LineChartMulti({
  data,
  timestampKey,
  unit,
  series,
}: LineChartMultiProps) {
  const chartData = data.map((point) => ({
    ...point,
    label: formatBucketLabel(String(point[timestampKey]), unit),
  }));

  return (
    <div className="w-full" style={{ height: 240 }}>
      <ResponsiveContainer width="100%" height="100%" debounce={0}>
        <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
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
            formatter={(value: number) => formatNumber(value)}
            contentStyle={{
              background: "#08101d",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
