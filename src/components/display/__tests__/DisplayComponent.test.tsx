import { render, screen } from "@testing-library/react";
import { DisplayComponent } from "../display-component/DisplayComponent";

it("Display message", () => {
  render(<DisplayComponent operation="49+98" lastValue="980" />);
  screen.getByText("49+98");
  screen.getByText("980");
});
