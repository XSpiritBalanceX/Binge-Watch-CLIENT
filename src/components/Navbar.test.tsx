import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./Navbar";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("./SignInOut", () => () => "SignInOut");

jest.mock("../hooks/useTypedSelector");

describe("Navbar tests:", () => {
  it("should render the component", () => {
    render(<NavBar />, { wrapper: BrowserRouter });
    expect(screen.getByText("Главная")).toBeInTheDocument();
  });

  it("should render the component without the page icon if user isn't authorized", () => {
    const { container } = render(<NavBar />, { wrapper: BrowserRouter });
    expect(container).not.toHaveClass("bi bi-person-circle");
  });

  it("should find the image on the page ", () => {
    const { getByAltText } = render(<NavBar />, { wrapper: BrowserRouter });
    const image = getByAltText("logo");
    expect(image).toHaveClass("logo");
  });

  it("should render the button if user click on the link of catalog", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route
            path="/catalog/сериалы"
            element={<button>Посмотреть</button>}
          />
        </Routes>
      </MemoryRouter>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("Каталог"));
    expect(await screen.findByText("Посмотреть")).toBeInTheDocument();
  });
});
