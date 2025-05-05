import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BooksCollectionDisplay from "./BooksCollectionDisplay";

const mockApiResponse = {
  docs: [
    {
      key: "1",
      title: "Test Mathematics Book",
      author_name: ["Test Author"],
      first_publish_year: 2020,
      cover_i: 12345,
      ratings_average: 4.5,
      edition_count: 3,
    },
  ],
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockApiResponse),
  })
);

jest.mock("../Products/Navbar", () => () => <div>Navbar</div>);
jest.mock("../LandingPage/FooterSection", () => () => <div>Footer</div>);

describe("BooksCollectionDisplay", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders book title after data loads", async () => {
    render(<BooksCollectionDisplay />);

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Test Mathematics Book")).toBeInTheDocument();
    expect(screen.getByText("Academic Book Collections")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
    expect(screen.getByText("2020")).toBeInTheDocument();
  });
});
