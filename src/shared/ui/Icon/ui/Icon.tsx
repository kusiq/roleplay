import type { IconName } from "@shared/types";

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

export function Icon({ name }: { name: IconName }) {
  return (
    <span aria-hidden="true" className="material-symbols-rounded icon">
      {symbols[name]}
    </span>
  );
}
