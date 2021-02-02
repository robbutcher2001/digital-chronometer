import React from 'react';
import { render } from '@testing-library/react'

import Digit from '.';

describe('Digit component', () => {
    it('should display 0 by default', () => {
        const { getByText } = render(
            <Digit />
        );

        expect(getByText('0')).toBeTruthy();
    });

    it('should display the single-digit number passed in state', () => {
        const { getByText } = render(
            <Digit value={3} />
        );

        expect(getByText('3')).toBeTruthy();
    });

    it('should not display the mulitple-digit numbers passed in state but default to 0', () => {
        const { getByText } = render(
            <Digit value={27} />
        );

        expect(getByText('27')).toBeFalsy();
        expect(getByText('0')).toBeTruthy();
    });

    it('should not display letters passed in state and default to 0', () => {
        const { getByText } = render(
            <Digit value={'a'} />
        );

        expect(getByText('a')).toBeFalsy();
        expect(getByText('0')).toBeTruthy();
    });
    it('should not display special characters passed in state and default to 0', () => {
        const { getByText } = render(
            <Digit value={'!'} />
        );

        expect(getByText('!')).toBeFalsy();
        expect(getByText('0')).toBeTruthy();
    });

    it('should handle empty values passed in state and default to 0', () => {
        const { getByText } = render(
            <Digit value={''} />
        );

        expect(getByText('0')).toBeTruthy();
    });

    it('should handle null values passed in state and default to 0', () => {
        const { getByText } = render(
            <Digit value={null} />
        );

        expect(getByText('0')).toBeTruthy();
    });

    it('should handle undefined values passed in state and default to 0', () => {
        const { getByText } = render(
            <Digit value={undefined} />
        );

        expect(getByText('0')).toBeTruthy();
    });
});
