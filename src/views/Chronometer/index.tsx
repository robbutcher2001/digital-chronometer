import { FC, useState, MouseEvent } from "react";
import { StartButton, StopButton } from "../../components/Button";
import SetTime from "../../components/SetTime";
import Timer from "../../components/Timer";

const convertToSeconds = (hhmm: string) => {
  const split = hhmm.split(":");
  const hh = parseInt(split[0]) || 0;
  const mm = parseInt(split[1]) || 0;
  return hh * 60 + mm;
};

const Chronometer: FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>(":  ");
  const [secondsAhead, setSecondsAhead] = useState<number>(30);
  const [running, setRunning] = useState<boolean>(false);

  const enableEditMode = () => {
    if (!editMode) {
      setEditMode(true);
      setRunning(false);
    }
  };

  const disableEditMode = () => editMode && setEditMode(false);

  const stopPropagation = (event: MouseEvent<any>) => event.stopPropagation();

  const updateUserInput = (value: string) => {
    setUserInput(value);
    setSecondsAhead(convertToSeconds(value));
  };

  const startTimer = () => setRunning(true);

  const stopTimer = () => setRunning(false);

  return (
    <div id="toggleWrap" onClick={disableEditMode}>
      {editMode ? (
        <div onClick={stopPropagation}>
          <SetTime
            time={userInput}
            updateUserInput={updateUserInput}
            onSubmit={disableEditMode}
          />
        </div>
      ) : (
        <div onClick={enableEditMode}>
          <Timer seconds={secondsAhead} running={running} />
        </div>
      )}
      <div>
        <StartButton callback={startTimer} disabled={running || editMode} />
        <StopButton callback={stopTimer} disabled={!running || editMode} />
      </div>
    </div>
  );
};

export default Chronometer;
