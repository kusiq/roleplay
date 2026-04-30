import { useActivistStore } from "@entities/activist";
import { formatNumber } from "@shared/lib";
import { Icon } from "@shared/ui/Icon";

export function LeaderboardView() {
  const leaderboard = useActivistStore((state) => state.leaderboard);
  return (
    <section className="content-page" aria-labelledby="leaderboard-page-title">
      <div className="page-heading">
        <div>
          <span className="level-caption">Московский штаб · ЦАО</span>
          <h1 id="leaderboard-page-title">Лидерборд штаба</h1>
        </div>
        <Icon name="leaderboard" />
      </div>

      <section className="panel leaderboard-wide">
        <div className="leader-list wide">
          {leaderboard.map((leader) => (
            <article
              className={leader.current ? "leader-row current" : "leader-row"}
              key={leader.place}
            >
              <strong>{leader.place}</strong>
              <span className="leader-avatar">{leader.name.slice(0, 1)}</span>
              <span>{leader.name}</span>
              <b>{formatNumber(leader.points)} XP</b>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
