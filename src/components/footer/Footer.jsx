import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  const scroll = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <footer className="footer">
        <div className="blur"></div>
        <div className="container footer__content">
          <div className="footer__list">
            <h6 className="footer__title">Другие страницы</h6>
            <Link to="/" className="footer__list-link" onClick={scroll}>
              Домой
            </Link>
            <Link to="/about" className="footer__list-link" onClick={scroll}>
              Все блюда
            </Link>
            <Link to="/contact" className="footer__list-link" onClick={scroll}>
              Легкие блюда
            </Link>
          </div>
          <div className="footer__list">
            <h6 className="footer__title">Наши спонсоры</h6>
            <a href="#" className="footer__list-link">
              Torco Racing Fuels
            </a>
            <a href="#" className="footer__list-link">
              ECHO
            </a>
            <a href="#" className="footer__list-link">
              HJC Helmets
            </a>
            <a href="#" className="footer__list-link">
              Alpinestars
            </a>
          </div>
          <div className="footer__list">
            <h6 className="footer__title">Наши Соцсети</h6>
            <a href="#" className="footer__list-img">
              <img
                src="https://i.pinimg.com/736x/5a/af/b6/5aafb6ab71836141a3381371db9242da.jpg"
                alt=""
              />
            </a>
            <a href="#" className="footer__list-img">
              <img
                src="https://images.hdqwalls.com/download/twitter-x-fe-2932x2932.jpg"
                alt=""
              />
            </a>
            <a href="#" className="footer__list-img">
              <img
                src="https://i.pinimg.com/originals/17/78/8a/17788ab2773395d29f0f4d74368056ab.png"
                alt=""
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
