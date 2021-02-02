import { FC } from 'react';

type DigitProps = {
    value?: string
};

const Digit: FC<DigitProps> = ({ value = '' }) => {
    const regEx = new RegExp(/^\d{1}$/);
    const digit = regEx.exec(value);

    return (
        <div>{digit ? digit[0] : 0}</div>
    );
};

export default Digit;
