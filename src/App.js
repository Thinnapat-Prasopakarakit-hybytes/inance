import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Service from "./pages/Service/Service";
import Contact from "./pages/Contact/Contact";
import { Hero } from "./components/Hero/Hero";
import Info from "./components/Info/Info";
import Footer from "./components/Footer/Footer";
import LanguageProvider from "./i18n/LanguageProvider";
import NotFound from "./pages/NotFound/NotFound";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { initGA } from "./analytics";
const LanguageWrapper = () => {
  const { lang } = useParams();
  const validLanguages = ["en", "ar"];

  if (!validLanguages.includes(lang)) {
    return (
      <LanguageProvider>
        <Hero />
        <NotFound />
        <Info />
        <Footer />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <Hero />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Info />
      <Footer />
    </LanguageProvider>
  );
};

function App() {
  const localStorageLang = localStorage.getItem("lang");

  useEffect(() => {
    initGA();
  }, []);

  return (
    <HelmetProvider>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={`/${localStorageLang ? localStorageLang : "en"}`}
                  replace
                />
              }
            />
            <Route path="/:lang/*" element={<LanguageWrapper />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
