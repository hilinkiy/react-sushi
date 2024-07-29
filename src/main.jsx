import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Logo from "/public/Logo.png";
import Dynamic from "./pages/Dynamic.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <header className="header">
        <nav className="nav">
          <div className="container nav__content">
            <Link to="/" className="nav__logo">
              <img src={Logo} alt="" />
            </Link>
            <ul className="nav__list">
              <li>
                <Link to="/" className="nav__list-link">
                  Домой
                </Link>
              </li>
              <li>
                <Link to="/about" className="nav__list-link">
                  Все блюда
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav__list-link">
                  Легкие блюда
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dynamic/:id/:name/:instructions/:difficulty/:cuisine/:caloriesPerServing/:cookTimeMinutes"
          element={<Dynamic />}
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
