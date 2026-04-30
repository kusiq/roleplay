import { useActivistStore } from "@entities/activist";

export function ActivityTimeline() {
  const activities = useActivistStore((state) => state.activities);
  return (
    <section className="panel activity-panel" aria-labelledby="activity-title">
      <div className="section-heading">
        <h2 id="activity-title">Последняя активность</h2>
        <span>Апрель</span>
      </div>

      <div className="timeline">
        {activities.map((activity) => (
          <article className="timeline-item" key={activity.title}>
            <span className={`timeline-dot tone-${activity.tone}`} />
            <div>
              <h3>{activity.title}</h3>
              <p>{activity.meta}</p>
            </div>
            <strong>{activity.xp}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
