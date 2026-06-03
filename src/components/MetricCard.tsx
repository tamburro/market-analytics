interface Props {
  label: string;
  value: string;
  change?: number;
  icon?: string;
}

export default function MetricCard({ label, value, change, icon }: Props) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <span className="text-xl font-bold tabular-nums font-mono text-foreground">{value}</span>
      {change !== undefined && (
        <span
          className="text-xs tabular-nums font-mono font-medium"
          style={{ color: change >= 0 ? 'var(--green)' : 'var(--red)' }}
        >
          {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
        </span>
      )}
    </div>
  );
}
