import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CapsulePopup from "../components/CapsulePopup";

const mockData = {
  type: "Dragon 1",
  capsule_serial: "C101",
  missions: [{ name: "CRS-1" }, { name: "CRS-2" }],
  land_landings: 1,
  water_landings: 0,
  reuse_count: 2,
  status: "retired",
  last_update: "2016-03-17T00:00:00.000Z",
};

describe("CapsulePopup", () => {
  it("renders without crashing", () => {
    render(<CapsulePopup />);
  });

  it("popup is hidden when showPopupId is null", () => {
    render(<CapsulePopup showPopupId={null} />);
    const popup = screen.queryByTestId("capsule-popup");
    expect(popup).toBeNull();
  });

  it("popup is shown when showPopupId is not null", () => {
    render(<CapsulePopup showPopupId={"C101"} />);
    const popup = screen.queryByTestId("capsule-popup");
    expect(popup).not.toBeNull();
  });

  it("displays correct capsule details when showPopupId is set to a valid id", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(<CapsulePopup showPopupId={"C101"} />);
    const type = await screen.findByText(mockData.type);
    const serial = await screen.findByText(mockData.capsule_serial);
    const missions = await screen.findByText(`2 missions`);
    const landings = await screen.findByText(`1 land landings`);
    const waterLandings = await screen.findByText(`0 water landings`);
    const reuseCount = await screen.findByText(`Reused 2 times`);
    const status = await screen.findByText("Retired");
    const lastUpdate = await screen.findByText(mockData.last_update);
    expect(type).toBeInTheDocument();
    expect(serial).toBeInTheDocument();
    expect(missions).toBeInTheDocument();
    expect(landings).toBeInTheDocument();
    expect(waterLandings).toBeInTheDocument();
    expect(reuseCount).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(lastUpdate).toBeInTheDocument();
  });

  it("popup is closed when Close button is clicked", () => {
    const handleClosePopup = jest.fn();
    render(
      <CapsulePopup showPopupId={"C101"} handleClosePopup={handleClosePopup} />
    );
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    expect(handleClosePopup).toHaveBeenCalled();
  });
});
