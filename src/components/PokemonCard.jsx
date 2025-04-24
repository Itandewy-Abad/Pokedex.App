import React from "react";
import "./PokemonCard.css";

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

const PokemonCard = ({ name, image, types, stats }) => {
  return (
    <div className="pokemon-card">
      <img src={image} alt={name} className="pokemon-image" />
      <h3 className="pokemon-name">{name.toUpperCase()}</h3>

      <div className="pokemon-types">
        {types.map((type, index) => (
          <span
            key={index}
            className="pokemon-type"
            style={{ backgroundColor: typeColors[type] || "#777" }}
          >
            {type}
          </span>
        ))}
      </div>

      <div className="pokemon-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat">
            <span className="stat-name">{stat.name.replace('-', ' ').toUpperCase()}</span>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{ width: `${stat.value > 100 ? 100 : stat.value}%` }}
              ></div>
            </div>
            <span className="stat-value">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;