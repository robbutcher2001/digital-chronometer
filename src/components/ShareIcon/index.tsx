import { FC, useState, MouseEvent } from "react";
import "./index.css";

const ShareIcon: FC = () => {
  const [confirmed, setConfirmed] = useState(false);

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!confirmed) {
      navigator.clipboard.writeText(window.location.href);
      event.currentTarget.focus();
      setConfirmed(true);
    }
  };

  const onBlur = () => {
    if (confirmed) {
      setConfirmed(false);
    }
  };

  return (
    <div className="share">
      <div className={confirmed ? "confirmation confirmed" : "confirmation"}>
        &#10003;
      </div>
      {confirmed && (
        <div className="text" data-testid="share_confirmed">
          Link copied to clipboard!
        </div>
      )}
      <button
        type="button"
        aria-label="share"
        className={confirmed ? "confirmed" : undefined}
        onClick={onClick}
        onBlur={onBlur}
      >
        <div className="box" />
        <div className="arrow" />
      </button>
    </div>
  );
};

export default ShareIcon;
