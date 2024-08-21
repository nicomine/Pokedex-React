 import{URL} from "../services/url"
 
 export const useFetchPokemon = (searchPokemonCleanValue) => {
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