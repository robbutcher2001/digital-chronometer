import React, { FC } from "react";

type StylingProps = {
  className: string;
};

type ConfigurableButtonProps = {
  callback: () => void;
  disabled?: boolean;
};

type ButtonProps = StylingProps & ConfigurableButtonProps;

const Button: FC<ButtonProps> = ({
  className,
  callback,
  disabled,
  children,
}) => {
  return (
    <button
      type="button"
      className={className}
      onClick={callback}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const StartButton = (props: ConfigurableButtonProps) => (
  <Button className="start" {...props}>
    Start
  </Button>
);
export const StopButton = (props: ConfigurableButtonProps) => (
  <Button className="stop" {...props}>
    Stop
  </Button>
);
