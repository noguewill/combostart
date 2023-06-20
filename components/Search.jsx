import React, { useState, useRef, useContext } from "react";
import { ThemeContext } from "../src/pages/ThemeContext";
import styles from "@/styles/Search.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

const Search = ({ onSearch }) => {
  const { theme } = useContext(ThemeContext);

  const router = useRouter();
  const pathname = router.pathname;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const debounceTimerRef = useRef(null);

  const handleOptionSelect = (option) => {
    // Handle the selected option
    console.log(`Selected option: ${option}`);
  };

  const handleSearchQueryChange = (e) => {
    // Update the search query and debounce the onSearch callback
    const value = e.target.value;
    setSearchQuery(value);

    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      onSearch(value);
    }, 300); // Adjust the debounce delay as needed
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    /* Mobile Search Section */
    <div className={styles.search__container}>
      <div className={styles.evoAd_container}>
        <div className={styles.evoAd}></div>
      </div>

      {/* Main section of the Search Section */}
      <div className={styles.search_main__container}>
        <div className={styles.search_container__child}>
          {/* Mobile Combos Header Text */}
          <h1 className={styles.comboSection_header}>COMBO GUIDES</h1>

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
                  src="/searchIcon.svg"
                  alt="Search icon"
                  width={15}
                  height={15}
                />
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
