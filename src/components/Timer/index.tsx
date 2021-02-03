import { FC, useEffect, useState } from "react";
import Digit from "../../components/Digit";
import Division from "../../components/Division";

type TimerProps = {
  seconds: number;
  running: boolean;
};

const parseSecondsToDisplay = (seconds: number): string[] => {
  const displayMinutes = (seconds > 59
    ? Math.floor(seconds / 60)
    : 0
  ).toString();
  const displaySeconds = (seconds % 60).toString();

  return [
    ...(displayMinutes.length > 1
      ? Array.from(displayMinutes)
      : ["0", displayMinutes]),
    ...(displaySeconds.length > 1
      ? Array.from(displaySeconds)
      : ["0", displaySeconds]),
  ];
};

const Timer: FC<TimerProps> = ({ seconds, running }) => {
  const [display, setDisplay] = useState<string[]>(["0", "0", "0", "0"]);
  const [secondsLeft, setSecondsLeft] = useState<number>(seconds);

  useEffect(() => {
    setDisplay(parseSecondsToDisplay(seconds));
  }, [seconds]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (running && secondsLeft > 0) {
      timeoutId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
        setDisplay(parseSecondsToDisplay(secondsLeft - 1));
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [running, secondsLeft]);

  return (
    <>
      <Digit value={display[0]} data-testid="chronometer-m" />
      <Digit value={display[1]} data-testid="chronometer-mm" />
      <Division data-testid="chronometer-div" />
      <Digit value={display[2]} data-testid="chronometer-s" />
      <Digit value={display[3]} data-testid="chronometer-ss" />
    </>
  );
};

export default Timer;
