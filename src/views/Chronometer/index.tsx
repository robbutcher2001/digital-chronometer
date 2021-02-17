import { FC, useState, MouseEvent } from "react";
import { StartButton, StopButton } from "../../components/Button";
import ShareIcon from "../../components/ShareIcon";
import Tips from "../../components/Tips";
import SetTime from "../../components/SetTime";
import Timer from "../../components/Timer";

const convertToSeconds = (hhmm: string) => {
  const split = hhmm.split(":");
  const hh = parseInt(split[0]) || 0;
  const mm = parseInt(split[1]) || 0;
  return hh * 60 + mm;
};

const Chronometer: FC = () => {
  const [editMode, setEditMode] = useState<boolean>(true);
  const [userInput, setUserInput] = useState<string>(":30");
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
    <>
      <div className="overlay top-right" />
      <div className="overlay middle-right" />
      <div className="overlay middle-left" />
      <div className="overlay bottom-left" />
      <div className="share-icon">
        <ShareIcon />
      </div>
      <div
        id="toggle-wrap"
        onClick={disableEditMode}
        className={editMode ? "timer" : undefined}
      >
        <div className="glass">
          <div className="left">
            <Tips />
          </div>
          <div className="right">
            {editMode ? (
              <div className="set-timer" onClick={stopPropagation}>
                <SetTime
                  time={userInput}
                  updateUserInput={updateUserInput}
                  onSubmit={disableEditMode}
                />
              </div>
            ) : (
              <div
                onClick={enableEditMode}
                className="timer"
                data-testid="chronometer-toggle-edit"
              >
                <Timer seconds={secondsAhead} running={running} />
              </div>
            )}
            <div className="buttons">
              <StartButton
                callback={startTimer}
                disabled={running || editMode}
              />
              <StopButton
                callback={stopTimer}
                disabled={!running || editMode}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chronometer;
