import { useActivistStore } from "@entities/activist/model/store";
import { AchievementsView } from "@pages/Achievements";
import { LeaderboardView } from "@pages/Leaderboard";
import { ProfileView } from "@pages/Profile";
import type { AppView, ThemeMode, WeeklyGoal } from "@shared/types";
import { IconButton } from "@shared/ui/IconButton";
import { AppHeader } from "@widgets/AppHeader";
import { BottomNav } from "@widgets/BottomNav";
import { BrandMark } from "@widgets/BrandMark";
import { SignOutModal } from "@widgets/SignOutModal";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

const eventsBoardUrl = "https://mger-board.vercel.app";

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
            label={
              theme === "light"
                ? "Включить тёмную тему"
                : "Включить светлую тему"
            }
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
  const activist = useActivistStore((state) => state.activist);
  const goals = useActivistStore((state) => state.goals);
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

    // For now, just log - store action needed for adding goals
    console.log("Add goal:", title);
    setNewGoalTitle("");
  };

  const content = {
    profile: (
      <ProfileView
        avatarUrl={avatarUrl}
        description={description}
        goals={goals as WeeklyGoal[]}
        isDescriptionEditing={isDescriptionEditing}
        newGoalTitle={newGoalTitle}
        onAddGoal={addGoal}
        onAvatarChange={setAvatarUrl}
        onDescriptionChange={setDescription}
        onDescriptionEditToggle={() =>
          setIsDescriptionEditing((current) => !current)
        }
        onDescriptionSave={() => setIsDescriptionEditing(false)}
        onOpenEventsBoard={openEventsBoard}
        onNewGoalTitleChange={setNewGoalTitle}
      />
    ),
    achievements: <AchievementsView />,
    leaderboard: <LeaderboardView />,
  } as const;

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

export default App;
