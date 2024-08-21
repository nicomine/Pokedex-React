import { useState } from "react";

import { URL } from "../services/url";
import { PokemonCard } from "../Components/PokemonCard";
import { SearchBar } from "../Components/SearchBar";
import { useFavoritePokemon } from "../context/PokemonContext";
//import { useFetchPokemon } from "../hooks/useFetchPokemon";

import "./pokedex.css";

export function Pokedex() {
  const fetchPokemon = (searchPokemonCleanValue) => {
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
    setSearchPokemon(null);
  };

  const [searchPokemon, setSearchPokemon] = useState();
  const [pokemon, setPokemon] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { favoritePokemon, addFavoritePokemon, removeFavoritePokemon } =
    useFavoritePokemon();

  // const { useFetchPokemon } = useFetchPokemon();  // INTENTO DE LLAMAR UN HOOK

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

    fetchPokemon(searchPokemonCleanValue); // INTENTO DE USAR UN HOOK

    // fetch(`${URL.pokeapi}/${searchPokemonCleanValue}/`)
    //   .then((response) => {
    //     return response.ok ? response.json() : Promise.reject(response);
    //   })
    //   .then(({ name, stats, sprites }) => {
    //     setIsLoading(false);
    //     setError(null);
    //     setPokemon({ name, stats, sprites });
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //     setPokemon(null);
    //     setError({ error });
    //   });
    // setSearchPokemon(null);
  };

  const handleToggleFavorite = () => {
    if (favoritePokemon.includes(pokemon)) {
      removeFavoritePokemon(pokemon);
    } else {
      addFavoritePokemon(pokemon);
    }
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
            value={searchPokemon}
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
                isFavorite={
                  favoritePokemon &&
                  favoritePokemon.some((fav) => fav["name"] === pokemon.name)
                }
                onToggleFavorite={handleToggleFavorite}
              />
            ) : (
              <>
                <h2>Pokemon no encontrado</h2>
              </>
            )}
          </>
        )}
      </div>
      {favoritePokemon &&
        favoritePokemon.map((fav, index) => (
          <div key={index}>
            <button
              onClick={() => {
                setPokemon(fav);
                //fetchPokemon(fav.name);
                // fetch(`${URL.pokeapi}/${fav.name}/`)
                //   .then((response) => {
                //     return response.ok
                //       ? response.json()
                //       : Promise.reject(response);
                //   })
                //   .then(({ name, stats, sprites }) => {
                //     setIsLoading(false);
                //     setError(null);
                //     setPokemon({ name, stats, sprites });
                //   })
                //   .catch((error) => {
                //     setIsLoading(false);
                //     setPokemon(null);
                //     setError({ error });
                //   });
                // setSearchPokemon(null);
              }}
            />
            <div>{fav.name}</div>
          </div>
        ))}
    </div>
  );
}
