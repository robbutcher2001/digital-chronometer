import React from "react";
import { render, act } from "@testing-library/react";

import Timer from ".";

describe("Timer component", () => {
  beforeAll(() => {
    // jest.useFakeTimers();
    // Tests are brittle as they use real time. Get working with Jest fake timer.
  });

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  it("should render the seconds (0) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={0} running={false} />);

    expect(getByTestId("chronometer-m")).toHaveTextContent("0");
    expect(getByTestId("chronometer-mm")).toHaveTextContent("0");
    expect(getByTestId("chronometer-s")).toHaveTextContent("0");
    expect(getByTestId("chronometer-ss")).toHaveTextContent("0");
  });

  it("should render the seconds (30) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={30} running={false} />);

    expect(getByTestId("chronometer-m")).toHaveTextContent("0");
    expect(getByTestId("chronometer-mm")).toHaveTextContent("0");
    expect(getByTestId("chronometer-s")).toHaveTextContent("3");
    expect(getByTestId("chronometer-ss")).toHaveTextContent("0");
  });

  it("should render the seconds (59) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={59} running={false} />);

    expect(getByTestId("chronometer-m")).toHaveTextContent("0");
    expect(getByTestId("chronometer-mm")).toHaveTextContent("0");
    expect(getByTestId("chronometer-s")).toHaveTextContent("5");
    expect(getByTestId("chronometer-ss")).toHaveTextContent("9");
  });

  it("should render the seconds (60) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={60} running={false} />);

    expect(getByTestId("chronometer-m")).toHaveTextContent("0");
    expect(getByTestId("chronometer-mm")).toHaveTextContent("1");
    expect(getByTestId("chronometer-s")).toHaveTextContent("0");
    expect(getByTestId("chronometer-ss")).toHaveTextContent("0");
  });

  it("should render the seconds (61) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={61} running={false} />);

    expect(getByTestId("chronometer-m")).toHaveTextContent("0");
    expect(getByTestId("chronometer-mm")).toHaveTextContent("1");
    expect(getByTestId("chronometer-s")).toHaveTextContent("0");
    expect(getByTestId("chronometer-ss")).toHaveTextContent("1");
  });

  it("should render the seconds (90) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={90} running={false} />);

    expect(getByTestId("chronometer-m")).toHaveTextContent("0");
    expect(getByTestId("chronometer-mm")).toHaveTextContent("1");
    expect(getByTestId("chronometer-s")).toHaveTextContent("3");
    expect(getByTestId("chronometer-ss")).toHaveTextContent("0");
  });

  it("should render the seconds (300) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={300} running={false} />);

    expect(getByTestId("chronometer-m")).toHaveTextContent("0");
    expect(getByTestId("chronometer-mm")).toHaveTextContent("5");
    expect(getByTestId("chronometer-s")).toHaveTextContent("0");
    expect(getByTestId("chronometer-ss")).toHaveTextContent("0");
  });

  it("should render the seconds (502) provided as a time", () => {
    const { getByTestId } = render(<Timer seconds={502} running={false} />);

    expect(getByTestId("chronometer-m")).toHaveTextContent("0");
    expect(getByTestId("chronometer-mm")).toHaveTextContent("8");
    expect(getByTestId("chronometer-s")).toHaveTextContent("2");
    expect(getByTestId("chronometer-ss")).toHaveTextContent("2");
  });

  it("should start the timer", async () => {
    const { getByTestId } = render(<Timer seconds={2} running={true} />);

    expect(getByTestId("chronometer-m")).toHaveTextContent("0");
    expect(getByTestId("chronometer-mm")).toHaveTextContent("0");
    expect(getByTestId("chronometer-s")).toHaveTextContent("0");
    expect(getByTestId("chronometer-ss")).toHaveTextContent("2");

    await act(async () => {
      await wait(3000);
    });

    expect(getByTestId("chronometer-m")).toHaveTextContent("0");
    expect(getByTestId("chronometer-mm")).toHaveTextContent("0");
    expect(getByTestId("chronometer-s")).toHaveTextContent("0");
    expect(getByTestId("chronometer-ss")).toHaveTextContent("0");
  });

  it("should stop the timer", async () => {
    const { getByTestId, rerender } = render(
      <Timer seconds={10} running={true} />
    );

    await act(async () => {
      await wait(1000);
    });

    rerender(<Timer seconds={10} running={false} />);

    expect(getByTestId("chronometer-m")).toHaveTextContent("0");
    expect(getByTestId("chronometer-mm")).toHaveTextContent("0");
    expect(getByTestId("chronometer-s")).toHaveTextContent("0");
    expect(getByTestId("chronometer-ss")).toHaveTextContent("9");

    await act(async () => {
      await wait(2000);
    });

    expect(getByTestId("chronometer-m")).toHaveTextContent("0");
    expect(getByTestId("chronometer-mm")).toHaveTextContent("0");
    expect(getByTestId("chronometer-s")).toHaveTextContent("0");
    expect(getByTestId("chronometer-ss")).toHaveTextContent("9");
  });

  it("should resume the timer", async () => {
    const { getByTestId, rerender } = render(
      <Timer seconds={10} running={true} />
    );

    await act(async () => {
      await wait(1000);
    });

    rerender(<Timer seconds={10} running={false} />);

    expect(getByTestId("chronometer-m")).toHaveTextContent("0");
    expect(getByTestId("chronometer-mm")).toHaveTextContent("0");
    expect(getByTestId("chronometer-s")).toHaveTextContent("0");
    expect(getByTestId("chronometer-ss")).toHaveTextContent("9");

    rerender(<Timer seconds={10} running={true} />);

    await act(async () => {
      await wait(2000);
    });

    expect(getByTestId("chronometer-ss")).not.toHaveTextContent("9");
  });
});
