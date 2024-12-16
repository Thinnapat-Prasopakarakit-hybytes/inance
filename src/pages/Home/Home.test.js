import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import { APIProvider } from "@vis.gl/react-google-maps";

jest.mock("@vis.gl/react-google-maps", () => ({
  APIProvider: ({ children }) => (
    <div data-testid="mock-api-provider">{children}</div>
  ),
  Map: ({ defaultZoom, defaultCenter, gestureHandling, disableDefaultUI }) => (
    <div
      data-testid="mock-map"
      data-props={JSON.stringify({
        defaultZoom,
        defaultCenter,
        gestureHandling,
        disableDefaultUI,
      })}
    />
  ),
}));

const renderHome = () => {
  return render(
    <BrowserRouter>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Home />
      </APIProvider>
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
    expect(screen.getByTestId("mock-map")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = renderHome();
    expect(asFragment()).toMatchSnapshot();
  });
});