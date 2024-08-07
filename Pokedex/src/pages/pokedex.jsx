import { useState } from "react";

import { URL } from "../services/url";
import { PokemonCard } from "../Components/PokemonCard";
import { SearchBar } from "../Components/SearchBar";

import "./pokedex.css";

export function Pokedex() {
  const [searchPokemon, setSearchPokemon] = useState();
  const [pokemon, setPokemon] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setSearchPokemon(e.target.value.toLocaleLowerCase());
  };

  const handleSubmit = () => {
    if (!searchPokemon) return;
    const searchPokemonCleanValue = searchPokemon
      .toString()
      .toLocaleLowerCase()
      .trim();

    setIsLoading(true);

    fetch(`${URL.pokeapi}/${searchPokemonCleanValue}/`)
      .then((response) => {
        return response.ok ? response.json() : Promise.reject(response);
      })
      .then(({ name, stats, sprites }) => {
        setIsLoading(false);
        setError(null);
        setPokemon({ name, stats, sprites });
      })
      .catch((error) => {
        setIsLoading(false);
        setPokemon(null);
        setError({ error });
      });
  };

  return (
    <div className="pokedex-container">
      <header className="header">
        <h1 className="title">POKEMONS</h1>
        <div>
          <SearchBar
            type={"text"}
            onChange={handleChange}
            onClick={handleSubmit}
            disabled={isLoading}
            classNameInput={"input-search"}
            classNameButton={"button-search"}
          />
        </div>
      </header>
      <div className="card-pokedex">
        {isLoading ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          <>
            {!error && pokemon ? (
              <PokemonCard
                name={pokemon.name}
                image={pokemon.sprites.front_default}
                stats={pokemon.stats}
              />
            ) : (
              <>
                <h2>Pokemon no encontrado</h2>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
