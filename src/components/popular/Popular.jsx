import React, { useEffect, useState } from "react";
import axios from "axios";
import "./popular.css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/recipes");
        const filteredRecipes = response.data.recipes.filter(
          (recipe) => recipe.id > 20
        );
        const sortedRecipes = filteredRecipes.sort(
          (a, b) => b.rating - a.rating
        );
        setRecipes(sortedRecipes || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="main">
      <section className="popular">
        <div className="container popular__content">
          <h5 className="popular__title">Популярные блюда</h5>
          <div className="blur3"></div>
          <Swiper
            className="swiper"
            modules={[Pagination]}
            spaceBetween={100}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {recipes.map((recipe) => (
              <SwiperSlide key={recipe.id}>
                <div className="slider__item">
                  <div className="slider__text">
                    <h1 className="popular__name">{recipe.name}</h1>
                    <p className="popular__descr">{recipe.instructions}</p>
                    <Link
                      to={`/dynamic/${recipe.id}/${recipe.name}/${recipe.instructions}/${recipe.difficulty}/${recipe.cuisine}/${recipe.caloriesPerServing}/${recipe.cookTimeMinutes}`}
                    >
                      <button className="popular__btn">Подробнее</button>
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
      </section>
    </main>
  );
};

export default Recipes;
