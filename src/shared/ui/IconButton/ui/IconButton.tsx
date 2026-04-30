import type { IconName } from "@shared/types";
import { Icon } from "@shared/ui/Icon";

interface IconButtonProps {
  danger?: boolean;
  icon: IconName;
  label: string;
  onClick: () => void;
}

export function IconButton({
  danger = false,
  icon,
  label,
  onClick,
}: IconButtonProps) {
  return (
    <button
      className={danger ? "icon-button danger" : "icon-button"}
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <Icon name={icon} />
    </button>
  );
}
