export type ThemeMode = "light" | "dark";
export type Tone = "green" | "red" | "blue";
export type AppView = "profile" | "achievements" | "leaderboard";
export type IconName =
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

export type WeeklyGoal = {
  title: string;
  progress: number;
  status: string;
};
