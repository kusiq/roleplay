import { Icon } from "@shared/ui/Icon";

interface EditableDescriptionProps {
  description: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  onEditToggle: () => void;
  onSave: () => void;
}

const maxDescriptionLength = 1000;

export function EditableDescription({
  description,
  isEditing,
  onChange,
  onEditToggle,
  onSave,
}: EditableDescriptionProps) {
  return (
    <section
      className="panel editable-panel"
      aria-labelledby="description-title"
    >
      <div className="section-heading">
        <h2 id="description-title">О себе</h2>
        <button
          className="icon-button compact"
          type="button"
          aria-label={
            isEditing ? "Закрыть редактирование" : "Редактировать описание"
          }
          onClick={onEditToggle}
        >
          <Icon name="edit" />
        </button>
      </div>
      {isEditing ? (
        <div className="description-editor">
          <textarea
            aria-label="Описание профиля"
            maxLength={maxDescriptionLength}
            value={description}
            onChange={(event) => onChange(event.target.value)}
          />
          <div className="editor-actions">
            <span>
              {description.length} / {maxDescriptionLength}
            </span>
            <button
              className="primary-button small"
              type="button"
              onClick={onSave}
            >
              Сохранить
            </button>
          </div>
        </div>
      ) : (
        <p className="description-text">{description}</p>
      )}
    </section>
  );
}
