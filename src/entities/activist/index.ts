export { useActivistStore } from "./model/store";
export type {
  Achievement,
  Activist,
  Activity,
  Goal,
  Leader,
  Stat,
} from "./model/types";

// Backward compatibility exports
export {
  achievements,
  activist,
  activities,
  goals,
  leaderboard,
  stats,
} from "./model";
