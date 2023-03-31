import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Pagination from "../components/pagination/Pagination";

describe("Pagination", () => {
  const onPageChangeMock = jest.fn();
  const totalCount = 10;
  const pageSize = 2;
  const siblingCount = 1;

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  it("renders pagination correctly", () => {
    render(
      <Pagination
        onPageChange={onPageChangeMock}
        currentPage={3}
        totalCount={totalCount}
        pageSize={pageSize}
        siblingCount={siblingCount}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();

    // Check for the current page and surrounding pages
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toHaveClass("selected");
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("calls onPageChange correctly when a page link is clicked", () => {
    render(
      <Pagination
        onPageChange={onPageChangeMock}
        currentPage={3}
        totalCount={totalCount}
        pageSize={pageSize}
        siblingCount={siblingCount}
      />
    );

    fireEvent.click(screen.getByText("2"));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText("4"));
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

});
