import type { FormEvent } from "react";
import { Icon } from "@shared/ui/Icon";
import { ProgressBar } from "@shared/ui/ProgressBar";
import type { WeeklyGoal } from "@shared/types";

interface WeeklyGoalsProps {
  goals: WeeklyGoal[];
  newGoalTitle: string;
  onAddGoal: (event: FormEvent<HTMLFormElement>) => void;
  onNewGoalTitleChange: (value: string) => void;
}

export function WeeklyGoals({
  goals,
  newGoalTitle,
  onAddGoal,
  onNewGoalTitleChange,
}: WeeklyGoalsProps) {
  return (
    <section
      className="panel weekly-goals"
      aria-labelledby="weekly-goals-title"
    >
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
        <button
          className="icon-button"
          type="submit"
          aria-label="Добавить цель"
        >
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
