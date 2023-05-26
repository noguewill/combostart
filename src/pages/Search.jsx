import React, { useState, useRef } from "react";
import styles from "@/styles/Search.module.css";
import Dropdown from "./Dropdown";
import { useRouter } from "next/router";
import Image from "next/image";

const Search = ({ btnType, themeOverride, onData, onSearch }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const [activeButton, setActiveButton] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const debounceTimerRef = useRef(null);

  const handleOptionSelect = (option) => {
    // Handle the selected option
    console.log(`Selected option: ${option}`);
  };

  const handleButtonClick = (buttonIndex) => {
    // Set the active button and trigger onData callback
    setActiveButton(buttonIndex);
    onData(activeButton);
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
          <h1 className={styles[`${btnType}__comboSection_header`]}>
            COMBO GUIDES
          </h1>

          {pathname === "/ComboPage" ? (
            <div className={styles.search__filterContainer}>
              {/* Sort filter option */}
              <div className={styles.search__filterOption_container}>
                <h6 className={styles.search__filterBtnText}> SORT </h6>

                <Dropdown
                  classStyle={styles.dropdown_button}
                  menuStyle={styles.dropdown_menu}
                  options={["Top Rated", "Popular", "Reviewed"]}
                  defaultOption="Trending"
                  onOptionSelect={handleOptionSelect}
                />
              </div>
              {/* Author filter option */}
              <div className={styles.search__filterOption_container}>
                <h6 className={styles.search__filterBtnText}> AUTHOR </h6>

                <Dropdown
                  classStyle={styles.dropdown_button}
                  menuStyle={styles.dropdown_menu}
                  options={["Creator", "Popular", "Pro"]}
                  defaultOption="Points"
                  onOptionSelect={handleOptionSelect}
                />
              </div>
              {/* Character filter option */}
              <div className={styles.search__filterOption_container}>
                <h6 className={styles.search__filterBtnText}> CHARACTER</h6>

                <Dropdown
                  classStyle={styles.dropdown_button}
                  menuStyle={styles.dropdown_menu}
                  options={["Ryu", "Ken", "Juri"]}
                  defaultOption="none"
                  onOptionSelect={handleOptionSelect}
                />
              </div>
            </div>
          ) : (
            <></>
            /*   <div className={styles.classic_filter_container}>
              <span
                className={styles.classic_filter_label}
                style={themeOverride}
              >
                SORT:
              </span>
              <button
                className={
                  styles[
                    `${
                      activeButton === 1
                        ? "classic_filter_container_btn--active"
                        : "classic_filter_container_btn"
                    }`
                  ]
                }
                onClick={() => handleButtonClick(1)}
              >
                Popular
              </button>
              <button
                className={
                  styles[
                    `${
                      activeButton === 2
                        ? "classic_filter_container_btn--active"
                        : "classic_filter_container_btn"
                    }`
                  ]
                }
                onClick={() => handleButtonClick(2)}
              >
                Curated for you
              </button>
              <button
                className={
                  styles[
                    `${
                      activeButton === 3
                        ? "classic_filter_container_btn--active"
                        : "classic_filter_container_btn"
                    }`
                  ]
                }
                onClick={() => handleButtonClick(3)}
              >
                Following
              </button>
            </div> */
          )}
          <div>
            <label className={styles[`${btnType}__searchBar_container`]}>
              <input
                className={styles[`${btnType}__searchBar_input`]}
                type="text"
                placeholder="Ryu shoryuken superless combo"
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />

              <select
                className={styles.searchBar_filterBtn}
                value={selectedOption}
                onChange={handleDropdownChange}
              >
                <option value="option1">POPULAR</option>
                <option value="option2">TRENDING</option>
                <option value="option3">FOLLOWING</option>
              </select>

              <button className={styles.searchBar_searchBtn}>
                <Image src="/searchIcon.svg" width={15} height={15} />
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
