import React from "react";
import { render } from "@testing-library/react";

import Timer from ".";

describe("Timer component", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("should render the seconds (0) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={0} running={false} />);

    expect(getByTestId("chronometer-m")).toBe("0");
    expect(getByTestId("chronometer-mm")).toBe("0");
    expect(getByTestId("chronometer-s")).toBe("0");
    expect(getByTestId("chronometer-ss")).toBe("0");
  });

  it("should render the seconds (30) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={30} running={false} />);

    expect(getByTestId("chronometer-m")).toBe("0");
    expect(getByTestId("chronometer-mm")).toBe("0");
    expect(getByTestId("chronometer-s")).toBe("3");
    expect(getByTestId("chronometer-ss")).toBe("0");
  });

  it("should render the seconds (59) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={59} running={false} />);

    expect(getByTestId("chronometer-m")).toBe("0");
    expect(getByTestId("chronometer-mm")).toBe("0");
    expect(getByTestId("chronometer-s")).toBe("5");
    expect(getByTestId("chronometer-ss")).toBe("9");
  });

  it("should render the seconds (60) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={60} running={false} />);

    expect(getByTestId("chronometer-m")).toBe("0");
    expect(getByTestId("chronometer-mm")).toBe("1");
    expect(getByTestId("chronometer-s")).toBe("0");
    expect(getByTestId("chronometer-ss")).toBe("0");
  });

  it("should render the seconds (61) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={61} running={false} />);

    expect(getByTestId("chronometer-m")).toBe("0");
    expect(getByTestId("chronometer-mm")).toBe("1");
    expect(getByTestId("chronometer-s")).toBe("0");
    expect(getByTestId("chronometer-ss")).toBe("1");
  });

  it("should render the seconds (90) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={90} running={false} />);

    expect(getByTestId("chronometer-m")).toBe("0");
    expect(getByTestId("chronometer-mm")).toBe("1");
    expect(getByTestId("chronometer-s")).toBe("3");
    expect(getByTestId("chronometer-ss")).toBe("0");
  });

  it("should render the seconds (300) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={300} running={false} />);

    expect(getByTestId("chronometer-m")).toBe("0");
    expect(getByTestId("chronometer-mm")).toBe("5");
    expect(getByTestId("chronometer-s")).toBe("0");
    expect(getByTestId("chronometer-ss")).toBe("0");
  });

  it("should render the seconds (502) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={502} running={false} />);

    expect(getByTestId("chronometer-m")).toBe("0");
    expect(getByTestId("chronometer-mm")).toBe("8");
    expect(getByTestId("chronometer-s")).toBe("2");
    expect(getByTestId("chronometer-ss")).toBe("2");
  });

  it("should start the timer", () => {
    const { getByTestId } = render(<Timer seconds={10} running={true} />);

    jest.runAllTimers();

    expect(getByTestId("chronometer-m")).toBe("0");
    expect(getByTestId("chronometer-mm")).toBe("0");
    expect(getByTestId("chronometer-s")).toBe("0");
    expect(getByTestId("chronometer-ss")).toBe("0");
  });

  it("should stop the timer", () => {
    const { getByTestId, rerender } = render(
      <Timer seconds={10} running={true} />
    );

    jest.advanceTimersByTime(1000);

    rerender(<Timer seconds={10} running={false} />);

    expect(getByTestId("chronometer-m")).toBe("0");
    expect(getByTestId("chronometer-mm")).toBe("0");
    expect(getByTestId("chronometer-s")).toBe("0");
    expect(getByTestId("chronometer-ss")).toBe("9");
  });

  it("should resume the timer", () => {
    const { getByTestId, rerender } = render(
      <Timer seconds={10} running={true} />
    );

    jest.advanceTimersByTime(1000);

    rerender(<Timer seconds={10} running={false} />);

    expect(getByTestId("chronometer-m")).toBe("0");
    expect(getByTestId("chronometer-mm")).toBe("0");
    expect(getByTestId("chronometer-s")).toBe("0");
    expect(getByTestId("chronometer-ss")).toBe("9");

    rerender(<Timer seconds={10} running={true} />);

    jest.advanceTimersByTime(1000);

    expect(getByTestId("chronometer-ss")).not.toBe("9");
  });
});
