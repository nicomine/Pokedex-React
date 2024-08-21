import "./styles/PokemonCard.css";

export function PokemonCard({
  name,
  stats,
  image,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <>
      <img src={image} className="card-image" />
      <h2>{name}</h2>
      <ul>
        {stats.map((stats, index) => (
          <li key={index}>
            {stats.stat.name} : {stats.base_stat}
          </li>
        ))}
      </ul>
      <button onClick={onToggleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to favorites"}
      </button>
    </>
  );
}
