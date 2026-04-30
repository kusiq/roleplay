import { useActivistStore } from "@entities/activist";
import type { WeeklyGoal } from "@shared/types";
import { ActivityTimeline } from "@widgets/ActivityTimeline";
import { EditableDescription } from "@widgets/EditableDescription";
import { MiniAchievements } from "@widgets/MiniAchievements";
import { NextCheckIn } from "@widgets/NextCheckIn";
import { ProfileCard } from "@widgets/ProfileCard";
import { ProgressPanel } from "@widgets/ProgressPanel";
import { StatsGrid } from "@widgets/StatsGrid";
import { WeeklyGoals } from "@widgets/WeeklyGoals";
import type { FormEvent } from "react";

interface ProfileViewProps {
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
}

export function ProfileView({
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
}: ProfileViewProps) {
  const activist = useActivistStore((state) => state.activist);
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
