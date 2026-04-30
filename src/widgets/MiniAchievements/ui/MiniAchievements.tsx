import { useActivistStore } from "@entities/activist";
import { Icon } from "@shared/ui/Icon";
import { AchievementCard } from "@widgets/AchievementCard";

export function MiniAchievements() {
  const achievements = useActivistStore((state) => state.achievements);
  return (
    <section
      className="panel achievements-panel"
      aria-labelledby="mini-achievements-title"
    >
      <div className="section-heading">
        <h2 id="mini-achievements-title">Ближайшие награды</h2>
        <Icon name="award" />
      </div>
      <div className="achievement-grid compact">
        {achievements.slice(0, 4).map((achievement) => (
          <AchievementCard achievement={achievement} key={achievement.id} />
        ))}
      </div>
    </section>
  );
}
