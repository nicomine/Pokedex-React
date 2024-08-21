import { useState } from "react";

import { Pokedex } from "./pages/pokedex";

import "./App.css";
import { PokemonProvider } from "./context/PokemonContext";
import { FavoritePokemon } from "./pages/FavoritePokemons";

function App() {
  return (
    <PokemonProvider>
      <div className="app-container">
        <Pokedex />
      </div>
    </PokemonProvider>
  );
}

export default App;
