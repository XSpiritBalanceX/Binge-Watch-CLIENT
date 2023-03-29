import { render, screen } from "@testing-library/react";
import MainPage from "./MainPage";

describe("Main page test:", () => {
  it("should render main page", async () => {
    render(<MainPage />);
    const pageMain = await screen.findByText("Page Main");
    expect(pageMain).toBeInTheDocument();
  });
});
