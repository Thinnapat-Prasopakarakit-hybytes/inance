import React from "react";
import { render, screen } from "@testing-library/react";
import Info from "./Info";
import { BrowserRouter } from "react-router-dom";

const renderInfo = () => {
  return render(
    <BrowserRouter>
      <Info />
    </BrowserRouter>
  );
};

describe("Info Component", () => {
  it("should render the component", () => {
    renderInfo();
  });

  it("should render the main headings", () => {
    renderInfo();
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
    expect(screen.getByText("Follow Us")).toBeInTheDocument();
  });

  it("should render contact items with correct icons and text", () => {
    renderInfo();

    const contactItems = screen.getAllByText(
      /Lorem Ipsum is simply dummy text|demo@gmail.com|\+02 1234567890/
    );
    expect(contactItems).toHaveLength(3);

    expect(screen.getByTestId("map-marker-icon")).toBeInTheDocument();
    expect(screen.getByTestId("phone-icon")).toBeInTheDocument();
    expect(screen.getByTestId("envelope-icon")).toBeInTheDocument();

    const contactLinks = screen.getAllByRole("link");
    expect(contactLinks).toHaveLength(7);
  });

  it("should render social icons with correct links", () => {
    renderInfo();

    const socialIcons = [
      screen.getByTestId("facebook-icon"),
      screen.getByTestId("twitter-icon"),
      screen.getByTestId("youtube-icon"),
      screen.getByTestId("instagram-icon"),
    ];
    socialIcons.forEach((icon) => expect(icon).toBeInTheDocument());

    const socialLinks = screen.getAllByRole("link");
    expect(socialLinks).toHaveLength(7);
  });

  it("should match snapshot", () => {
    const { asFragment } = renderInfo();
    expect(asFragment()).toMatchSnapshot();
  });
});
