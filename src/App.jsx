import React, { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [hasMore, setHasMore] = useState(true);

  const fetchPokemon = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch Pokémon list");
      const data = await response.json();

      const detailedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          if (!res.ok) throw new Error(`Failed to fetch ${pokemon.name} details`);
          const details = await res.json();

          return {
            id: details.id,
            name: details.name,
            image: details.sprites.other["official-artwork"].front_default || 
                  details.sprites.front_default,
            types: details.types.map((t) => t.type.name),
            stats: details.stats.map((stat) => ({
              name: stat.stat.name,
              value: stat.base_stat
            }))
          };
        })
      );

      setPokemonList(prev => [...prev, ...detailedData]);
      setDisplayedPokemon(prev => [...prev, ...detailedData]);
      setNextUrl(data.next);
      setHasMore(data.next !== null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(nextUrl);
  }, []);

  const loadMore = () => {
    if (nextUrl) {
      fetchPokemon(nextUrl);
    }
  };

  const filteredPokemon = displayedPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading && displayedPokemon.length === 0) return <div className="loading">Loading Pokédex...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <h1 className="title">Pokédex</h1>

      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="pokemon-grid">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
              stats={pokemon.stats}
            />
          ))
        ) : (
          <div className="no-results">No se encontraron Pokémon</div>
        )}
      </div>

      {hasMore && !loading && (
        <button onClick={loadMore} className="load-more">
          Cargar más Pokémon
        </button>
      )}

      {loading && displayedPokemon.length > 0 && (
        <div className="loading-more">Cargando...</div>
      )}
    </div>
  );
}

export default App;