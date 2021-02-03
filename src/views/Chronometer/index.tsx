import { FC, useState, MouseEvent } from "react";
import SetTime from "../../components/SetTime";
import Timer from "../../components/Timer";

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
        <Timer />
      )}
    </div>
  );
};

export default Chronometer;
