import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/Main/section.css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../components/header/header.css";
import Footer from "../components/footer/Footer.jsx";
import Search from "/public/search_pic.png";
import { Link } from "react-router-dom";

const About = () => {
  const [recipes, setRecipes] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [query, setQuery] = useState("");

  const handleButtonClick = () => {
    setShowInput(!showInput);
    if (showInput) {
      setQuery("");
      setFilteredRecipes(recipes);
    }
  };

  const clearInput = () => {
    setQuery("");
    setFilteredRecipes(recipes);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/recipes?limit=100"
        );
        const filteredRecipes = response.data.recipes.filter(
          (recipe) => recipe.difficulty === "Easy"
        );
        setRecipes(filteredRecipes || []);
        setFilteredRecipes(filteredRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipes();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    filterRecipes(value);
  };

  const filterRecipes = (query) => {
    if (query === "") {
      setFilteredRecipes(recipes);
    } else {
      const result = recipes.filter(
        (recipe) =>
          recipe.name && recipe.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRecipes(result);
    }
  };

  return (
    <>
      <main className="main">
        <section className="best">
          <div className="container best__content">
            <div className="best__btn-group">
              <h2 className="best__title">Легкие блюда от Romsem</h2>
              {showInput && (
                <input
                  className="input"
                  type="text"
                  placeholder="Поиск..."
                  onChange={handleInputChange}
                  value={query}
                />
              )}
              <button onClick={handleButtonClick}>
                <img src={Search} alt="" />
              </button>
              {showInput && (
                <div className="input__btn">
                  <button className="exit" onClick={clearInput}>
                    <img
                      className="exit__img"
                      src="https://icon-library.com/images/deny-icon/deny-icon-26.jpg"
                      alt=""
                    />
                  </button>
                  <button className="exit" onClick={handleButtonClick}>
                    <img
                      className="exit__img"
                      src="https://cdn4.iconfinder.com/data/icons/mini-arrows-2/16/95-1024.png"
                      alt=""
                    />
                  </button>
                </div>
              )}
            </div>
            <div className="best__cards">
              {filteredRecipes.map((recipe, index) => (
                <Link
                  to={`/dynamic/${recipe.id}/${recipe.name}/${recipe.instructions}/${recipe.difficulty}/${recipe.cuisine}/${recipe.caloriesPerServing}/${recipe.cookTimeMinutes}`}
                  key={index}
                >
                  <div className="best__card">
                    <div className="blur2"></div>
                    <img className="best__image" src={recipe.image} alt="" />
                    <h3 className="best__name">{recipe.name}</h3>
                    <p className="best__calories">
                      Количество калорий:{recipe.caloriesPerServing}
                    </p>
                    <p className="best__descr">{recipe.instructions}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
