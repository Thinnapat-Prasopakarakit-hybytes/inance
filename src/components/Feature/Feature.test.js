import React from "react";
import { render, screen } from "@testing-library/react";
import Feature from "./Feature";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("../../assets/images/tools.svg", () => ({
  ReactComponent: () => <svg />,
}));

jest.mock("../../assets/images/construction.svg", () => ({
  ReactComponent: () => <svg />,
}));

jest.mock("../../assets/images/maintenance.svg", () => ({
  ReactComponent: () => <svg />,
}));

const renderFeatureComponent = () => {
  return render(
    <BrowserRouter>
      <Feature />
    </BrowserRouter>
  );
};

describe("Feature Component", () => {
  it("should render all feature boxes", () => {
    renderFeatureComponent();
    const boxes = screen.getAllByRole("heading");
    expect(boxes).toHaveLength(3);
  });

  it("should render all feature titles", () => {
    renderFeatureComponent();
    expect(screen.getByText("Repair")).toBeInTheDocument();
    expect(screen.getByText("Improve")).toBeInTheDocument();
    expect(screen.getByText("Maintain")).toBeInTheDocument();
  });

  it("should render all icon containers", () => {
    renderFeatureComponent();
    expect(screen.getByTestId("tools-icon")).toBeInTheDocument();
    expect(screen.getByTestId("construction-icon")).toBeInTheDocument();
    expect(screen.getByTestId("maintenance-icon")).toBeInTheDocument();
  });

  it("should have 'active' class on the Improve feature", () => {
    renderFeatureComponent();
    const improveBox = screen.getByTestId("active");
    expect(improveBox).toHaveClass("active");
  });

  it("should match snapshot", () => {
    const { asFragment } = renderFeatureComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
