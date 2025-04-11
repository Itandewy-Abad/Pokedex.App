import React, { useState, useEffect } from 'react';

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>Clasificación: {pokemon.types[0].type.name}</p>
      <p>Nivel de poderes: {pokemon.stats[0].base_stat}</p>
    </div>
  );
}

function App() {
  const [pokemones, setPokemones] = useState([]);

  useEffect(() => {
    const fetchPokemones = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await response.json();
      const pokemonesData = data.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return data;
      });
      const pokemonesResolved = await Promise.all(pokemonesData);
      setPokemones(pokemonesResolved);
    };
    fetchPokemones();
  }, []);

  return (
    <div className='title'>P Ó K E D E X <br></br>
      <input type="search" name="" id="busqueda" placeholder='Buscar Pókemon...' />
      <div className="pokedex">
        {pokemones.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;