import { FC, ChangeEvent, FormEvent } from "react";
import "./index.css";

type SetTimeProps = {
  time?: string;
  updateUserInput: (value: string) => void;
  onSubmit: () => void;
};

const SetTime: FC<SetTimeProps> = ({
  time = ":  ",
  updateUserInput,
  onSubmit,
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const userInput = event.currentTarget.value
      .replace(/:/g, "")
      .replace(/ /g, "");

    if (!userInput) {
      updateUserInput(`:  `);
    } else {
      const regEx = new RegExp(/^\d{1,4}$/);
      const time = regEx.exec(userInput);

      if (time && time[0]) {
        const digits = time[0];
        switch (digits.length) {
          case 1:
            updateUserInput(`: ${digits}`);
            break;
          case 2:
            updateUserInput(`:${digits}`);
            break;
          case 3:
            updateUserInput(`${digits.substring(0, 1)}:${digits.substring(1)}`);
            break;
          case 4:
            updateUserInput(`${digits.substring(0, 2)}:${digits.substring(2)}`);
            break;
          default:
        }
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="settime" aria-label="Set the time to countdown from">
        <input
          id="settime"
          name="settime"
          type="text"
          value={time}
          onChange={onChange}
          autoFocus
        />
      </label>
    </form>
  );
};

export default SetTime;
