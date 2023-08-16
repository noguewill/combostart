import React, { useState, useContext, useEffect } from "react";
import styles from "@/styles/Combos.module.css";
import { ThemeContext } from "../../components/ThemeContext";
import Search from "/components/Search";
import Footer from "/components/Footer";
import Navbar from "/components/Navbar";
import ComboCard from "/components/ComboCard";
import { defCurrentUser, fetchComboData } from "../../components/dataFetch";

const Combos = () => {
  const { theme } = useContext(ThemeContext);
  const [userId, setUserId] = useState("");
  const [displayedCombos, setDisplayedCombos] = useState([]);
  const [rawComboData, setRawComboData] = useState([]);
  const [searchQueryval, setSearchQueryVal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await defCurrentUser();
        setUserId(user.sub);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      try {
        const comboData = await fetchComboData();
        setRawComboData(comboData);
        setDisplayedCombos(comboData);

        console.log("Data fetching and state updates completed.", comboData);
      } catch (error) {
        console.error("Error fetching combos:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchQuery) => {
    const formattedSearchQuery = searchQuery.toLowerCase().replace(/-/g, "");

    if (formattedSearchQuery === "") {
      // If search query is empty, reset displayedCombos to the original data
      setDisplayedCombos(rawComboData);
      return;
    }

    // Re-fetch the data if displayedCombos is empty
    if (displayedCombos.length === 0) {
      setDisplayedCombos(rawComboData);
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

      <Search
        onSearch={handleSearch}
        theme={theme}
        setSearchQueryVal={setSearchQueryVal}
      />
      <section className={styles.comboCards_parent_container}>
        {displayedCombos.length === 0 ? (
          <h2 className={styles.notFoundMessage}>
            No results found, for &quot;{searchQueryval}&quot;.
          </h2>
        ) : (
          <ComboCard
            displayedCombos={displayedCombos}
            userId={userId}
            theme={theme}
          />
        )}
      </section>
      <Footer theme={theme} />
    </div>
  );
};

export default Combos;
