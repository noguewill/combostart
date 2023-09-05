import React, { useRef } from "react";
import styles from "@/styles/Search.module.css";
import Image from "next/image";

const Search = ({ onSearch, setSearchQueryVal, theme }) => {
  const inputRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      inputRef.current.blur(); // Remove focus from the input
      onSearch(inputRef.current.value);
      setSearchQueryVal(inputRef.current.value);
      inputRef.current.value = ""; // Clear the input value
    }
  };

  return (
    <label className={styles.searchBar_container}>
      <input
        className={styles[`${theme}searchBar_input`]}
        type="text"
        placeholder="Search for a character name, combo title or tags"
        ref={inputRef}
        onKeyDown={handleKeyPress}
      />
      <button
        type="submit"
        className={styles.searchBar_searchBtn}
        onClick={() => onSearch(inputRef.current.value)}
      >
        <Image
          src="/icons/searchIcon.svg"
          alt="Search icon"
          width={15}
          height={15}
        />
      </button>
    </label>
  );
};

export default Search;
