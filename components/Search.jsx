import React, { useState, useRef, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import styles from "@/styles/Search.module.css";
import Image from "next/image";

const Search = ({ onSearch }) => {
  const { theme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const debounceTimerRef = useRef(null);

  const handleSearchQueryChange = (e) => {
    // Update the search query and debounce the onSearch callback
    const value = e.target.value;
    setSearchQuery(value);

    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      onSearch(value);
    }, 300); // Adjust the debounce delay as needed
  };

  return (
    <section className={styles.search__container}>
      <main className={styles.search_main__container}>
        <div className={styles.search_container__child}>
          <div>
            <label className={styles.searchBar_container}>
              <input
                className={styles[`${theme}searchBar_input`]}
                type="text"
                placeholder="Search for a character name, combo title or tags"
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />

              <button className={styles.searchBar_searchBtn}>
                <Image
                  src="/icons/searchIcon.svg"
                  alt="Search icon"
                  width={15}
                  height={15}
                />
              </button>
            </label>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Search;
