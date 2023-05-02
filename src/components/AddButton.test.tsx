import { render, screen, fireEvent } from "@testing-library/react";
import AddButton from "./AddButton";

jest.mock("../hooks/useTypedSelector", () => ({
  useTypedSelector: () => {
    return "someemail";
  },
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe("AddButton component test:", () => {
  it("should render the component", () => {
    render(<AddButton />);
    expect(screen.getByText("Посмотрел")).toBeInTheDocument();
  });

  it("should transfet the correct data if user click on button wached series", () => {
    const fetchSpyOn = jest.spyOn(global, "fetch");
    render(<AddButton />);
    fireEvent.click(screen.getByText("Посмотрел"));
    expect(fetchSpyOn).toHaveBeenCalledTimes(1);
    expect(fetchSpyOn).toHaveBeenCalledWith(
      "http://localhost:5000/api/actions/watched",
      {
        body: JSON.stringify({
          email: "someemail",
          numberseason: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
  });

  it("should transfet the correct data if user click on button want to watch a series", () => {
    const fetchSpyOn = jest.spyOn(global, "fetch");
    render(<AddButton />);
    fireEvent.click(screen.getByText("Хочу посмотреть"));
    expect(fetchSpyOn).toHaveBeenCalledTimes(1);
    expect(fetchSpyOn).toHaveBeenCalledWith(
      "http://localhost:5000/api/actions/desired",
      {
        body: JSON.stringify({
          email: "someemail",
          numberseason: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
  });
});
