import React from "react";
import "./sponsor.css";

function Sponsor() {
  return (
    <>
      <main className="main">
        <section className="sponsors">
          <div className="container sponsors__content">
            <h4 className="sponsors__title">Спонсоры Romsem</h4>
            <div className="sponsors__images">
              <img
                className="sponsors__img"
                src="https://www.clipartmax.com/png/full/277-2771968_gif-logo-torco-accelerator-shower-curtain.png"
                alt=""
              />
              <img
                className="sponsors__img"
                src="https://chita.artem-tools.ru/upload/iblock/74f/echo.jpg"
                alt=""
              />
              <img
                className="sponsors__img"
                src="https://xn--80ahxajab3a.xn--p1ai/upload/iblock/070/070326fc0f7228958163b5394901f86e.png"
                alt=""
              />
              <img
                className="sponsors__img"
                src="https://assets.suredone.com/684373/brand-logos/alpinestars-usa.png"
                alt=""
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Sponsor;
