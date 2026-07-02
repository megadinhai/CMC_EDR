import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatNumber } from "@/lib/formatters";
import { BAR_TRACK_COLOR, PRIMARY_BLUE } from "@/lib/colors";

export interface HorizontalBarDatum {
  name: string;
  value: number;
}

interface BarChartHorizontalProps {
  data: HorizontalBarDatum[];
}

const MAX_LABEL_CHARS = 16;

function truncateLabel(name: string): string {
  return name.length > MAX_LABEL_CHARS ? `${name.slice(0, MAX_LABEL_CHARS - 1)}…` : name;
}

function CategoryTick({ x, y, payload }: any) {
  return (
    <text x={x} y={y} dy={4} textAnchor="end" fill="rgba(255,255,255,0.8)" fontSize={12}>
      <title>{payload.value}</title>
      {truncateLabel(payload.value)}
    </text>
  );
}

export function BarChartHorizontal({ data }: BarChartHorizontalProps) {
  const rowHeight = 28;
  const height = Math.max(120, data.length * rowHeight);

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 36, bottom: 0, left: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            width={128}
            tick={<CategoryTick />}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            formatter={(value: number) => formatNumber(value)}
            contentStyle={{
              background: "#08101d",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Bar
            dataKey="value"
            radius={3}
            barSize={12}
            background={{ fill: BAR_TRACK_COLOR, radius: 3 }}
            fill={PRIMARY_BLUE}
          >
            <LabelList
              dataKey="value"
              position="right"
              formatter={formatNumber}
              fill="rgba(255,255,255,0.8)"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
