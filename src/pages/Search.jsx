import React from "react";
import styles from "@/styles/Search.module.css";
import Dropdown from "./Dropdown";

function Search() {
  function handleOptionSelect(option) {
    console.log(`Selected option: ${option}`);
  }

  return (
    /* Mobile Search Section */
    <div className={styles.search__container}>
      {/* Mobile Combos Header Text */}
      <h1 className={styles.search__comboSection_header}>COMBO GUIDES</h1>

      {/* Mobile Filter Options */}
      <div className={styles.search__filterContainer}>
        {/* Sort filter option */}
        <div className={styles.search__filterOption_container}>
          <h6 className={styles.search__filterBtnText}> SORT </h6>
          {/* <button className={styles.search__filterBtn}>TOP RATED</button> */}
          <Dropdown
            options={["Option 1", "Option 2", "Option 3"]}
            defaultOption="TOP RATED"
            onOptionSelect={handleOptionSelect}
          />
        </div>
        {/* Author filter option */}
        <div className={styles.search__filterOption_container}>
          <h6 className={styles.search__filterBtnText}> AUTHOR </h6>
          {/* <button className={styles.search__filterBtn}>RANKED</button> */}
          <Dropdown
            options={["Option 1", "Option 2", "Option 3"]}
            defaultOption="RANKED"
            onOptionSelect={handleOptionSelect}
          />
        </div>
        {/* Character filter option */}
        <div className={styles.search__filterOption_container}>
          <h6 className={styles.search__filterBtnText}> CHARACTER</h6>
          {/* <button className={styles.search__filterBtn}>NONE</button> */}
          <Dropdown
            options={["Option 1", "Option 2", "Option 3"]}
            defaultOption="NONE"
            onOptionSelect={handleOptionSelect}
          />
        </div>
      </div>

      {/* Mobile Searchbar */}
      <label className={styles.searchBar_container}>
        <input
          className={styles.searchBar_input}
          type="text"
          placeholder="Ryu shoryuken superless combo"
        />
      </label>
    </div>
  );
}
export default Search;
