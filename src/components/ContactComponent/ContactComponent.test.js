import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ContactComponent from "./ContactComponent";
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

const renderContactComponent = () => {
  return render(
    <BrowserRouter>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <ContactComponent />
      </APIProvider>
    </BrowserRouter>
  );
};

describe("ContactComponent", () => {
  it("should renders contact form", () => {
    renderContactComponent();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("should render with all content", () => {
    renderContactComponent();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();

    expect(screen.getByText("SEND")).toBeInTheDocument();
  });

  it("should render all input fields", () => {
    renderContactComponent();
    const nameInput = screen.getByPlaceholderText("Name");
    const phoneInput = screen.getByPlaceholderText("Phone Number");
    const emailInput = screen.getByPlaceholderText("Email");
    const messageInput = screen.getByPlaceholderText("Message");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");

    fireEvent.change(phoneInput, { target: { value: "12345678" } });
    expect(phoneInput.value).toBe("12345678");

    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    expect(emailInput.value).toBe("john.doe@example.com");

    fireEvent.change(messageInput, { target: { value: "Test Message" } });
    expect(messageInput.value).toBe("Test Message");
  });

  it("should simulate form submission", () => {
    renderContactComponent();
    const sendButton = screen.getByText("SEND");

    fireEvent.click(sendButton);
    expect(sendButton).toBeEnabled();
  });

  it("should render map with correct props", () => {
    renderContactComponent();
    const mapElement = screen.getByTestId("mock-map");
    const mapProps = JSON.parse(mapElement.dataset.props);

    expect(mapProps).toEqual({
      defaultZoom: 18,
      defaultCenter: {
        lat: 40.712775,
        lng: -74.005973,
      },
      gestureHandling: "greedy",
      disableDefaultUI: true,
    });
  });

  it("should match snapshot", () => {
    const { asFragment } = renderContactComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
