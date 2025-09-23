import { render, screen } from "@testing-library/react";
import Button from "./Button";

test("render button with label", () => {
  render(<Button label="Click Me" />);
  expect(screen.getByText("Click Me")).toBeInTheDocument();
});
