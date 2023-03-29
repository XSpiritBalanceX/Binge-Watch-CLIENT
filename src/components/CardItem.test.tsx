import { render, screen } from "@testing-library/react";
import CardItem from "./CardItem";

const fakeInfoSeries = {
  id: "74d587ec-9172-4173-a270-8f8581131b1a",
  name: "Neque porro",
  url: "https://fastly.picsum.photos/id/772/200/300.jpg?hmac=jap7uDpPOJZv41ksTZ3pa9FnXwuaBUpnni4hYBjZtfM",
  urlscreen:
    "https://fastly.picsum.photos/id/472/200/200.jpg?hmac=PScxKeNxgxcauarhbWIWesyo4VsouCtfdX8fNTy9HRI",
  year: 12345,
  seasons: 12,
  genre: "dolorem, ipsum, quia, dolor ",
  description:
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  dateofnewseason: "закрыт",
};

describe("Card item test:", () => {
  it("should render info about data of new seasons", async () => {
    render(<CardItem infoSeries={fakeInfoSeries} />);
    let dataSeason;
    if (fakeInfoSeries.dateofnewseason !== "закрыт") {
      dataSeason = await screen.findByText(
        `Дата выхода ${fakeInfoSeries.seasons + 1} сезона - ${
          fakeInfoSeries.dateofnewseason
        }`
      );
    } else {
      dataSeason = await screen.findByText("Сериал закрыт");
    }

    expect(dataSeason).toBeInTheDocument();
  });
});
