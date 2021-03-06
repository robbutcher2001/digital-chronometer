import React from "react";
import { render } from "@testing-library/react";

import { StartButton, StopButton } from ".";

describe("StartButton component", () => {
  it("should display correct text", () => {
    const { getByRole } = render(<StartButton callback={() => {}} />);

    expect(getByRole("button", { name: "start" })).toBeInTheDocument();
  });

  it("should call the callback", () => {
    const mockCallback = jest.fn();

    const { getByRole } = render(<StartButton callback={mockCallback} />);

    getByRole("button").click();

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when requested", () => {
    const { getByRole } = render(<StartButton callback={() => {}} disabled />);

    expect(getByRole("button")).toBeDisabled();
  });
});

describe("StopButton component", () => {
  it("should display correct text", () => {
    const { getByRole } = render(<StopButton callback={() => {}} />);

    expect(getByRole("button", { name: "stop" })).toBeInTheDocument();
  });

  it("should call the callback", () => {
    const mockCallback = jest.fn();

    const { getByRole } = render(<StopButton callback={mockCallback} />);

    getByRole("button").click();

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when requested", () => {
    const { getByRole } = render(<StopButton callback={() => {}} disabled />);

    expect(getByRole("button")).toBeDisabled();
  });
});
