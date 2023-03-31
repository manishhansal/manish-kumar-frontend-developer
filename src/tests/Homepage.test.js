import React from "react";
import { render, screen } from "@testing-library/react";
import Homepage from "../pages/Homepage";

describe("Homepage", () => {
  it("renders a recent launch section with title and link", () => {
    render(<Homepage />);
    const recentLaunchLink = screen.getAllByText("REWATCH");
    recentLaunchLink.forEach((element) => {
      const text = element.textContent;
      expect(text).toBe("REWATCH");
    });
  });
});
