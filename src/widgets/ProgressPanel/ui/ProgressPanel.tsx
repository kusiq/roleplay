import { useActivistStore } from "@entities/activist";
import { formatNumber } from "@shared/lib";
import { ProgressBar } from "@shared/ui/ProgressBar";

interface ProgressPanelProps {
  progress: number;
}

export function ProgressPanel({ progress }: ProgressPanelProps) {
  const activist = useActivistStore((state) => state.activist);

  return (
    <section className="panel progress-panel" aria-labelledby="progress-title">
      <div>
        <span className="level-caption">Уровень {activist.level}</span>
        <h1 id="progress-title">{activist.title}</h1>
        <p>
          До следующего звания осталось {activist.nextLevelXp - activist.xp} XP.
          Самый быстрый путь сейчас — участие и подтверждённые инициативы.
        </p>
      </div>

      <div className="wide-progress">
        <ProgressBar value={progress} />
        <span>
          {formatNumber(activist.xp)} / {formatNumber(activist.nextLevelXp)} XP
          до уровня {activist.level + 1}
        </span>
      </div>
    </section>
  );
}
