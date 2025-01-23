import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { LanguageContext } from "../../i18n/LanguageProvider";
import { IntlProvider } from "react-intl";
import en from "../../i18n/en.json";
import ar from "../../i18n/ar.json";

const messages = {
  en,
  ar,
};

const renderHeaderComponent = (locale = "en") => {
  return render(
    <BrowserRouter>
      <LanguageContext.Provider value={{ locale }}>
        <IntlProvider messages={messages[locale]} locale={locale}>
          <Header />
        </IntlProvider>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
};

describe("Header Component", () => {
  it("should renders brand logo", () => {
    renderHeaderComponent();
    expect(screen.getByText("Inance")).toBeInTheDocument();
  });

  it("should renders contact information", () => {
    renderHeaderComponent();
    expect(screen.getByText("Call : +01 123455678990")).toBeInTheDocument();
    expect(screen.getByText("Email : demo@gmail.com")).toBeInTheDocument();
    expect(screen.getByTestId("phone-icon")).toBeInTheDocument();
    expect(screen.getByTestId("envelope-icon")).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    renderHeaderComponent();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("should renders toggle button for mobile navigation", () => {
    renderHeaderComponent();
    const toggleButton = screen.getByRole("button", {
      name: /toggle navigation/i,
    });
    expect(toggleButton).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = renderHeaderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("Navigation Toggle Functionality", () => {
  it("should toggles the navbar on button click", () => {
    renderHeaderComponent();
    const toggleButton = screen.getByLabelText("Toggle navigation");
    const navbarCollapse = screen.getByTestId("navbar-collapse");

    expect(navbarCollapse).not.toHaveClass("show");
    fireEvent.click(toggleButton);
    expect(navbarCollapse).toHaveClass("show");
    fireEvent.click(toggleButton);
    expect(navbarCollapse).not.toHaveClass("show");
  });

  it("should update aria-expanded attribute on toggle button", () => {
    renderHeaderComponent();
    const toggleButton = screen.getByRole("button", {
      name: /toggle navigation/i,
    });

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });
});

describe("Header Component - Arabic", () => {
  test("renders Arabic navigation items when locale is ar", () => {
    renderHeaderComponent("ar");

    expect(screen.getByText("الرئيسية")).toBeInTheDocument();
    expect(screen.getByText("من نحن")).toBeInTheDocument();
    expect(screen.getByText("خدماتنا")).toBeInTheDocument();
    expect(screen.getByText("اتصل بنا")).toBeInTheDocument();
  });

  test("language switcher shows correct active state for Arabic", () => {
    renderHeaderComponent("ar");

    const arabicToggle = screen.getByText("عربي");
    const englishToggle = screen.getByText("English");

    expect(arabicToggle).toHaveClass("active");
    expect(englishToggle).toHaveClass("toggle");
  });

  test("mobile menu toggle works with Arabic content", () => {
    renderHeaderComponent("ar");

    const toggleButton = screen.getByRole("button", {
      "aria-label": "Toggle navigation",
    });
    const navbarCollapse = screen.getByTestId("navbar-collapse");

    expect(navbarCollapse).not.toHaveClass("show");

    fireEvent.click(toggleButton);
    expect(navbarCollapse).toHaveClass("show");

    fireEvent.click(toggleButton);
    expect(navbarCollapse).not.toHaveClass("show");
  });
});
