import React from "react";
import styles from "@/styles/Search.module.css";

function Search() {
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
          <button className={styles.search__filterBtn}>TOP RATED</button>
        </div>
        {/* Author filter option */}
        <div className={styles.search__filterOption_container}>
          <h6 className={styles.search__filterBtnText}> AUTHOR </h6>
          <button className={styles.search__filterBtn}>RANKED</button>
        </div>
        {/* Character filter option */}
        <div className={styles.search__filterOption_container}>
          <h6 className={styles.search__filterBtnText}> CHARACTER</h6>
          <button className={styles.search__filterBtn}>NONE</button>
        </div>
      </div>

      {/* Mobile Searchbar */}
      <label className={styles.search__searchBar__container}>
        <input
          className={styles.search__searchBar}
          type="text"
          placeholder="Ryu shoryuken superless combo"
        />
      </label>
    </div>
  );
}
export default Search;
