import React, { FC } from "react";
import "./index.css";

type InternalProps = {
  label: string;
  className: string;
};

type ConfigurableButtonProps = {
  callback: () => void;
  disabled?: boolean;
};

type ButtonProps = InternalProps & ConfigurableButtonProps;

const Button: FC<ButtonProps> = ({ label, className, callback, disabled }) => {
  return (
    <button
      type="button"
      className={className}
      onClick={callback}
      disabled={disabled}
    >
      <div aria-label={label}></div>
    </button>
  );
};

export const StartButton = (props: ConfigurableButtonProps) => (
  <Button label="Start" className="start" {...props} />
);
export const StopButton = (props: ConfigurableButtonProps) => (
  <Button label="Stop" className="stop" {...props} />
);
