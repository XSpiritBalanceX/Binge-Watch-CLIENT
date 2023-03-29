import { render, screen } from "@testing-library/react";
import MenuInCatalog from "./MenuInCatalog";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const newUrl = {
  detective: "http://localhost/catalog/детектив",
  drama: "http://localhost/catalog/драма",
  comedy: "http://localhost/catalog/комедия",
  melodrama: "http://localhost/catalog/мелодрама",
};

describe("Menu in catalog test:", () => {
  it("should render active all series link", () => {
    render(<MenuInCatalog />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Все/i)).toBeInTheDocument();
  });

  it("should set new url if user clicks on different links", async () => {
    render(<MenuInCatalog />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.click(screen.getByText("Детектив"));
    expect(global.window.location.href).toContain(encodeURI(newUrl.detective));
    await user.click(screen.getByText("Драма"));
    expect(global.window.location.href).toContain(encodeURI(newUrl.drama));
    await user.click(screen.getByText("Комедия"));
    expect(global.window.location.href).toContain(encodeURI(newUrl.comedy));
    await user.click(screen.getByText("Мелодрама"));
    expect(global.window.location.href).toContain(encodeURI(newUrl.melodrama));
  });
});
