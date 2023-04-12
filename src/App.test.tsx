import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/Navbar", () => () => <div>Navbar</div>);
jest.mock("./components/RoutesComponent", () => () => (
  <div>RoutesComponent</div>
));

describe("App test:", () => {
  it("should render the App and look for div with Navbar", () => {
    render(<App />);
    expect(screen.getByText("Navbar")).toBeInTheDocument();
  });

  it("should render the App and look for div with RoutesComponent", () => {
    render(<App />);
    expect(screen.getByText("RoutesComponent")).toBeInTheDocument();
  });

  it("should render the App and look for div with Toastify", () => {
    const { container } = render(<App />);
    expect(container.getElementsByClassName("Toastify").length).toBe(1);
  });
});
