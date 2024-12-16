import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import About from "./About";

const renderAbout = () => {
  return render(
    <BrowserRouter>
      <About />
    </BrowserRouter>
  );
};

describe("About Page", () => {
  it("should render about content", () => {
    renderAbout();
    expect(screen.getByText("About us")).toBeInTheDocument();
    expect(screen.getByText(/There are many variations/)).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = renderAbout();
    expect(asFragment()).toMatchSnapshot();
  });
});
