'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Series {
  key: string;
  name: string;
  color: string;
}

interface Props {
  title: string;
  data: Record<string, string | number>[];
  series: Series[];
  unit?: string;
}

export default function LineChartCard({ title, data, series, unit = '' }: Props) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              tickFormatter={(v) => String(v).slice(5)}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              tickFormatter={(v) => `${v}${unit}`}
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(value, name) => [`${Number(value).toFixed(2)}${unit}`, name]}
            />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
            />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
