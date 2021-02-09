import { FC } from "react";
import "./index.css";

const ShareIcon: FC = () => {
  const onClick = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <button
      type="button"
      aria-label="share"
      className="share"
      onClick={onClick}
    >
      <div className="box" />
      <div className="arrow" />
    </button>
  );
};

export default ShareIcon;
