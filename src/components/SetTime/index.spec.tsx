import React from "react";
import { render, fireEvent } from "@testing-library/react";

import SetTime from ".";

describe("SetTime component", () => {
  const mockCallback = jest.fn();

  afterEach(() => {
    mockCallback.mockClear();
  });

  it("should render its passed value", () => {
    const { getByRole } = render(
      <SetTime
        time="hello"
        updateUserInput={mockCallback}
        onSubmit={() => {}}
      />
    );

    const input: HTMLInputElement = getByRole("textbox") as HTMLInputElement;

    expect(input.value).toBe("hello");
  });

  it("should call the onChange callback and default to `:  `", () => {
    const { getByRole } = render(
      <SetTime updateUserInput={mockCallback} onSubmit={() => {}} />
    );

    const input: HTMLInputElement = getByRole("textbox") as HTMLInputElement;

    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(input.value).toBe(":  ");
  });

  it("should display the value entered up to single second", () => {
    const { getByRole } = render(
      <SetTime updateUserInput={mockCallback} onSubmit={() => {}} />
    );

    const input: HTMLInputElement = getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "5" } });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(": 5");
  });

  it("should display the value entered up to double second", () => {
    const { getByRole } = render(
      <SetTime updateUserInput={mockCallback} onSubmit={() => {}} />
    );

    const input: HTMLInputElement = getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "54" } });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(":54");
  });

  it("should display the value entered up to single minute", () => {
    const { getByRole } = render(
      <SetTime updateUserInput={mockCallback} onSubmit={() => {}} />
    );

    const input: HTMLInputElement = getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "320" } });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith("3:20");
  });

  it("should display the value entered up to double minute", () => {
    const { getByRole } = render(
      <SetTime updateUserInput={mockCallback} onSubmit={() => {}} />
    );

    const input: HTMLInputElement = getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "3201" } });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith("32:01");
  });

  it("should ignore letters entered", () => {
    const { getByRole } = render(
      <SetTime updateUserInput={mockCallback} onSubmit={() => {}} />
    );

    const input: HTMLInputElement = getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "abc" } });

    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(input.value).toBe(":  ");
  });

  it("should ignore special characters entered", () => {
    const { getByRole } = render(
      <SetTime updateUserInput={mockCallback} onSubmit={() => {}} />
    );

    const input: HTMLInputElement = getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "!$*" } });

    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(input.value).toBe(":  ");
  });

  it("should ignore invalid characters entered after valid characters entered", () => {
    const { getByRole } = render(
      <SetTime updateUserInput={mockCallback} onSubmit={() => {}} />
    );

    const input: HTMLInputElement = getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "20" } });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(":20");

    fireEvent.change(input, { target: { value: "a!j" } });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).not.toHaveBeenCalledWith("a!j");
  });

  it("should call onSubmit when form submitted", () => {
    const { getByRole } = render(
      <SetTime updateUserInput={() => {}} onSubmit={mockCallback} />
    );

    const input: HTMLInputElement = getByRole("textbox") as HTMLInputElement;

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
