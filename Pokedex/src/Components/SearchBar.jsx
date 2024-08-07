import "./styles/SearchBar.css"

export function SearchBar({
  type,
  onChange,
  onClick,
  classNameInput,
  classNameButton,
  isLoading,
}) {
  return (
    <div>
      <input type={type} onChange={onChange} className={classNameInput} />
      <button onClick={onClick} disabled={isLoading} className={classNameButton}>
        🔍
      </button>
    </div>
  );
}
