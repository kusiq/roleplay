import { Icon } from "@shared/ui/Icon";

interface NextCheckInProps {
  onOpenEventsBoard: () => void;
}

export function NextCheckIn({ onOpenEventsBoard }: NextCheckInProps) {
  return (
    <section className="next-checkin" aria-label="Ближайшая отметка">
      <div className="next-checkin-header">
        <Icon name="calendar" />
        <h2>Ближайшая отметка</h2>
      </div>
      <p>Сегодня, 18:30 · встреча штаба ЦАО · аудитория 204</p>
      <div className="next-checkin-footer">
        <button
          className="primary-button"
          type="button"
          onClick={onOpenEventsBoard}
        >
          Открыть доску
        </button>
      </div>
    </section>
  );
}
