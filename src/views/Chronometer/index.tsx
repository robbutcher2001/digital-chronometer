import { FC, useState, MouseEvent } from "react";
import Digit from "../../components/Digit";
import Division from "../../components/Division";
import SetTime from "../../components/SetTime";

const Chronometer: FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>(":  ");
  const [secondsAhead, setSecondsAhead] = useState<number>(0);

  const enableEditMode = () => !editMode && setEditMode(true);

  const disableEditMode = () => editMode && setEditMode(false);

  const stopPropagation = (event: MouseEvent<any>) => event.stopPropagation();

  const updateUserInput = (value: string) => {
    setUserInput(value);
    setSecondsAhead(convertToSeconds(value));
  };

  const convertToSeconds = (hhmm: string) => {
    const split = hhmm.split(":");
    const hh = parseInt(split[0]) || 0;
    const mm = parseInt(split[1]) || 0;
    return hh * 60 + mm;
  };

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
          <Digit value={"0"} data-testid="chronometer-m" />
          <Digit value={"0"} data-testid="chronometer-mm" />
          <Division data-testid="chronometer-div" />
          <Digit value={"0"} data-testid="chronometer-s" />
          <Digit value={"4"} data-testid="chronometer-ss" />
          {console.log("seconds ahead", secondsAhead)}
        </div>
      )}
    </div>
  );
};

export default Chronometer;
