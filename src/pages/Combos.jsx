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

const Combos = () => {
  const { theme } = useContext(ThemeContext);
  const [userId, setUserId] = useState("");
  const [rawComboData, setRawComboData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

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

        console.log("Data fetching and state updates completed.", comboData);
      } catch (error) {
        console.error("Error fetching combos:", error);
      }
    };

    fetchData();
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

  const totalItems = filteredComboData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the start and end indexes based on currentPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCombos = filteredComboData.slice(startIndex, endIndex);

  const handleSearch = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
    setCurrentPage(1); // Reset to page 1 when performing a search
  };

  return (
    <div className={styles[`${theme}container`]}>
      <Navbar />

      <Search
        onSearch={handleSearch}
        theme={theme}
        setSearchQueryVal={setSearchQuery}
      />

      {filteredComboData.length === 0 && searchQuery !== "" ? (
        <h2 className={styles.notFoundMessage}>
          No results found, for &quot;{searchQuery}&quot;.
        </h2>
      ) : (
        <section className={styles.combos_container}>
          {showSignIn && <AuthenticationBody toggleOverlay={toggleOverlay} />}

          <ComboCard
            loggedIn={loggedIn}
            setShowSignIn={setShowSignIn}
            displayedCombos={currentCombos}
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
