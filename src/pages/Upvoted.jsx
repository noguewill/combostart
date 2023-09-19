import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import Navbar from "/components/Navbar";
import ComboCard from "/components/ComboCard";
import Footer from "/components/Footer";
import styles from "@/styles/Upvoted.module.css";
import {
  defCurrentUser,
  fetchComboData,
  fetchUpvotedPostIds,
} from "logic/dataFetch";
import withAuth from "components/withAuth";
import StickyButton from "components/StickyButton";

const Upvoted = () => {
  const { theme } = useContext(ThemeContext);
  const [UpvotedPostIds, setUpvotedPostIds] = useState([]);
  const [rawComboData, setRawComboData] = useState([]);
  const [filteredUpvotedPosts, setFilteredUpvotedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noShowVote, setNoShowVote] = useState(true);

  useEffect(() => {
    const fetchUpvotedPosts = async () => {
      try {
        const user = await defCurrentUser();
        const userId = user.sub;

        const comboData = await fetchComboData();
        setRawComboData(comboData);

        const postIds = await fetchUpvotedPostIds(userId);

        setUpvotedPostIds(postIds);
        setIsLoading(false);

        // Assuming 'rawComboData' is the array of all combo data
        const filteredData = comboData.filter((card) =>
          postIds.includes(card.postId?.S)
        );

        setFilteredUpvotedPosts(filteredData);
      } catch (error) {
        console.error("Error fetching Upvoted post IDs:", error);
        setIsLoading(false);
      }
    };

    fetchUpvotedPosts();
  }, []);

  return (
    <main className={styles[`${theme}content_container`]}>
      <Navbar theme={theme} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section className={styles.upvotedCombos_container}>
          <ComboCard
            displayedCombos={filteredUpvotedPosts}
            theme={theme}
            noShowVote={noShowVote}
          />
        </section>
      )}
      <StickyButton />
      <Footer theme={theme} />
    </main>
  );
};

export default withAuth(Upvoted);
