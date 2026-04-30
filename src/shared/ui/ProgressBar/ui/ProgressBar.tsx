import type { CSSProperties } from "react";

export function ProgressBar({ value }: { value: number }) {
  return (
    <div
      aria-label={`Прогресс ${value}%`}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={value}
      className="progress-bar"
      role="progressbar"
    >
      <span style={{ "--progress": `${value}%` } as CSSProperties} />
    </div>
  );
}
