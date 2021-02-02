import React from "react";
import { render } from "@testing-library/react";

import Division from ".";

describe("Division component", () => {
  it("should display division seperator", () => {
    const { queryByText } = render(<Division />);

    expect(queryByText(":")).toBeInTheDocument();
  });
});
