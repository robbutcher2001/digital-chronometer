import React from 'react';
import { render, fireEvent } from '@testing-library/react'

import SetTime from '.';

describe('SetTime component', () => {
    it('should default to `: 0`', () => {
        const { getByRole } = render(
            <SetTime />
        );

        const input: HTMLInputElement = getByRole('input') as HTMLInputElement;

        expect(input.value).toBe(': 0');
    });

    it('should display the value entered up to single second', () => {
        const { getByRole } = render(
            <SetTime />
        );

        const input: HTMLInputElement = getByRole('input') as HTMLInputElement;

        fireEvent.change(input, { target: { value: '5' } })
        expect(input.value).toBe(': 5');
    });

    it('should display the value entered up to double second', () => {
        const { getByRole } = render(
            <SetTime />
        );

        const input: HTMLInputElement = getByRole('input') as HTMLInputElement;

        fireEvent.change(input, { target: { value: '54' } })
        expect(input.value).toBe(':54');
    });

    it('should display the value entered up to single minute', () => {
        const { getByRole } = render(
            <SetTime />
        );

        const input: HTMLInputElement = getByRole('input') as HTMLInputElement;

        fireEvent.change(input, { target: { value: '320' } })
        expect(input.value).toBe('3:20');
    });

    it('should display the value entered up to double minute', () => {
        const { getByRole } = render(
            <SetTime />
        );

        const input: HTMLInputElement = getByRole('input') as HTMLInputElement;

        fireEvent.change(input, { target: { value: '3201' } })
        expect(input.value).toBe('32:01');
    });

    it('should ignore letters entered', () => {
        const { getByRole } = render(
            <SetTime />
        );

        const input: HTMLInputElement = getByRole('input') as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'abc' } })
        expect(input.value).toBe(': 0');
    });

    it('should ignore special characters entered', () => {
        const { getByRole } = render(
            <SetTime />
        );

        const input: HTMLInputElement = getByRole('input') as HTMLInputElement;

        fireEvent.change(input, { target: { value: '!$*' } })
        expect(input.value).toBe(': 0');
    });

    it('should ignore invalid characters entered after valid characters entered', () => {
        const { getByRole } = render(
            <SetTime />
        );

        const input: HTMLInputElement = getByRole('input') as HTMLInputElement;

        fireEvent.change(input, { target: { value: '20' } })
        expect(input.value).toBe(':20');
        fireEvent.change(input, { target: { value: 'a!j' } })
        expect(input.value).toBe(':20');
    });
});
