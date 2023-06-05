import React, { useState } from "react";
import styles from "@/styles/ComboGuides.module.css";
import Search from "/components/Search";
import ThemedFooter from "/components/ThemedFooter";
import Navbar from "/components/Navbar";
import ComboCard from "/components/ComboCard";
import sf6 from "/gamesData/sf6.json";

const ComboGuides = () => {
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
  console.log(filteredCombos);

  return (
    <div className={styles.container}>
      <div className={styles.content_container}>
        <Navbar
          btnType={`themed`}
          loggedIn={true}
          themeOverride={{
            color: "#69eec3",
            margin: "0 1rem",
            padding: " 0.3rem 0.5rem",
          }}
        />

        <Search btnType={`themed`} onSearch={handleSearch} />

        <ComboCard filteredCombos={filteredCombos} />

        <ThemedFooter />
      </div>
    </div>
  );
};

export default ComboGuides;
