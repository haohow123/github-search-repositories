import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

test("renders App Summary Text ", () => {
  render(
    <App
      people={4}
      rooms={[
        { roomId: "202101", min: 1, max: 4 },
        { roomId: "202102", min: 0, max: 4 },
      ]}
    />
  );
  const summaryElement = screen.getByText(/住客人數：4 人 \/ 2 房/i);
  expect(summaryElement).toBeInTheDocument();
});
