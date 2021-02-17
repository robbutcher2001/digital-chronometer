import React from "react";
import { render } from "@testing-library/react";

import Tips from ".";

describe("Tips component", () => {
  it("should render at least one h1", () => {
    const { queryByRole } = render(<Tips />);

    expect(queryByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("should render at least one h2", () => {
    const { queryAllByRole } = render(<Tips />);

    expect(queryAllByRole("heading", { level: 2 }).length).toBeGreaterThan(1);
  });

  it("should render at least one ul with li children", () => {
    const { queryAllByRole } = render(<Tips />);

    expect(queryAllByRole("list").length).toBeGreaterThan(1);
    expect(queryAllByRole("listitem").length).toBeGreaterThan(1);
  });
});
