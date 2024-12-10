import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AboutComponent from "./AboutComponent";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("AboutComponent", () => {
  it("shouldrenders with correct layout class", () => {
    renderWithRouter(<AboutComponent layout="layout_padding" />);
    const section = screen.getByRole("region", { name: "About Section" });
    expect(section).toHaveClass("about_section layout_padding");
  });

  it("should renders about content", () => {
    renderWithRouter(<AboutComponent layout="layout_padding" />);
    expect(screen.getByText("About us")).toBeInTheDocument();
    expect(screen.getByText(/There are many variations/)).toBeInTheDocument();
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  it("should renders image with correct attributes", () => {
    renderWithRouter(<AboutComponent layout="layout_padding" />);
    const image = screen.getByAltText("about-img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "mock-image-path");
  });

  it("should renders the 'Read More' link to home page", () => {
    renderWithRouter(<AboutComponent layout="layout_padding" />);
    const link = screen.getByText("Read More");
    expect(link).toHaveAttribute("href", "/");
  });

  it("should match snapshot", () => {
    const { asFragment } = renderWithRouter(
      <AboutComponent layout="layout_padding" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
