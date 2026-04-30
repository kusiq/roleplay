import { useActivistStore } from "@entities/activist";
import { Icon } from "@shared/ui/Icon";
import { AchievementCard } from "@widgets/AchievementCard";

export function AchievementsView() {
  const achievements = useActivistStore((state) => state.achievements);
  const groups = [
    {
      title: "Достигнутые",
      items: achievements.filter(
        (achievement) => achievement.group === "completed"
      ),
    },
    {
      title: "Активные",
      items: achievements.filter(
        (achievement) => achievement.group === "active"
      ),
    },
    {
      title: "Недоступные",
      items: achievements.filter(
        (achievement) => achievement.group === "locked"
      ),
    },
  ];

  return (
    <section className="content-page" aria-labelledby="achievements-page-title">
      <div className="page-heading">
        <div>
          <span className="level-caption">Награды и звания</span>
          <h1 id="achievements-page-title">Достижения</h1>
        </div>
        <Icon name="award" />
      </div>

      <div className="achievement-sections">
        {groups.map((group) => (
          <section className="panel achievement-section" key={group.title}>
            <div className="section-heading">
              <h2>{group.title}</h2>
              <span>{group.items.length}</span>
            </div>
            <div className="achievement-grid page-grid">
              {group.items.map((achievement) => (
                <AchievementCard
                  achievement={achievement}
                  key={achievement.id}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
