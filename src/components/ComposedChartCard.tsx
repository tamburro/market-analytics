'use client';

import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface Props {
  title: string;
  data: Record<string, string | number>[];
  areaKey: string;
  areaName: string;
  barKey: string;
  barName: string;
  areaColor?: string;
  barColor?: string;
}

export default function ComposedChartCard({
  title,
  data,
  areaKey,
  areaName,
  barKey,
  barName,
  areaColor = '#fcd535',
  barColor = '#0ecb81',
}: Props) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              tickFormatter={(v) => String(v).slice(5)}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              width={55}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              width={45}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey={areaKey}
              name={areaName}
              stroke={areaColor}
              fill={areaColor}
              fillOpacity={0.15}
              strokeWidth={2}
              dot={false}
            />
            <Bar
              yAxisId="right"
              dataKey={barKey}
              name={barName}
              fill={barColor}
              fillOpacity={0.7}
              radius={[3, 3, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
