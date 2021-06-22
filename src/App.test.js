import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

test("renders App Summary Text ", () => {
  render(<App />);
  const summaryElement = screen.getByText(/Git Repositories/i);
  expect(summaryElement).toBeInTheDocument();
});
