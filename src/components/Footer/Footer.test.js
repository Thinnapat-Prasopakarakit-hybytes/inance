import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

const renderFooter = () => {
  return render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
};

describe("Footer Component", () => {
  it("should render copyright text", () => {
    renderFooter();
    expect(screen.getByText(/All Rights Reserved By/i)).toBeInTheDocument();
  });

  it("should render current year", () => {
    renderFooter();
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(currentYear)).toBeInTheDocument();
  });

  it("should render credit link", () => {
    renderFooter();
    const link = screen.getByText("Free Html Templates");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://html.design/");
  });

  it("should match snapshot", () => {
    const { asFragment } = renderFooter();
    expect(asFragment()).toMatchSnapshot();
  });
});
