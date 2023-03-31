import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ComingSoon from "./pages/ComingSoon";
import Capsules from "./pages/Capsules";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (section) {
          if (section.isIntersecting) {
            const modifiedClass = `${section.target.className} active`;
            section.target.className = `${modifiedClass}`;
          }
        });
      },
      { threshold: 0.8 }
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/capsules" element={<Capsules />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
