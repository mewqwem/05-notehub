import css from "./SearchBox.module.css";
import type { DebouncedState } from "use-debounce";

interface SearchBookInputProps {
  onSearch: DebouncedState<React.Dispatch<React.SetStateAction<string>>>;
  value: string;
}

function SearchBox({ onSearch, value }: SearchBookInputProps) {
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
