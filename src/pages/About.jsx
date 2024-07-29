import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/Main/section.css";
import "../components/header/header.css";
import Search from "/public/search_pic.png";
import Footer from "../components/footer/Footer.jsx";
import { Link } from "react-router-dom";

const About = () => {
  const [showInput, setShowInput] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");

  const handleButtonClick = () => {
    setShowInput(!showInput);
    if (showInput) {
      setSearchQuery("");
    }
  };

  const clearInput = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/recipes?limit=50"
        );
        setRecipes(response.data.recipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const filteredAndSortedRecipes = recipes
    .filter((recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortCriteria === "rating") {
        return b.rating - a.rating;
      } else if (sortCriteria === "cookTimeMinutes") {
        return b.cookTimeMinutes - a.cookTimeMinutes;
      } else if (sortCriteria === "caloriesPerServing") {
        return b.caloriesPerServing - a.caloriesPerServing;
      }
      return 0;
    });

  return (
    <>
      <main className="main">
        <section className="best">
          <div className="container best__content">
            <div className="best__btn-group">
              <h2 className="best__title">Все блюда от Romsem</h2>
              {showInput && (
                <input
                  className="input"
                  type="text"
                  placeholder="Поиск..."
                  onChange={handleSearchChange}
                  value={searchQuery}
                />
              )}
              {!showInput && (
                <label className="label" htmlFor="sort">
                  Сортировка:
                  <select
                    id="sort"
                    className="select"
                    value={sortCriteria}
                    onChange={handleSortChange}
                  >
                    <option value="name">По названию</option>
                    <option value="rating">По рейтингу</option>
                    <option value="cookTimeMinutes">
                      По времени приготовления
                    </option>
                    <option value="caloriesPerServing">
                      По количеству калорий
                    </option>
                  </select>
                </label>
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
              {filteredAndSortedRecipes.map((recipe, index) => (
                <Link
                  to={`/dynamic/${recipe.id}/${recipe.name}/${recipe.instructions}/${recipe.difficulty}/${recipe.cuisine}/${recipe.caloriesPerServing}/${recipe.cookTimeMinutes}`}
                  key={index}
                >
                  <div className="best__card">
                    <div className="blur2"></div>
                    <img className="best__image" src={recipe.image} alt="" />
                    <h3 className="best__name">{recipe.name}</h3>
                    <p className="best__calories">
                      Количество калорий: {recipe.caloriesPerServing}
                    </p>
                    <p className="best__rating">
                      Рейтинг: {recipe.rating}
                      <span>
                        <img
                          className="span__img"
                          src="https://cdn131.picsart.com/263538644008212.png"
                          alt=""
                        />
                      </span>
                    </p>
                    <p className="best__cooktime">
                      Время приготовления: {recipe.cookTimeMinutes} минут
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
