import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Header component", () => {
  it("should toggle menu when hamburger is clicked", () => {
    render(<Header />);
    const hamburger = screen.getByRole("button");

    fireEvent.click(hamburger);

    expect(hamburger).toHaveClass("active");
  });
});
