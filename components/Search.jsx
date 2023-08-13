import React, { useContext, useRef } from "react";
import { ThemeContext } from "./ThemeContext";
import styles from "@/styles/Search.module.css";
import Image from "next/image";

const Search = ({ onSearch }) => {
  const { theme } = useContext(ThemeContext);
  const inputRef = useRef(null);

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
                ref={inputRef}
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
          </div>
        </div>
      </main>
    </section>
  );
};

export default Search;
