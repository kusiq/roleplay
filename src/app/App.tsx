import type { ChangeEvent, CSSProperties, FormEvent, ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import {
  achievements,
  activist,
  activities,
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

const eventsBoardUrl = "https://mger-board.vercel.app";
const maxDescriptionLength = 1000;

const viewTitles: Record<AppView, string> = {
  profile: "Профиль активиста",
  achievements: "Достижения",
  leaderboard: "Лидерборд",
};

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
          <h1>Вход в профиль активиста</h1>
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
          <button className="primary-button login-button" type="submit">
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
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [newGoalTitle, setNewGoalTitle] = useState("");

  const openEventsBoard = () => {
    window.open(eventsBoardUrl, "_blank", "noopener,noreferrer");
  };

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
        isDescriptionEditing={isDescriptionEditing}
        newGoalTitle={newGoalTitle}
        onAddGoal={addGoal}
        onAvatarChange={setAvatarUrl}
        onDescriptionChange={setDescription}
        onDescriptionEditToggle={() => setIsDescriptionEditing((current) => !current)}
        onDescriptionSave={() => setIsDescriptionEditing(false)}
        onOpenEventsBoard={openEventsBoard}
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
        onToggleTheme={onToggleTheme}
        theme={theme}
      />

      {content[activeView]}

      <BottomNav
        activeView={activeView}
        onOpenEventsBoard={openEventsBoard}
        onSelectView={setActiveView}
      />

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
  onToggleTheme,
  theme,
}: {
  activeView: AppView;
  onOpenSignOut: () => void;
  onToggleTheme: () => void;
  theme: ThemeMode;
}) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <BrandMark />
        <div>
          <strong>{viewTitles[activeView]}</strong>
          <span>Молодая Гвардия</span>
        </div>
      </div>

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

function BottomNav({
  activeView,
  onOpenEventsBoard,
  onSelectView,
}: {
  activeView: AppView;
  onOpenEventsBoard: () => void;
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
      <button className="bottom-nav-item" type="button" onClick={onOpenEventsBoard}>
        <Icon name="calendar" />
        <span>События</span>
      </button>
    </nav>
  );
}

function ProfileView({
  avatarUrl,
  description,
  goals,
  isDescriptionEditing,
  newGoalTitle,
  onAddGoal,
  onAvatarChange,
  onDescriptionChange,
  onDescriptionEditToggle,
  onDescriptionSave,
  onOpenEventsBoard,
  onNewGoalTitleChange,
}: {
  avatarUrl?: string;
  description: string;
  goals: WeeklyGoal[];
  isDescriptionEditing: boolean;
  newGoalTitle: string;
  onAddGoal: (event: FormEvent<HTMLFormElement>) => void;
  onAvatarChange: (url: string) => void;
  onDescriptionChange: (value: string) => void;
  onDescriptionEditToggle: () => void;
  onDescriptionSave: () => void;
  onOpenEventsBoard: () => void;
  onNewGoalTitleChange: (value: string) => void;
}) {
  const xpProgress = Math.round((activist.xp / activist.nextLevelXp) * 100);

  return (
    <div className="dashboard-grid profile-layout">
      <aside className="profile-column">
        <ProfileCard avatarUrl={avatarUrl} onAvatarChange={onAvatarChange} />
        <EditableDescription
          description={description}
          isEditing={isDescriptionEditing}
          onChange={onDescriptionChange}
          onEditToggle={onDescriptionEditToggle}
          onSave={onDescriptionSave}
        />
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
        <NextCheckIn onOpenEventsBoard={onOpenEventsBoard} />
        <MiniAchievements />
      </aside>
    </div>
  );
}

function BrandMark() {
  return <img className="brand-mark" src="/mger-logo.png" alt="Молодая Гвардия" />;
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
      <div className="profile-ribbon">
        <img src="/mger-logo.png" alt="" />
      </div>
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
  isEditing,
  onChange,
  onEditToggle,
  onSave,
}: {
  description: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  onEditToggle: () => void;
  onSave: () => void;
}) {
  return (
    <section className="panel editable-panel" aria-labelledby="description-title">
      <div className="section-heading">
        <h2 id="description-title">О себе</h2>
        <button
          className="icon-button compact"
          type="button"
          aria-label={isEditing ? "Закрыть редактирование" : "Редактировать описание"}
          onClick={onEditToggle}
        >
          <Icon name="edit" />
        </button>
      </div>
      {isEditing ? (
        <div className="description-editor">
          <textarea
            aria-label="Описание профиля"
            maxLength={maxDescriptionLength}
            value={description}
            onChange={(event) => onChange(event.target.value)}
          />
          <div className="editor-actions">
            <span>
              {description.length} / {maxDescriptionLength}
            </span>
            <button className="primary-button small" type="button" onClick={onSave}>
              Сохранить
            </button>
          </div>
        </div>
      ) : (
        <p className="description-text">{description}</p>
      )}
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

function NextCheckIn({ onOpenEventsBoard }: { onOpenEventsBoard: () => void }) {
  return (
    <section className="next-checkin" aria-label="Ближайшая отметка">
      <Icon name="calendar" />
      <div>
        <h2>Ближайшая отметка</h2>
        <p>Сегодня, 18:30 · встреча штаба ЦАО · аудитория 204</p>
      </div>
      <button className="primary-button" type="button" onClick={onOpenEventsBoard}>
        Открыть доску
      </button>
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
  const progress = achievement.status === "Достигнуто" ? 100 : achievement.progress;

  return (
    <article className={isLocked ? "achievement-card locked" : "achievement-card"}>
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
  const symbols: Record<IconName, string> = {
    award: "workspace_premium",
    calendar: "calendar_month",
    camera: "photo_camera",
    edit: "edit",
    leaderboard: "leaderboard",
    "log-out": "logout",
    moon: "dark_mode",
    plus: "add",
    shield: "verified_user",
    sun: "light_mode",
    target: "track_changes",
    user: "person",
  };

  return (
    <span aria-hidden="true" className="material-symbols-rounded icon">
      {symbols[name]}
    </span>
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
