import React from "react";
import { render, screen } from "@testing-library/react";
import ServiceComponent from "./ServiceComponent";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../assets/images/s1.png", () => "mock-s1-image");
jest.mock("../../assets/images/s2.png", () => "mock-s2-image");
jest.mock("../../assets/images/s3.png", () => "mock-s3-image");

const renderServiceComponent = () => {
  return render(
    <BrowserRouter>
      <ServiceComponent />
    </BrowserRouter>
  );
};

describe("ServiceComponent", () => {
  it("should render the main heading", () => {
    renderServiceComponent();
    expect(screen.getByText("Our Services")).toBeInTheDocument();
  });

  it("should render all service items", () => {
    renderServiceComponent();

    const serviceTitles = screen.getAllByText(
      /Maintenance|Electrical|Plumbing/
    );
    expect(serviceTitles).toHaveLength(3);

    const serviceDescriptions = screen.getAllByText(
      /when looking at its layout/i
    );
    expect(serviceDescriptions).toHaveLength(3);

    const serviceImages = screen.getAllByRole("img");
    const expectedImages = [
      { src: "mock-s1-image", alt: "Maintenance" },
      { src: "mock-s2-image", alt: "Electrical" },
      { src: "mock-s3-image", alt: "Plumbing" },
    ];

    serviceImages.forEach((img, index) => {
      expect(img).toHaveAttribute("src", expectedImages[index].src);
      expect(img).toHaveAttribute("alt", expectedImages[index].alt);
    });
  });

  it("should render the 'View More' link", () => {
    renderServiceComponent();
    const viewMoreLink = screen.getByRole("link", { name: /View More/i });
    expect(viewMoreLink).toBeInTheDocument();
    expect(viewMoreLink).toHaveAttribute("href", "/");
  });

  it("should match the snapshot", () => {
    const { asFragment } = renderServiceComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render service images with correct sources", () => {
    renderServiceComponent();
    const serviceImages = screen.getAllByRole("img");

    serviceImages.forEach((img, index) => {
      console.log(`Image ${index}:`, {
        src: img.getAttribute("src"),
        alt: img.getAttribute("alt"),
      });
    });

    expect(serviceImages[0]).toHaveAttribute("src", "mock-s1-image");
    expect(serviceImages[1]).toHaveAttribute("src", "mock-s2-image");
    expect(serviceImages[2]).toHaveAttribute("src", "mock-s3-image");
  });
});
