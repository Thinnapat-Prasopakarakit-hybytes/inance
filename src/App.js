import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Service from "./pages/Service/Service";
import Contact from "./pages/Contact/Contact";
import { Hero } from "./components/Hero/Hero";
import Info from "./components/Info/Info";
import Footer from "./components/Footer/Footer";
import LanguageProvider from "./i18n/LanguageProvider";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Hero />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Info />
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
