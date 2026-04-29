import type { ChangeEvent, CSSProperties, FormEvent, ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import {
  achievements,
  activities,
  activist,
  goals as initialGoals,
  leaderboard,
  stats,
} from "./profileData";

type ThemeMode = "light" | "dark";
type Tone = "green" | "red" | "blue";
type AppView = "profile" | "achievements" | "leaderboard";
type IconName =
  | "award"
  | "calendar"
  | "camera"
  | "edit"
  | "leaderboard"
  | "log-out"
  | "moon"
  | "plus"
  | "shield"
  | "sun"
  | "target"
  | "user";

type WeeklyGoal = {
  title: string;
  progress: number;
  status: string;
};

function App() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [isSignedIn, setIsSignedIn] = useState(false);

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
          theme={theme}
          onConfirmSignOut={() => setIsSignedIn(false)}
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
          <IconButton
            icon={theme === "light" ? "moon" : "sun"}
            label={theme === "light" ? "Включить тёмную тему" : "Включить светлую тему"}
            onClick={onToggleTheme}
          />
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
            <Icon name="shield" />
            Войти в профиль
          </button>
        </form>
      </div>
    </section>
  );
}

function Dashboard({
  onConfirmSignOut,
  onToggleTheme,
  theme,
}: {
  onConfirmSignOut: () => void;
  onToggleTheme: () => void;
  theme: ThemeMode;
}) {
  const [activeView, setActiveView] = useState<AppView>("profile");
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [goals, setGoals] = useState<WeeklyGoal[]>([...initialGoals]);
  const [description, setDescription] = useState(activist.description);
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [newGoalTitle, setNewGoalTitle] = useState("");

  const addGoal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = newGoalTitle.trim();
    if (!title) return;

    setGoals((current) => [
      ...current,
      {
        title,
        progress: 0,
        status: "Новая цель",
      },
    ]);
    setNewGoalTitle("");
  };

  const content = {
    profile: (
      <ProfileView
        avatarUrl={avatarUrl}
        description={description}
        goals={goals}
        newGoalTitle={newGoalTitle}
        onAddGoal={addGoal}
        onAvatarChange={setAvatarUrl}
        onDescriptionChange={setDescription}
        onNewGoalTitleChange={setNewGoalTitle}
      />
    ),
    achievements: <AchievementsView />,
    leaderboard: <LeaderboardView />,
  } satisfies Record<AppView, ReactElement>;

  return (
    <section className="dashboard" aria-label="Профиль активиста">
      <AppHeader
        activeView={activeView}
        onOpenSignOut={() => setIsSignOutOpen(true)}
        onSelectView={setActiveView}
        onToggleTheme={onToggleTheme}
        theme={theme}
      />

      {content[activeView]}

      <BottomNav activeView={activeView} onSelectView={setActiveView} />

      {isSignOutOpen ? (
        <SignOutModal
          onCancel={() => setIsSignOutOpen(false)}
          onConfirm={() => {
            setIsSignOutOpen(false);
            onConfirmSignOut();
          }}
        />
      ) : null}
    </section>
  );
}

function AppHeader({
  activeView,
  onOpenSignOut,
  onSelectView,
  onToggleTheme,
  theme,
}: {
  activeView: AppView;
  onOpenSignOut: () => void;
  onSelectView: (view: AppView) => void;
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
        <TopNavButton
          active={activeView === "profile"}
          icon="user"
          label="Профиль"
          onClick={() => onSelectView("profile")}
        />
        <TopNavButton
          active={activeView === "achievements"}
          icon="award"
          label="Достижения"
          onClick={() => onSelectView("achievements")}
        />
        <TopNavButton
          active={activeView === "leaderboard"}
          icon="leaderboard"
          label="Рейтинг"
          onClick={() => onSelectView("leaderboard")}
        />
      </nav>

      <div className="header-actions">
        <IconButton
          icon={theme === "light" ? "moon" : "sun"}
          label={theme === "light" ? "Включить тёмную тему" : "Включить светлую тему"}
          onClick={onToggleTheme}
        />
        <IconButton danger icon="log-out" label="Выйти" onClick={onOpenSignOut} />
      </div>
    </header>
  );
}

function TopNavButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: IconName;
  label: string;
  onClick: () => void;
}) {
  return (
    <button className={active ? "nav-pill active" : "nav-pill"} type="button" onClick={onClick}>
      <Icon name={icon} />
      {label}
    </button>
  );
}

function BottomNav({
  activeView,
  onSelectView,
}: {
  activeView: AppView;
  onSelectView: (view: AppView) => void;
}) {
  return (
    <nav className="bottom-nav" aria-label="Основное меню">
      <button
        className={activeView === "profile" ? "bottom-nav-item active" : "bottom-nav-item"}
        type="button"
        onClick={() => onSelectView("profile")}
      >
        <Icon name="user" />
        <span>Профиль</span>
      </button>
      <button
        className={activeView === "achievements" ? "bottom-nav-item active" : "bottom-nav-item"}
        type="button"
        onClick={() => onSelectView("achievements")}
      >
        <Icon name="award" />
        <span>Достижения</span>
      </button>
      <button
        className={activeView === "leaderboard" ? "bottom-nav-item active" : "bottom-nav-item"}
        type="button"
        onClick={() => onSelectView("leaderboard")}
      >
        <Icon name="leaderboard" />
        <span>Рейтинг</span>
      </button>
      <a
        className="bottom-nav-item"
        href="https://mger-board.vercel.app"
        rel="noreferrer"
        target="_blank"
      >
        <Icon name="calendar" />
        <span>События</span>
      </a>
    </nav>
  );
}

function ProfileView({
  avatarUrl,
  description,
  goals,
  newGoalTitle,
  onAddGoal,
  onAvatarChange,
  onDescriptionChange,
  onNewGoalTitleChange,
}: {
  avatarUrl?: string;
  description: string;
  goals: WeeklyGoal[];
  newGoalTitle: string;
  onAddGoal: (event: FormEvent<HTMLFormElement>) => void;
  onAvatarChange: (url: string) => void;
  onDescriptionChange: (value: string) => void;
  onNewGoalTitleChange: (value: string) => void;
}) {
  const xpProgress = Math.round((activist.xp / activist.nextLevelXp) * 100);

  return (
    <div className="dashboard-grid profile-layout">
      <aside className="profile-column">
        <ProfileCard avatarUrl={avatarUrl} onAvatarChange={onAvatarChange} />
        <EditableDescription description={description} onChange={onDescriptionChange} />
      </aside>

      <section className="main-column">
        <ProgressPanel progress={xpProgress} />
        <StatsGrid />
        <WeeklyGoals
          goals={goals}
          newGoalTitle={newGoalTitle}
          onAddGoal={onAddGoal}
          onNewGoalTitleChange={onNewGoalTitleChange}
        />
        <ActivityTimeline />
      </section>

      <aside className="side-column profile-side">
        <NextCheckIn />
        <MiniAchievements />
      </aside>
    </div>
  );
}

function BrandMark() {
  return <div className="brand-mark">МГ</div>;
}

function ProfileCard({
  avatarUrl,
  onAvatarChange,
}: {
  avatarUrl?: string;
  onAvatarChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    onAvatarChange(URL.createObjectURL(file));
  };

  return (
    <article className="panel profile-card">
      <div className="profile-ribbon" />
      <div className="avatar-row">
        <button
          className="avatar-button"
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="Изменить фото профиля"
        >
          <span className="avatar">
            {avatarUrl ? <img alt="" src={avatarUrl} /> : activist.initials}
          </span>
          <span className="avatar-edit">
            <Icon name="camera" />
          </span>
        </button>
        <input
          ref={inputRef}
          className="visually-hidden"
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
        />
        <span className="rank-pill">{activist.rank}</span>
      </div>

      <div className="profile-copy">
        <h2>{activist.fullName}</h2>
        <p>{activist.team}</p>
      </div>

      <dl className="profile-meta">
        <div>
          <dt>Федеральный округ</dt>
          <dd>{activist.district}</dd>
        </div>
        <div>
          <dt>Город</dt>
          <dd>{activist.city}</dd>
        </div>
        <div>
          <dt>Руководитель</dt>
          <dd>{activist.supervisor}</dd>
        </div>
      </dl>

      <div className="profile-split">
        <Metric value={activist.streak.toString()} label="дней активности" tone="green" />
        <Metric value={`#${activist.rating}`} label="место в штабе" tone="red" />
      </div>
    </article>
  );
}

function EditableDescription({
  description,
  onChange,
}: {
  description: string;
  onChange: (value: string) => void;
}) {
  return (
    <section className="panel editable-panel" aria-labelledby="description-title">
      <div className="section-heading">
        <h2 id="description-title">О себе</h2>
        <Icon name="edit" />
      </div>
      <textarea
        aria-label="Описание профиля"
        value={description}
        onChange={(event) => onChange(event.target.value)}
      />
    </section>
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

function WeeklyGoals({
  goals,
  newGoalTitle,
  onAddGoal,
  onNewGoalTitleChange,
}: {
  goals: WeeklyGoal[];
  newGoalTitle: string;
  onAddGoal: (event: FormEvent<HTMLFormElement>) => void;
  onNewGoalTitleChange: (value: string) => void;
}) {
  return (
    <section className="panel weekly-goals" aria-labelledby="weekly-goals-title">
      <div className="section-heading">
        <h2 id="weekly-goals-title">Цели недели</h2>
        <Icon name="target" />
      </div>

      <form className="add-goal-form" onSubmit={onAddGoal}>
        <input
          aria-label="Новая цель недели"
          placeholder="Добавить свою цель"
          value={newGoalTitle}
          onChange={(event) => onNewGoalTitleChange(event.target.value)}
        />
        <button className="icon-button" type="submit" aria-label="Добавить цель">
          <Icon name="plus" />
        </button>
      </form>

      <div className="goal-list">
        {goals.map((goal, index) => (
          <article className="goal-item" key={`${goal.title}-${index}`}>
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
      <Icon name="calendar" />
      <div>
        <h2>Ближайшая отметка</h2>
        <p>Сегодня, 18:30 · встреча штаба ЦАО · аудитория 204</p>
      </div>
      <a
        className="primary-button"
        href="https://mger-board.vercel.app"
        rel="noreferrer"
        target="_blank"
      >
        Открыть доску
      </a>
    </section>
  );
}

function MiniAchievements() {
  return (
    <section className="panel achievements-panel" aria-labelledby="mini-achievements-title">
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

function AchievementsView() {
  const groups = [
    {
      title: "Достигнутые",
      items: achievements.filter((achievement) => achievement.group === "completed"),
    },
    {
      title: "Активные",
      items: achievements.filter((achievement) => achievement.group === "active"),
    },
    {
      title: "Недоступные",
      items: achievements.filter((achievement) => achievement.group === "locked"),
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
                <AchievementCard achievement={achievement} key={achievement.id} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function AchievementCard({ achievement }: { achievement: (typeof achievements)[number] }) {
  const isLocked = achievement.group === "locked";

  return (
    <article className={isLocked ? "achievement-card locked" : "achievement-card"}>
      <div className="medal-icon" aria-hidden="true">
        <Icon name="award" />
      </div>
      <strong>{achievement.title}</strong>
      <small>{achievement.caption}</small>
      <span>{achievement.status}</span>
      <ProgressBar value={achievement.progress} />
    </article>
  );
}

function LeaderboardView() {
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

function SignOutModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section
        aria-labelledby="signout-title"
        aria-modal="true"
        className="confirm-modal"
        role="dialog"
      >
        <div className="modal-icon">
          <Icon name="log-out" />
        </div>
        <h2 id="signout-title">Выйти из профиля?</h2>
        <p>Текущие демо-изменения останутся только в этой сессии браузера.</p>
        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={onCancel}>
            Нет
          </button>
          <button className="danger-button" type="button" onClick={onConfirm}>
            Да, выйти
          </button>
        </div>
      </section>
    </div>
  );
}

function IconButton({
  danger = false,
  icon,
  label,
  onClick,
}: {
  danger?: boolean;
  icon: IconName;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={danger ? "icon-button danger" : "icon-button"}
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <Icon name={icon} />
    </button>
  );
}

function Icon({ name }: { name: IconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
    viewBox: "0 0 24 24",
  };

  const paths: Record<IconName, ReactElement> = {
    award: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="m8.5 12.5-1.5 8 5-3 5 3-1.5-8" />
      </>
    ),
    calendar: (
      <>
        <path d="M7 3v4M17 3v4M4 8h16" />
        <rect height="17" rx="3" width="18" x="3" y="4" />
      </>
    ),
    camera: (
      <>
        <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </>
    ),
    leaderboard: (
      <>
        <path d="M5 21V10M12 21V4M19 21v-7" />
        <path d="M3 21h18" />
      </>
    ),
    "log-out": (
      <>
        <path d="M10 17 15 12l-5-5" />
        <path d="M15 12H3" />
        <path d="M14 4h5v16h-5" />
      </>
    ),
    moon: <path d="M21 14.5A8 8 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z" />,
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    shield: <path d="M12 3 5 6v5c0 4.5 2.9 8.4 7 10 4.1-1.6 7-5.5 7-10V6Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" className="icon" {...common}>
      {paths[name]}
    </svg>
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
