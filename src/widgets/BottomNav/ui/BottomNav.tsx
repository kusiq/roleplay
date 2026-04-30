import { Icon } from "@shared/ui/Icon";
import type { AppView } from "@shared/types";

interface BottomNavProps {
  activeView: AppView;
  onOpenEventsBoard: () => void;
  onSelectView: (view: AppView) => void;
}

export function BottomNav({
  activeView,
  onOpenEventsBoard,
  onSelectView,
}: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Основное меню">
      <button
        className={
          activeView === "profile"
            ? "bottom-nav-item active"
            : "bottom-nav-item"
        }
        type="button"
        onClick={() => onSelectView("profile")}
      >
        <Icon name="user" />
        <span>Профиль</span>
      </button>
      <button
        className={
          activeView === "achievements"
            ? "bottom-nav-item active"
            : "bottom-nav-item"
        }
        type="button"
        onClick={() => onSelectView("achievements")}
      >
        <Icon name="award" />
        <span>Достижения</span>
      </button>
      <button
        className={
          activeView === "leaderboard"
            ? "bottom-nav-item active"
            : "bottom-nav-item"
        }
        type="button"
        onClick={() => onSelectView("leaderboard")}
      >
        <Icon name="leaderboard" />
        <span>Рейтинг</span>
      </button>
      <button
        className="bottom-nav-item"
        type="button"
        onClick={onOpenEventsBoard}
      >
        <Icon name="calendar" />
        <span>События</span>
      </button>
    </nav>
  );
}
