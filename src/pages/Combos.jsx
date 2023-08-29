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

    const filteredData = rawComboData.filter((card) => {
      const formattedCharName = card.Character?.S.toLowerCase().replace(
        /-/g,
        ""
      );
      const formattedTitle = card.PostTitle?.S.toLowerCase().replace(/-/g, "");

      const titleWords = formattedTitle.split(" ");

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

      {displayedCombos.length === 0 && searchQueryval !== "" ? (
        <h2 className={styles.notFoundMessage}>
          No results found, for &quot;{searchQueryval}&quot;.
        </h2>
      ) : (
        <section className={styles.combos_container}>
          <ComboCard
            displayedCombos={displayedCombos}
            userId={userId}
            theme={theme}
          />
        </section>
      )}

      <Footer theme={theme} />
    </div>
  );
};

export default Combos;
