import React from "react";
import { render, screen } from "@testing-library/react";
import Client from "./Client";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-icons/fa", () => ({
  FaQuoteLeft: () => <div data-testid="quote-icon" />,
  FaStar: () => <div data-testid="star-icon" />,
}));

jest.mock("react-owl-carousel", () => {
  return function DummyOwlCarousel({ children }) {
    return <div data-testid="owl-carousel">{children}</div>;
  };
});

jest.mock("../../assets/images/client-1.jpg", () => "mock-client-1");
jest.mock("../../assets/images/client-2.jpg", () => "mock-client-2");

const renderClient = () => {
  return render(
    <BrowserRouter>
      <Client />
    </BrowserRouter>
  );
};

describe("Client Component", () => {
  it("should render the heading", () => {
    renderClient();
    expect(screen.getByText("What Our Clients Say")).toBeInTheDocument();
  });

  it("should render client testimonials", () => {
    renderClient();
    const clientNames = screen.getAllByText("Jorch morik");
    expect(clientNames).toHaveLength(4);
  });

  it("should render client images", () => {
    renderClient();
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(4);

    images.forEach((img, index) => {
      const expectedSrc = index % 2 === 0 ? "mock-client-1" : "mock-client-2";
      expect(img).toHaveAttribute("src", expectedSrc);
      expect(img).toHaveAttribute("alt", "Jorch morik");
    });
  });

  it("should render rating stars for each client", () => {
    renderClient();
    const stars = screen.getAllByTestId("star-icon");
    expect(stars).toHaveLength(20);
  });

  it("should render quote icons", () => {
    renderClient();
    const quoteIcons = screen.getAllByTestId("quote-icon");
    expect(quoteIcons).toHaveLength(4);
  });

  it("should render client testimonial text", () => {
    renderClient();
    const testimonialText = screen.getAllByText(/chunks as necessary/i);
    expect(testimonialText).toHaveLength(4);
  });

  it("should render carousel wrapper", () => {
    renderClient();
    expect(screen.getByTestId("owl-carousel")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = renderClient();
    expect(asFragment()).toMatchSnapshot();
  });
});
