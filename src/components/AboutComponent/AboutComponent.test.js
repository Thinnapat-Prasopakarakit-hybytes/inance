import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AboutComponent from "./AboutComponent";

jest.mock("../../assets/images/about-img.jpg", () => "mock-image-path");

const renderAboutComponent = () => {
  return render(
    <BrowserRouter>
      <AboutComponent layout="layout_padding" />
    </BrowserRouter>
  );
};

describe("AboutComponent", () => {
  it("should renders with correct layout class", () => {
    renderAboutComponent();
    const section = screen.getByRole("region", { name: "About Section" });
    expect(section).toHaveClass("about_section layout_padding");
  });

  it("should renders about content", () => {
    renderAboutComponent();
    expect(screen.getByText("About us")).toBeInTheDocument();
    expect(screen.getByText(/There are many variations/)).toBeInTheDocument();
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  it("should renders image with correct attributes", () => {
    renderAboutComponent();
    const image = screen.getByAltText("about-img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "mock-image-path");
  });

  it("should renders the 'Read More' link to home page", () => {
    renderAboutComponent();
    const link = screen.getByText("Read More");
    expect(link).toHaveAttribute("href", "/");
  });

  it("should match snapshot", () => {
    const { asFragment } = renderAboutComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
