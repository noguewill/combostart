import React, { useState, useContext } from "react";
import styles from "@/styles/ComboGuides.module.css";
import { ThemeContext } from "./ThemeContext";
import Search from "/components/Search";
import ThemedFooter from "/components/ThemedFooter";
import Navbar from "/components/Navbar";
import ComboCard from "/components/ComboCard";
import sf6 from "/gamesData/sf6.json";

const ComboGuides = () => {
  const { theme } = useContext(ThemeContext);
  const [filteredCombos, setFilteredCombos] = useState(sf6);

  const handleSearch = (searchQuery) => {
    const formattedSearchQuery = searchQuery.toLowerCase().replace(/-/g, "");

    const filteredData = sf6.filter((card) => {
      const formattedCharacterName = card.charName
        .toLowerCase()
        .replace(/-/g, "");
      const formattedTitle = card.cardTitle.toLowerCase().replace(/-/g, "");
      const formattedTags = card.tags.map((tag) => tag.text.toLowerCase());

      return (
        formattedCharacterName.includes(formattedSearchQuery) ||
        formattedTitle.includes(formattedSearchQuery) ||
        formattedTags.includes(formattedSearchQuery)
      );
    });

    setFilteredCombos(filteredData);
  };

  return (
    <div className={styles[`${theme}container`]}>
      <Navbar loggedIn={false} />

      <Search onSearch={handleSearch} />

      <ComboCard filteredCombos={filteredCombos} />

      <ThemedFooter />
    </div>
  );
};

export default ComboGuides;
