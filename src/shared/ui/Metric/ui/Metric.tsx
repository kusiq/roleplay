import type { Tone } from "@shared/types";

interface MetricProps {
  label: string;
  tone: Tone;
  value: string;
}

export function Metric({ label, tone, value }: MetricProps) {
  return (
    <div className={`metric tone-${tone}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
