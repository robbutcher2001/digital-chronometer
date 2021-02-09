import React from "react";
import { render } from "@testing-library/react";

import ShareIcon from ".";

describe("ShareIcon component", () => {
  beforeAll(() => {
    window.navigator.clipboard = {
      writeText: jest.fn(),
    };
  });

  it("should be accessible via role", () => {
    const { getByRole } = render(<ShareIcon />);

    expect(getByRole("button", { name: "share" })).toBeInTheDocument();
  });

  it("should be accessible via aria-label", () => {
    const { getByLabelText } = render(<ShareIcon />);

    expect(getByLabelText("share")).toBeInTheDocument();
  });

  it("should copy URL to clipboard when clicked", () => {
    const { getByRole } = render(<ShareIcon />);

    getByRole("button", { name: "share" }).click();

    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
  });

  it("should show confirmation only when button is clicked and focused", () => {
    const { getByRole, queryByTestId } = render(<ShareIcon />);

    expect(queryByTestId("share_confirmed")).not.toBeInTheDocument();

    getByRole("button", { name: "share" }).click();

    expect(queryByTestId("share_confirmed")).toBeInTheDocument();

    getByRole("button", { name: "share" }).blur();

    expect(queryByTestId("share_confirmed")).not.toBeInTheDocument();
  });
});
