import { FC, useEffect, useState } from "react";
import Digit from "../../components/Digit";
import Division from "../../components/Division";

type TimerProps = {
  seconds: number;
  running: boolean;
};

type Animation = {
  left: string;
  right: string;
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

const animations: Animation[] = [
  { left: "shake", right: "shake" },
  { left: "roll-left", right: "roll-right" },
  { left: "pulse", right: "pulse" },
];

const Timer: FC<TimerProps> = ({ seconds, running }) => {
  const [display, setDisplay] = useState<string[]>(["0", "0", "0", "0"]);
  const [secondsLeft, setSecondsLeft] = useState<number>(seconds);
  const [animationIndex, setAnimationIndex] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    setDisplay(parseSecondsToDisplay(seconds));
    setAnimationIndex(
      Math.floor(Math.random() * Math.floor(animations.length))
    );
  }, [seconds, animationIndex]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (running && secondsLeft > 0) {
      timeoutId = setTimeout(() => {
        const newSeconds = secondsLeft - 1;
        setSecondsLeft(newSeconds);
        setDisplay(parseSecondsToDisplay(newSeconds));
        if (newSeconds === 0) {
          setAnimate(true);
        }
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [running, secondsLeft]);

  return (
    <>
      <Digit
        value={display[0]}
        className={animate ? `${animations[animationIndex].left}` : undefined}
        data-testid="chronometer-m"
        data-shake-delay="true"
      />
      <Digit
        value={display[1]}
        className={animate ? `${animations[animationIndex].left}` : undefined}
        data-testid="chronometer-mm"
        data-roll-delay="true"
      />
      <Division data-testid="chronometer-div" />
      <Digit
        value={display[2]}
        className={animate ? `${animations[animationIndex].right}` : undefined}
        data-testid="chronometer-s"
        data-shake-delay="true"
        data-roll-delay="true"
      />
      <Digit
        value={display[3]}
        className={animate ? `${animations[animationIndex].right}` : undefined}
        data-testid="chronometer-ss"
      />
    </>
  );
};

export default Timer;
