import "./styles/SearchBar.css"

export function SearchBar({
  type,
  onChange,
  onClick,
  classNameInput,
  classNameButton,
  isLoading,
  value
}) {
  return (
    <div>
      <input type={type} onChange={onChange} className={classNameInput} value={value || ""} />
      <button onClick={onClick} disabled={isLoading} className={classNameButton}>
        🔍
      </button>
    </div>
  );
}
