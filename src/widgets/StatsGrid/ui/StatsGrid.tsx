import { useActivistStore } from "@entities/activist";

export function StatsGrid() {
  const stats = useActivistStore((state) => state.stats);
  return (
    <section className="stats-grid" aria-label="Ключевые показатели">
      {stats.map((stat) => (
        <article
          className={`panel stat-card tone-${stat.tone}`}
          key={stat.label}
        >
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
          <small>{stat.note}</small>
        </article>
      ))}
    </section>
  );
}
