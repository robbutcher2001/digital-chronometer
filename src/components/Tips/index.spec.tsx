import React from "react";
import { render } from "@testing-library/react";

import Tips from ".";

describe("Tips component", () => {
  it("should render at least one h1", () => {
    const { queryByRole } = render(<Tips />);

    expect(queryByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("should render at least one h2", () => {
    const { queryByRole } = render(<Tips />);

    expect(queryByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("should render at least one ul with li children", () => {
    const { queryByRole } = render(<Tips />);

    expect(queryByRole("list")).toBeInTheDocument();
    expect(queryByRole("listitem")).toBeInTheDocument();
  });
});
