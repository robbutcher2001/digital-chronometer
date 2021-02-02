import { FC } from "react";
import "./index.css";

type DigitProps = {
  value?: string;
};

const Digit: FC<DigitProps> = (props: DigitProps) => {
  const { value = "" } = props;
  const regEx = new RegExp(/^\d{1}$/);
  const digit = regEx.exec(value);

  return (
    <div className="digit" {...props}>
      {digit ? digit[0] : 0}
    </div>
  );
};

export default Digit;
