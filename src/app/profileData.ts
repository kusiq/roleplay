export const activist = {
  name: "Алексей Кузнецов",
  initials: "АК",
  team: "Московский городской штаб · ЦАО",
  supervisor: "Мария Орлова",
  rank: "Организатор",
  level: 7,
  title: "Координатор инициатив",
  xp: 3580,
  nextLevelXp: 4000,
  rating: 8,
  streak: 14,
};

export const stats = [
  {
    label: "Участий",
    value: "27",
    note: "+3 за месяц",
    tone: "green",
  },
  {
    label: "Инициатив",
    value: "6",
    note: "2 активны",
    tone: "red",
  },
  {
    label: "Наставничество",
    value: "4",
    note: "новичка",
    tone: "blue",
  },
] as const;

export const goals = [
  {
    title: "Отметиться на 2 событиях",
    progress: 50,
    status: "В работе",
  },
  {
    title: "Закрыть инициативу",
    progress: 80,
    status: "Почти готово",
  },
  {
    title: "Подтвердить отчёт",
    progress: 25,
    status: "Нужно внимание",
  },
] as const;

export const activities = [
  {
    title: "Волонтёрский штаб: городской форум",
    meta: "28 апреля · отметка подтверждена",
    xp: "+180 XP",
    tone: "green",
  },
  {
    title: "Выступление на встрече новичков",
    meta: "24 апреля · доклад 8 минут",
    xp: "+120 XP",
    tone: "red",
  },
  {
    title: "Инициатива по медиакоманде",
    meta: "20 апреля · отчёт принят",
    xp: "+220 XP",
    tone: "blue",
  },
] as const;

export const achievements = [
  {
    id: "first-team",
    title: "Первый штаб",
    caption: "5 событий",
    progress: 92,
    status: "Открыто",
  },
  {
    id: "leader",
    title: "Лидер",
    caption: "топ-10 штаба",
    progress: 54,
    status: "В процессе",
  },
  {
    id: "mentor",
    title: "Наставник",
    caption: "4 новичка",
    progress: 78,
    status: "Открыто",
  },
  {
    id: "media",
    title: "Медиа",
    caption: "3 публикации",
    progress: 64,
    status: "В процессе",
  },
] as const;

export const leaderboard = [
  {
    place: 1,
    name: "Софья",
    points: 4420,
    current: false,
  },
  {
    place: 2,
    name: "Даниил",
    points: 3980,
    current: false,
  },
  {
    place: 8,
    name: "Алексей",
    points: 3580,
    current: true,
  },
  {
    place: 9,
    name: "Ирина",
    points: 3510,
    current: false,
  },
] as const;
