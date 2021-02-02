import { FC } from "react";
import Digit from "../../components/Digit";
import Division from "../../components/Division";

const Chronometer: FC = () => {
  return (
    <>
      <div className="clock">
        <Digit value="0" data-testid="chronometer-m" />
        <Digit value="0" data-testid="chronometer-mm" />
        <Division data-testid="chronometer-div" />
        <Digit value="3" data-testid="chronometer-s" />
        <Digit value="0" data-testid="chronometer-ss" />
      </div>
    </>
  );
};

export default Chronometer;
