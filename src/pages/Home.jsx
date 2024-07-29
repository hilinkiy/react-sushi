import React from "react";
import Section from "../components/Main/Section.jsx";
import Popular from "../components/popular/Popular.jsx";
import Sponsor from "../components/sponsors/Sponsor.jsx";
import Footer from "../components/footer/Footer.jsx";

function Home() {
  return (
    <>
      <Section />
      <Popular />
      <Sponsor />
      <Footer />
    </>
  );
}

export default Home;
