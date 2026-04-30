export type Activist = {
  name: string;
  fullName: string;
  initials: string;
  team: string;
  district: string;
  city: string;
  supervisor: string;
  rank: string;
  description: string;
  level: number;
  title: string;
  xp: number;
  nextLevelXp: number;
  rating: number;
  streak: number;
};

export type Stat = {
  label: string;
  value: string;
  note: string;
  tone: "green" | "red" | "blue";
};

export type Goal = {
  title: string;
  progress: number;
  status: string;
};

export type Activity = {
  title: string;
  meta: string;
  xp: string;
  tone: "green" | "red" | "blue";
};

export type Achievement = {
  id: string;
  title: string;
  caption: string;
  progress: number;
  status: string;
  group: "completed" | "active" | "locked";
};

export type Leader = {
  place: number;
  name: string;
  points: number;
  current: boolean;
};
