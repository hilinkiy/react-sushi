import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./section.css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../header/header.css";
import Search from "/public/search_pic.png";
import { Link } from "react-router-dom";
import autoAnimate from "@formkit/auto-animate";

const Section = () => {
  const [recipes, setRecipes] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const parent = useRef(null);

  const handleButtonClick = () => {
    setShowInput(!showInput);
    if (showInput) {
      setQuery(""); // Clear query when showing the input
      setFilteredRecipes(recipes); // Reset filtered recipes when showing the input
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
          "https://dummyjson.com/recipes?limit=10"
        );
        setRecipes(response.data.recipes || []);
        setFilteredRecipes(response.data.recipes);
      } catch (err) {
        console.error(err);
      }
    };
    parent.current && autoAnimate(parent.current);

    fetchRecipes();
  }, [parent]);

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
      <div className="header__content" ref={parent}>
        <div className="blur"></div>
        <div className="container flex" ref={parent}>
          <Swiper
            className="swiper"
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {recipes.map((recipe) => (
              <SwiperSlide key={recipe.id}>
                <div className="slider__item">
                  <div className="slider__text">
                    <h1 className="slider__title">{recipe.name}</h1>
                    <p className="slider__descr">{recipe.instructions}</p>
                    <Link
                      to={`/dynamic/${recipe.id}/${recipe.name}/${recipe.instructions}/${recipe.difficulty}/${recipe.cuisine}/${recipe.caloriesPerServing}/${recipe.cookTimeMinutes}`}
                    >
                      <button className="header__btn">Подробнее</button>
                    </Link>
                  </div>

                  <div className="img">
                    <img src={recipe.image} alt="" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <main className="main">
        <section className="best">
          <div className="container best__content">
            <div className="best__btn-group" ref={parent}>
              <h2 className="best__title">Лучшие блюда от Romsem</h2>
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
            <div className="best__cards" ref={parent}>
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
    </>
  );
};

export default Section;
