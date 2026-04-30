import { BrandMark } from "@widgets/BrandMark";
import { IconButton } from "@shared/ui/IconButton";
import type { ThemeMode, AppView } from "@shared/types";

const viewTitles: Record<AppView, string> = {
  profile: "Профиль активиста",
  achievements: "Достижения",
  leaderboard: "Лидерборд",
};

interface AppHeaderProps {
  activeView: AppView;
  onOpenSignOut: () => void;
  onToggleTheme: () => void;
  theme: ThemeMode;
}

export function AppHeader({
  activeView,
  onOpenSignOut,
  onToggleTheme,
  theme,
}: AppHeaderProps) {
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
          label={
            theme === "light" ? "Включить тёмную тему" : "Включить светлую тему"
          }
          onClick={onToggleTheme}
        />
        <IconButton
          danger
          icon="log-out"
          label="Выйти"
          onClick={onOpenSignOut}
        />
      </div>
    </header>
  );
}
