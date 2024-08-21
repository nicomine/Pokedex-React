import { createContext, useContext, useEffect, useState } from "react";

export const pokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [favoritePokemon, setFavoritePokemon] = useState([]);

  const addFavoritePokemon = (pokemon) => {
    if (!favoritePokemon.some((fav) => fav["name"] === pokemon.name))
      setFavoritePokemon((prevState) =>
        prevState.includes(pokemon) ? prevState : [...prevState, pokemon]
      );
  };
  const removeFavoritePokemon = (pokemon) => {
    const newFavoritePokemon = favoritePokemon.filter(
      (fav) => fav.name !== pokemon.name
    );

    setFavoritePokemon(newFavoritePokemon);
  };

  const contextValue = {
    favoritePokemon,
    addFavoritePokemon,
    removeFavoritePokemon,
  };

  return (
    <pokemonContext.Provider value={contextValue}>
      {children}
    </pokemonContext.Provider>
  );
};

export const useFavoritePokemon = () => {
  const context = useContext(pokemonContext);
  if (context === undefined) {
    throw new Error(
      "useFavoritePokemon debe ser utilizado dentro de un PokemonProvider"
    );
  }
  return context;
};
