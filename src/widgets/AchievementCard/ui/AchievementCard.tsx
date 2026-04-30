import type { Achievement } from "@entities/activist";
import { Icon } from "@shared/ui/Icon";
import { ProgressBar } from "@shared/ui/ProgressBar";

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const isLocked = achievement.group === "locked";
  const progress =
    achievement.status === "Достигнуто" ? 100 : achievement.progress;

  return (
    <article
      className={isLocked ? "achievement-card locked" : "achievement-card"}
    >
      <div className="medal-icon" aria-hidden="true">
        <Icon name="award" />
      </div>
      <strong>{achievement.title}</strong>
      <small>{achievement.caption}</small>
      <span>{achievement.status}</span>
      <ProgressBar value={progress} />
    </article>
  );
}
