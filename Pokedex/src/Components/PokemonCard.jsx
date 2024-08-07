import "./styles/PokemonCard.css"

export function PokemonCard({
    name,
    stats,
    image
}) {
  return (
    <>
      <img src={image} className="card-image" />
      <h2>{name}</h2>
     <ul>
        {stats.map((stats,index)=>(<li key={index}>{stats.stat.name} : {stats.base_stat}</li>))}
     </ul>
    </>
  );
}
