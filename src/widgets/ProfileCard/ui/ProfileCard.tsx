import { useActivistStore } from "@entities/activist";
import { Icon } from "@shared/ui/Icon";
import { Metric } from "@shared/ui/Metric";
import type { ChangeEvent } from "react";
import { useRef } from "react";

interface ProfileCardProps {
  avatarUrl?: string;
  onAvatarChange: (url: string) => void;
}

export function ProfileCard({ avatarUrl, onAvatarChange }: ProfileCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const activist = useActivistStore((state) => state.activist);

  const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    onAvatarChange(URL.createObjectURL(file));
  };

  return (
    <article className="panel profile-card">
      <div className="profile-ribbon">
        <img src="/mger-logo.png" alt="" />
      </div>
      <div className="avatar-row">
        <button
          className="avatar-button"
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="Изменить фото профиля"
        >
          <span className="avatar">
            {avatarUrl ? <img alt="" src={avatarUrl} /> : activist.initials}
          </span>
          <span className="avatar-edit">
            <Icon name="camera" />
          </span>
        </button>
        <input
          ref={inputRef}
          className="visually-hidden"
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
        />
        <span className="rank-pill">{activist.rank}</span>
      </div>

      <div className="profile-copy">
        <h2>{activist.fullName}</h2>
        <p>{activist.team}</p>
      </div>

      <dl className="profile-meta">
        <div>
          <dt>Федеральный округ</dt>
          <dd>{activist.district}</dd>
        </div>
        <div>
          <dt>Город</dt>
          <dd>{activist.city}</dd>
        </div>
        <div>
          <dt>Руководитель</dt>
          <dd>{activist.supervisor}</dd>
        </div>
      </dl>

      <div className="profile-split">
        <Metric
          value={activist.streak.toString()}
          label="дней активности"
          tone="green"
        />
        <Metric
          value={`#${activist.rating}`}
          label="место в штабе"
          tone="red"
        />
      </div>
    </article>
  );
}
