import React, { useState } from "react";
import styles from "@/styles/ComboPage.module.css";
import Search from "./Search";
import ThemedFooter from "./ThemedFooter";
import Navbar from "./Navbar";
import ComboCard from "./ComboCard";
import sf6 from "./gamesData/sf6.json";

const ComboPage = () => {
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

        <ComboCard />

        <ThemedFooter />
      </div>
    </div>
  );
};

export default ComboPage;
