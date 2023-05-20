import React, { useState } from "react";
import styles from "@/styles/ComboPage.module.css";
import Search from "./Search";
import ThemedFooter from "./ThemedFooter";
import Navbar from "./Navbar";
import ComboCard from "./ComboCard";
import Image from "next/image";
import { comboCardData } from "./comboCardData";

const ComboPage = () => {
  const [filteredComboCardData, setFilteredComboCardData] =
    useState(comboCardData);

  const handleSearch = (searchQuery) => {
    const filteredData = comboCardData.filter((card) => {
      const formattedSearchQuery = searchQuery.toLowerCase().replace(/-/g, "");
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

    setFilteredComboCardData(filteredData);
  };

  const handleData = (data) => {
    // Do something with the data
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <Image
        src="/graffitiBg.webp"
        alt="Pic"
        fill
        style={{ objectFit: "cover" }}
      />
      <div className={styles.content_container}>
        <Navbar btnType={`themed`} loggedIn={true} />
        <Search
          btnType={`themed`}
          onData={handleData}
          onSearch={handleSearch}
        />

        <ComboCard comboCardData={filteredComboCardData} />

        <ThemedFooter />
      </div>
    </div>
  );
};
export default ComboPage;
