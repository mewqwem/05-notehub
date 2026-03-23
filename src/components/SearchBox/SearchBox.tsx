import css from "./SearchBox.module.css";

interface SearchBoxInputProps {
  onSearch: (value: string) => void;
  value: string;
}

function SearchBox({ onSearch, value }: SearchBoxInputProps) {
  return (
    <input
      className={css.input}
      defaultValue={value}
      type="text"
      placeholder="Search notes"
      onChange={(event) => onSearch(event.target.value)}
    />
  );
}

export default SearchBox;
