import type { CSSProperties, FormEvent } from "react";
import { useEffect, useState } from "react";
import { achievements, activities, activist, goals, leaderboard, stats } from "./profileData";

type ThemeMode = "light" | "dark";
type Tone = "green" | "red" | "blue";

function App() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [selectedAchievementId, setSelectedAchievementId] = useState<string>(achievements[0].id);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <main className="app-shell">
      {isSignedIn ? (
        <Dashboard
          selectedAchievementId={selectedAchievementId}
          theme={theme}
          onSelectAchievement={setSelectedAchievementId}
          onSignOut={() => setIsSignedIn(false)}
          onToggleTheme={toggleTheme}
        />
      ) : (
        <LoginScreen
          onLogin={() => setIsSignedIn(true)}
          onToggleTheme={toggleTheme}
          theme={theme}
        />
      )}
    </main>
  );
}

function LoginScreen({
  onLogin,
  onToggleTheme,
  theme,
}: {
  onLogin: () => void;
  onToggleTheme: () => void;
  theme: ThemeMode;
}) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <section className="login-screen" aria-label="Вход в профиль активиста">
      <div className="login-card">
        <div className="brand-row">
          <BrandMark />
          <button className="theme-button compact" type="button" onClick={onToggleTheme}>
            {theme === "light" ? "Тёмная" : "Светлая"}
          </button>
        </div>

        <div className="login-heading">
          <p className="eyebrow">Молодая Гвардия</p>
          <h1>Вход в профиль активиста</h1>
          <p>Личный кабинет для участия, опыта и достижений штаба.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Телефон или email</span>
            <input
              autoComplete="email"
              defaultValue="alexey@example.ru"
              name="email"
              type="email"
            />
          </label>
          <label>
            <span>Пароль</span>
            <input
              autoComplete="current-password"
              defaultValue="demo2026"
              name="password"
              type="password"
            />
          </label>
          <button className="primary-button" type="submit">
            Войти в профиль
          </button>
        </form>
      </div>
    </section>
  );
}

function Dashboard({
  onSignOut,
  onToggleTheme,
  onSelectAchievement,
  selectedAchievementId,
  theme,
}: {
  onSignOut: () => void;
  onToggleTheme: () => void;
  onSelectAchievement: (id: string) => void;
  selectedAchievementId: string;
  theme: ThemeMode;
}) {
  const xpProgress = Math.round((activist.xp / activist.nextLevelXp) * 100);

  return (
    <section className="dashboard" aria-label="Профиль активиста">
      <AppHeader onSignOut={onSignOut} onToggleTheme={onToggleTheme} theme={theme} />

      <div className="dashboard-grid">
        <aside className="profile-column">
          <ProfileCard />
          <WeeklyGoals />
        </aside>

        <section className="main-column">
          <ProgressPanel progress={xpProgress} />
          <StatsGrid />
          <ActivityTimeline />
          <NextCheckIn />
        </section>

        <aside className="side-column">
          <AchievementList
            onSelect={onSelectAchievement}
            selectedAchievementId={selectedAchievementId}
          />
          <Leaderboard />
        </aside>
      </div>
    </section>
  );
}

function AppHeader({
  onSignOut,
  onToggleTheme,
  theme,
}: {
  onSignOut: () => void;
  onToggleTheme: () => void;
  theme: ThemeMode;
}) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <BrandMark />
        <div>
          <strong>Профиль активиста</strong>
          <span>личный кабинет штаба</span>
        </div>
      </div>

      <nav className="top-nav" aria-label="Разделы">
        <button className="nav-pill active" type="button">
          <span />
          Профиль
        </button>
        <button className="nav-pill" type="button">
          <span />
          События
        </button>
        <button className="nav-pill" type="button">
          <span />
          Рейтинг
        </button>
      </nav>

      <div className="header-actions">
        <button className="theme-button" type="button" onClick={onToggleTheme}>
          {theme === "light" ? "Тёмная" : "Светлая"}
        </button>
        <button className="ghost-button" type="button" onClick={onSignOut}>
          Выйти
        </button>
      </div>
    </header>
  );
}

function BrandMark() {
  return <div className="brand-mark">МГ</div>;
}

function ProfileCard() {
  return (
    <article className="panel profile-card">
      <div className="profile-ribbon" />
      <div className="avatar-row">
        <div className="avatar">{activist.initials}</div>
        <span className="rank-pill">{activist.rank}</span>
      </div>

      <div className="profile-copy">
        <h2>{activist.name}</h2>
        <p>{activist.team}</p>
      </div>

      <dl className="profile-meta">
        <div>
          <dt>Руководитель</dt>
          <dd>{activist.supervisor}</dd>
        </div>
      </dl>

      <div className="profile-split">
        <Metric value={activist.streak.toString()} label="дней активности" tone="green" />
        <Metric value={`#${activist.rating}`} label="в штабе" tone="red" />
      </div>
    </article>
  );
}

function Metric({ label, tone, value }: { label: string; tone: Tone; value: string }) {
  return (
    <div className={`metric tone-${tone}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function WeeklyGoals() {
  return (
    <section className="panel weekly-goals" aria-labelledby="weekly-goals-title">
      <div className="section-heading">
        <h2 id="weekly-goals-title">Цели недели</h2>
      </div>

      <div className="goal-list">
        {goals.map((goal, index) => (
          <article className="goal-item" key={goal.title}>
            <div className="goal-index">{index + 1}</div>
            <div>
              <div className="goal-title-row">
                <h3>{goal.title}</h3>
                <span>{goal.status}</span>
              </div>
              <ProgressBar value={goal.progress} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProgressPanel({ progress }: { progress: number }) {
  return (
    <section className="panel progress-panel" aria-labelledby="progress-title">
      <div>
        <span className="level-caption">Уровень {activist.level}</span>
        <h1 id="progress-title">{activist.title}</h1>
        <p>
          До следующего звания осталось {activist.nextLevelXp - activist.xp} XP. Самый быстрый путь
          сейчас — участие и подтверждённые инициативы.
        </p>
      </div>

      <div className="xp-block">
        <strong>{formatNumber(activist.xp)}</strong>
        <span>XP всего</span>
      </div>

      <div className="wide-progress">
        <ProgressBar value={progress} />
        <span>
          {formatNumber(activist.xp)} / {formatNumber(activist.nextLevelXp)} XP до уровня{" "}
          {activist.level + 1}
        </span>
      </div>
    </section>
  );
}

function StatsGrid() {
  return (
    <section className="stats-grid" aria-label="Ключевые показатели">
      {stats.map((stat) => (
        <article className={`panel stat-card tone-${stat.tone}`} key={stat.label}>
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
          <small>{stat.note}</small>
        </article>
      ))}
    </section>
  );
}

function ActivityTimeline() {
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

function NextCheckIn() {
  return (
    <section className="next-checkin" aria-label="Ближайшая отметка">
      <div>
        <h2>Ближайшая отметка</h2>
        <p>Сегодня, 18:30 · встреча штаба ЦАО · аудитория 204</p>
      </div>
      <button className="primary-button" type="button">
        Отметиться
      </button>
    </section>
  );
}

function AchievementList({
  onSelect,
  selectedAchievementId,
}: {
  onSelect: (id: string) => void;
  selectedAchievementId: string;
}) {
  return (
    <section className="panel achievements-panel" aria-labelledby="achievements-title">
      <div className="section-heading">
        <h2 id="achievements-title">Достижения</h2>
      </div>

      <div className="achievement-grid">
        {achievements.map((achievement) => (
          <button
            aria-pressed={selectedAchievementId === achievement.id}
            className="achievement-item"
            key={achievement.id}
            onClick={() => onSelect(achievement.id)}
            type="button"
          >
            <span className="achievement-medal">{achievement.progress > 70 ? "★" : "•"}</span>
            <strong>{achievement.title}</strong>
            <small>{achievement.caption}</small>
            <ProgressBar value={achievement.progress} />
          </button>
        ))}
      </div>
    </section>
  );
}

function Leaderboard() {
  return (
    <section className="panel leaderboard-panel" aria-labelledby="leaderboard-title">
      <div className="section-heading">
        <h2 id="leaderboard-title">Лидерборд штаба</h2>
      </div>

      <div className="leader-list">
        {leaderboard.map((leader) => (
          <article
            className={leader.current ? "leader-row current" : "leader-row"}
            key={leader.place}
          >
            <strong>{leader.place}</strong>
            <span className="leader-avatar">{leader.name.slice(0, 1)}</span>
            <span>{leader.name}</span>
            <b>{formatNumber(leader.points)}</b>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProgressBar({ value }: { value: number }) {
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

function formatNumber(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export default App;
