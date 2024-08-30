import { useState } from "react";
import css from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Search by title or ISBN"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={css.btn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
