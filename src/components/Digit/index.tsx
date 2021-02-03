import { FC } from "react";
import "./index.css";

type DigitProps = {
  value?: string;
  className?: string;
};

const Digit: FC<DigitProps> = (props: DigitProps) => {
  const { value = "", className } = props;
  const regEx = new RegExp(/^\d{1}$/);
  const digit = regEx.exec(value);

  return (
    <div {...props} className={className ? `${className} digit` : "digit"}>
      {digit ? digit[0] : 0}
    </div>
  );
};

export default Digit;
