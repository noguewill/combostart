import React, { useState } from "react";
import styles from "@/styles/ComboPage.module.css";
import Search from "./Search";
import ThemedFooter from "./ThemedFooter";
import Navbar from "./Navbar";
import ComboCard from "./ComboCard";

import sf6 from "./gamesData/sf6.json";

const ComboPage = () => {
  const [gameName, setGameName] = useState(sf6);
  const [filteredCombos, setFilteredCombos] = useState(gameName);

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

  const handleData = (data) => {
    // Do something with the data
    console.log(data);
  };

  return (
    <div className={styles.container}>
      {/*       <Image
        src="/graffitiBg.webp"
        alt="Pic"
        fill
        style={{ objectFit: "cover" }}
      />
 */}

      <div className={styles.content_container}>
        <Navbar
          btnType={`themed`}
          setGameName={setGameName}
          loggedIn={true}
          themeOverride={{
            color: "#69eec3",
            margin: "0 1rem",
            padding: " 0.3rem 0.5rem",
          }}
        />

        <Search
          btnType={`themed`}
          onData={handleData}
          onSearch={handleSearch}
        />

        <ComboCard sf6={filteredCombos} gameName={gameName} />

        <ThemedFooter />
      </div>
    </div>
  );
};

export default ComboPage;
