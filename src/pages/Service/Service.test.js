import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Service from "./Service";

const renderService = () => {
  return render(
    <BrowserRouter>
      <Service />
    </BrowserRouter>
  );
};

describe("Service Page", () => {
  it("should render service component", () => {
    renderService();
    expect(screen.getByText("Our Services")).toBeInTheDocument();
  });

  it("should render all service items", () => {
    renderService();
    expect(screen.getByText("Maintenance")).toBeInTheDocument();
    expect(screen.getByText("Electrical")).toBeInTheDocument();
    expect(screen.getByText("Plumbing")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = renderService();
    expect(asFragment()).toMatchSnapshot();
  });
});
