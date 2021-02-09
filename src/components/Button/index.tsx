import { FC } from "react";
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
      id={label}
      type="button"
      aria-label={label}
      className={className}
      onClick={callback}
      disabled={disabled}
      data-testid={label}
    />
  );
};

export const StartButton = (props: ConfigurableButtonProps) => (
  <Button label="start" className="start" {...props} />
);
export const StopButton = (props: ConfigurableButtonProps) => (
  <Button label="stop" className="stop" {...props} />
);
