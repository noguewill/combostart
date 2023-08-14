import React, { useState, useContext, useEffect } from "react";
import styles from "@/styles/ComboGuides.module.css";
import { ThemeContext } from "../../components/ThemeContext";
import Search from "/components/Search";
import Footer from "/components/Footer";
import Navbar from "/components/Navbar";
import ComboCard from "/components/ComboCard";
import { defCurrentUser, fetchComboData } from "../../components/dataFetch";

const ComboGuides = ({ currentUser }) => {
  const { theme } = useContext(ThemeContext);
  const [userId, setUserId] = useState("");
  const [displayedCombos, setDisplayedCombos] = useState([]);

  // Fetch data once when the component mounts
  useEffect(() => {
    console.log("this is the currentUser of ComboGuides:", currentUser);
    fetchData();
  }, []);

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

  const handleSearch = (searchQuery) => {
    const formattedSearchQuery = searchQuery.toLowerCase().replace(/-/g, "");

    if (formattedSearchQuery === "") {
      // If search query is empty, reset displayedCombos to the original data
      fetchData();
      return;
    }

    // Re-fetch the data if displayedCombos is empty
    if (displayedCombos.length === 0) {
      fetchData();
      return;
    }

    const filteredData = displayedCombos.filter((card) => {
      const formattedCharName = card.Character?.S.toLowerCase().replace(
        /-/g,
        ""
      );
      const formattedTitle = card.PostTitle?.S.toLowerCase().replace(/-/g, "");

      // Split the formatted title into words
      const titleWords = formattedTitle.split(" ");

      // Check if the lowercase character name or any lowercase title word includes the search query
      const charNameMatch = formattedCharName.includes(formattedSearchQuery);
      const titleMatch = titleWords.some((word) =>
        word.includes(formattedSearchQuery)
      );

      return charNameMatch || titleMatch;
    });

    setDisplayedCombos(filteredData);
  };

  return (
    <div className={styles[`${theme}container`]}>
      <Navbar />

      <Search onSearch={handleSearch} />
      <section className={styles.comboCards_parent_container}>
        {displayedCombos.length === 0 ? (
          <h2 className={styles.notFoundMessage}>No results found.</h2>
        ) : (
          <ComboCard
            displayedCombos={displayedCombos}
            userId={userId}
            theme={theme}
          />
        )}
      </section>
      <Footer />
    </div>
  );
};

export default ComboGuides;
