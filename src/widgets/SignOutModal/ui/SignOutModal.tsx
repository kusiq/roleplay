import { Icon } from "@shared/ui/Icon";

interface SignOutModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function SignOutModal({ onCancel, onConfirm }: SignOutModalProps) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section
        aria-labelledby="signout-title"
        aria-modal="true"
        className="confirm-modal"
        role="dialog"
      >
        <div className="modal-icon">
          <Icon name="log-out" />
        </div>
        <h2 id="signout-title">Выйти из профиля?</h2>
        <p>Текущие демо-изменения останутся только в этой сессии браузера.</p>
        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={onCancel}>
            Нет
          </button>
          <button className="danger-button" type="button" onClick={onConfirm}>
            Да, выйти
          </button>
        </div>
      </section>
    </div>
  );
}
