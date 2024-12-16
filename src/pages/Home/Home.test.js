import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

const renderHome = () => {
  return render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

describe("Home Page", () => {
  it("should render all components", () => {
    renderHome();

    // Feature component
    expect(screen.getByText("Repair")).toBeInTheDocument();
    expect(screen.getByText("Improve")).toBeInTheDocument();
    expect(screen.getByText("Maintain")).toBeInTheDocument();

    //  About component
    expect(screen.getByText("About us")).toBeInTheDocument();

    // Professional component
    expect(screen.getByText(/We Provide Professional/i)).toBeInTheDocument();

    // Service component
    expect(screen.getByText("Our Services")).toBeInTheDocument();

    // Client component
    expect(screen.getByText("What Our Clients Say")).toBeInTheDocument();

    // Contact component
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = renderHome();
    expect(asFragment()).toMatchSnapshot();
  });
});
