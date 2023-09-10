import React, { useState, useContext, useEffect } from "react";
import styles from "@/styles/Combos.module.css";
import { ThemeContext } from "../../components/ThemeContext";
import Search from "/components/Search";
import Footer from "/components/Footer";
import Navbar from "/components/Navbar";
import ComboCard from "/components/ComboCard";
import { defCurrentUser, fetchComboData } from "../../components/dataFetch";
import { KoFiWidget } from "components/PaymentOptions";
import AuthenticationBody from "components/Authentication/AuthenticationBody";
import { fetchTimestamps } from "../../components/dataFetch";

const Combos = () => {
  const { theme } = useContext(ThemeContext);
  const [userId, setUserId] = useState("");
  const [rawComboData, setRawComboData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [sortedComboData, setSortedComboData] = useState([]); // Initialize as an empty array

  const itemsPerPage = 7;
  const toggleOverlay = () => {
    setShowSignIn((prevShowSignIn) => !prevShowSignIn);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await defCurrentUser();
        setUserId(user.sub);
        setLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      try {
        const comboData = await fetchComboData();
        setRawComboData(comboData);
        setSortedComboData(comboData); // Initialize sorted data with the raw data

        console.log("Data fetching and state updates completed.", comboData);
      } catch (error) {
        console.error("Error fetching combos:", error);
      }
    };

    fetchData();
    fetchTimestamps();
  }, []);

  // Calculate totalItems based on filtered data
  const filteredComboData = rawComboData.filter((card) => {
    const formattedCharName = card.Character?.S.toLowerCase().replace(/-/g, "");
    const formattedTitle = card.PostTitle?.S.toLowerCase().replace(/-/g, "");

    const titleWords = formattedTitle.split(" ");

    const charNameMatch = formattedCharName.includes(searchQuery);
    const titleMatch = titleWords.some((word) => word.includes(searchQuery));

    return charNameMatch || titleMatch;
  });

  const totalItems = sortedComboData.length; // Use sorted data for totalItems
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the start and end indexes based on currentPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCombos = sortedComboData.slice(startIndex, endIndex); // Use sorted data

  const handleSearch = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
    setCurrentPage(1); // Reset to page 1 when performing a search
    // Note: No need to call sortFilteredCombos here, as we're not applying sort filtering
  };

  const sortFilteredCombos = (sortBy) => {
    // Clone the filteredComboData to avoid mutation
    const filteredDataCopy = [...filteredComboData];

    // Sort the filtered data based on the sortBy parameter
    if (sortBy === "newest") {
      filteredDataCopy.sort((a, b) => b.Timestamp?.N - a.Timestamp?.N); // Sort by newest first
    } else if (sortBy === "oldest") {
      filteredDataCopy.sort((a, b) => a.Timestamp?.N - b.Timestamp?.N); // Sort by oldest first
    } else if (sortBy === "popular") {
      filteredDataCopy.sort((a, b) => b.VoteCount?.N - a.VoteCount?.N); // Sort by popular (highest votes first)
    } else if (sortBy === "trending") {
      // Calculate the "Trending Score" for each post using the provided formula
      filteredDataCopy.sort((a, b) => {
        const trendingScoreA = calcTrendingScore(a);
        const trendingScoreB = calcTrendingScore(b);
        return trendingScoreB - trendingScoreA; // Sort by trending score (higher first)
      });
    }

    // Use the sorted data for rendering or further processing
    console.log(filteredDataCopy);

    // Set the sorted data to the state
    setSortedComboData(filteredDataCopy);
  };

  const calcTrendingScore = (post) => {
    const weightForVotes = 0.7; // Adjust this weight to your preference
    const weightForTimestamp = 0.3; // Adjust this weight to your preference

    const votes = post.VoteCount?.N || 0; // Number of votes
    const timestamp = new Date(post.Timestamp?.N).getTime(); // Timestamp in milliseconds
    const currentTimestamp = Date.now(); // Current timestamp in milliseconds

    // Calculate the trending score based on the formula
    const trendingScore =
      weightForVotes * votes +
      weightForTimestamp * (1 / (currentTimestamp - timestamp + 1));

    return trendingScore;
  };

  return (
    <div className={styles[`${theme}container`]}>
      <Navbar />

      <Search
        onSearch={handleSearch}
        theme={theme}
        setSearchQueryVal={setSearchQuery}
      />

      {/* Filtering options */}
      <div className={styles.filterOptions_container}>
        <h4 className={styles[`${theme}filter_header`]}>SORT BY:</h4>
        <div className={styles.filterBtn_container}>
          <button
            type="button"
            className={styles.filter_btn}
            onClick={() => sortFilteredCombos("trending")} // Sort by trending posts first
          >
            TRENDING
          </button>
          <button
            type="button"
            className={styles.filter_btn}
            onClick={() => sortFilteredCombos("popular")} // Sort by popular (highest votes first)
          >
            POPULAR
          </button>

          <button
            type="button"
            className={styles.filter_btn}
            onClick={() => sortFilteredCombos("newest")} // Default: sort by newest first
          >
            NEWEST
          </button>
          <button
            type="button"
            className={styles.filter_btn}
            onClick={() => sortFilteredCombos("oldest")} // Sort by oldest first
          >
            OLDEST
          </button>
        </div>
      </div>

      {filteredComboData.length === 0 && searchQuery !== "" ? (
        <h2 className={styles.notFoundMessage}>
          No results found for &quot;{searchQuery}&quot;.
        </h2>
      ) : (
        <section className={styles.combos_container}>
          {showSignIn && <AuthenticationBody toggleOverlay={toggleOverlay} />}

          <ComboCard
            loggedIn={loggedIn}
            setShowSignIn={setShowSignIn}
            displayedCombos={currentCombos} // Use sorted data for rendering
            userId={userId}
            theme={theme}
          />

          <div className={styles.pageNum_parent}>
            <button
              type="button"
              className={styles.pageNum_back_btn}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            ></button>

            <div className={styles.pageNum_container}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  type="button"
                  key={index + 1}
                  className={`${styles[`${theme}pageNum`]} ${
                    currentPage === index + 1 ? styles.currentPageNum : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={styles.pageNum_next_btn}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === totalPages ||
                currentCombos.length < itemsPerPage
              }
            ></button>
          </div>
        </section>
      )}
      <KoFiWidget />
      <Footer theme={theme} />
    </div>
  );
};

export default Combos;
