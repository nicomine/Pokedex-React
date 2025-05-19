import "./styles/PokemonCard.css";

export function PokemonCard({
  name,
  stats,
  image,
  types,
  isFavorite,
  onToggleFavorite,
  searchPokemon,
  id,
}) {
  return (
    <>
      <header className="card-header">
        <p className="pokemon-id">#{id}</p>
        <div className="type-container">
          {types.map((type, index) => (
            <p key={index}>{type.type.name}</p>
          ))}
        </div>
      </header>
      <img src={image} className="card-image" />
      <h2>{name}</h2>

      <ul className="stats-pokemon-container">
        {stats.map((stats, index) => (
          <li key={index} className="stats-pokemon-item">
            <p className="stat-name">{stats.stat.name}</p>
            <p className='stat-number'>{stats.base_stat}</p>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button
          disabled={id === 1 ? true : false}
          onClick={() => searchPokemon(id - 1)}
        >
          Anterior
        </button>
        <button onClick={() => searchPokemon(id + 1)}>Siguiente</button>
      </div>
    </>
  );
}
