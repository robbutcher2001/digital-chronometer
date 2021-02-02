import React from "react";
import { render } from "@testing-library/react";

import Digit from ".";

describe("Digit component", () => {
  it("should display 0 by default", () => {
    const { queryByText } = render(<Digit />);

    expect(queryByText("0")).toBeInTheDocument();
  });

  it("should display the single-digit number passed in state", () => {
    const { queryByText } = render(<Digit value={3} />);

    expect(queryByText("3")).toBeInTheDocument();
  });

  it("should not display the mulitple-digit numbers passed in state but default to 0", () => {
    const { queryByText } = render(<Digit value={27} />);

    expect(queryByText("27")).not.toBeInTheDocument();
    expect(queryByText("0")).toBeInTheDocument();
  });

  it("should not display letters passed in state and default to 0", () => {
    const { queryByText } = render(<Digit value={"a"} />);

    expect(queryByText("a")).not.toBeInTheDocument();
    expect(queryByText("0")).toBeInTheDocument();
  });
  it("should not display special characters passed in state and default to 0", () => {
    const { queryByText } = render(<Digit value={"!"} />);

    expect(queryByText("!")).not.toBeInTheDocument();
    expect(queryByText("0")).toBeInTheDocument();
  });

  it("should handle empty values passed in state and default to 0", () => {
    const { queryByText } = render(<Digit value={""} />);

    expect(queryByText("0")).toBeInTheDocument();
  });

  it("should handle null values passed in state and default to 0", () => {
    const { queryByText } = render(<Digit value={null} />);

    expect(queryByText("0")).toBeInTheDocument();
  });

  it("should handle undefined values passed in state and default to 0", () => {
    const { queryByText } = render(<Digit value={undefined} />);

    expect(queryByText("0")).toBeInTheDocument();
  });
});
