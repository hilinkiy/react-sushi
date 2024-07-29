import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Dynamic() {
  let {
    id,
    name,
    instructions,
    difficulty,
    cuisine,
    caloriesPerServing,
    cookTimeMinutes,
  } = useParams();
  return (
    <>
      <div className="dynamic">
        <Link to="/">
          <button className="back">
            <img
              className="exit__img"
              src="https://icon-library.com/images/deny-icon/deny-icon-26.jpg"
              alt=""
            />
          </button>
        </Link>
        <div className="container dynamic__content">
          <img
            className="dynamic__img"
            src={`https://cdn.dummyjson.com/recipe-images/${id}.webp`}
            alt=""
          />
          <div className="dynamic__text">
            <h1 className="dynamic__title">{name}</h1>
            <p className="dynamic__descr">{instructions}</p>
            <p className="dynamic__descr">
              Количество калорий: {caloriesPerServing}
            </p>
            <p className="dynamic__diff">
              Сложность приготовления: {difficulty}
            </p>
            <p className="dynamic__diff">
              Время приготовления: {cookTimeMinutes} минут
            </p>
            <p className="dynamic__cuisine">Кухня: {cuisine}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dynamic;
