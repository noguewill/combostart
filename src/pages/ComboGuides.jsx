import React, { useState, useContext, useEffect } from "react";
import styles from "@/styles/ComboGuides.module.css";
import { ThemeContext } from "../../components/ThemeContext";
import Search from "/components/Search";
import Footer from "/components/Footer";
import Navbar from "/components/Navbar";
import ComboCard from "/components/ComboCard";
import { defCurrentUser, fetchComboData } from "../../components/dataFetch";

const ComboGuides = () => {
  const { theme } = useContext(ThemeContext);
  const [userId, setUserId] = useState("");
  const [displayedCombos, setDisplayedCombos] = useState([]);

  // Fetch data once when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await defCurrentUser();
        setUserId(currentUser);

        const comboData = await fetchComboData();
        setDisplayedCombos(comboData);

        console.log("Data fetching and state updates completed.", comboData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchQuery) => {
    const formattedSearchQuery = searchQuery.toLowerCase().replace(/-/g, "");
    const filteredData = displayedCombos.filter((card) => {
      const formattedCharName = card.Character?.S.toLowerCase().replace(
        /-/g,
        ""
      );
      const formattedTitle = card.PostTitle?.S.toLowerCase().replace(/-/g, "");

      /*     const formattedTags = card.Tags?.S.map((tag) => tag.text.toLowerCase()); */

      return (
        formattedCharName.includes(formattedSearchQuery) ||
        formattedTitle.includes(formattedSearchQuery) /* ||
        formattedTags.includes(formattedSearchQuery) */
      );
    });
    setDisplayedCombos(filteredData);
  };

  return (
    <div className={styles[`${theme}container`]}>
      <Navbar />

      <Search onSearch={handleSearch} />
      <section className={styles.comboCards_parent_container}>
        <ComboCard
          displayedCombos={displayedCombos}
          userId={userId}
          theme={theme}
        />
      </section>
      <Footer />
    </div>
  );
};

export default ComboGuides;
