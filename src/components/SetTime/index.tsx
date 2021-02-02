import { FC, ChangeEvent, useEffect } from 'react';

type SetTimeProps = {
    value?: string,
    updateState: (value: string) => void
};

const SetTime: FC<SetTimeProps> = ({ value, updateState }) => {

    useEffect(() => {
        if (!value) {
            updateState(': 0');
        }
    }, [value, updateState]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const regEx = new RegExp(/^\d{1,4}$/);
        const time = regEx.exec(event.currentTarget.value.replace(':', ''));

        if (time && time[0]) {
            const digits = time[0];
            switch (digits.length) {
                case 1:
                    updateState(`: ${digits}`);
                    break;
                case 2:
                    updateState(`:${digits}`);
                    break;
                case 3:
                    updateState(`${digits.substring(0, 1)}:${digits.substring(1)}`);
                    break;
                case 4:
                    updateState(`${digits.substring(0, 2)}:${digits.substring(2)}`);
                    break;
                default:
            }
        }
    };

    return (
        <label htmlFor='settime' aria-label='Set the time to countdown from'>
            <input
                id='settime'
                name='settime'
                type='text'
                value={value}
                onChange={onChange}
            />
        </label>
    );
};

export default SetTime;