import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import Navbar from "/components/Navbar";
import ComboCard from "/components/ComboCard";
import ComboCardMK from "components/ComboCardMK";
import Footer from "/components/Footer";
import styles from "@/styles/Upvoted.module.css";
import {
  defCurrentUser,
  fetchComboData,
  fetchUpvotedPostIds,
} from "logic/dataFetch";
import withAuth from "components/withAuth";
import StickyButton from "components/StickyButton";
import { Helmet } from "react-helmet";

const Upvoted = () => {
  const { theme } = useContext(ThemeContext);
  /* Street Fighter 6 */
  const [rawComboDataSF6, setRawComboDataSF6] = useState([]);
  const [filteredUpvotedPostsSF6, setFilteredUpvotedPostsSF6] = useState([]);

  /* Mortal Kombat 1 */
  const [rawComboDataMK1, setRawComboDataMK1] = useState([]);
  const [filteredUpvotedPostsMK1, setFilteredUpvotedPostsMK1] = useState([]);

  const [upvotedPostIds, setUpvotedPostIds] = useState([]);
  const [noShowVote, setNoShowVote] = useState(true);
  const [noCombosFound, setNoCombosFound] = useState(true);
  useEffect(() => {
    const fetchUpvotedPosts = async () => {
      try {
        const user = await defCurrentUser();
        const userId = user.sub;

        const comboDataSF6 = await fetchComboData("streetfighter6");
        setRawComboDataSF6(comboDataSF6);
        const comboDataMK1 = await fetchComboData("mortalkombat1");
        setRawComboDataMK1(comboDataMK1);

        const postIds = await fetchUpvotedPostIds(userId);

        if (Array.isArray(postIds) && postIds.length > 0) {
          setUpvotedPostIds(postIds);
          console.log("postIds:", postIds);
          console.log("upvotedPostIds:", upvotedPostIds);
          // Assuming 'rawComboData' is the array of all combo data
          const filteredDataSF6 = comboDataSF6.filter((card) =>
            postIds.includes(card.postId?.S)
          );
          setFilteredUpvotedPostsSF6(filteredDataSF6);

          const filteredDataMK1 = comboDataMK1.filter((card) =>
            postIds.includes(card.postId?.S)
          );
          setFilteredUpvotedPostsMK1(filteredDataMK1);
          setNoCombosFound(false);
        } else {
          console.log("ye");
          setNoCombosFound(true);
        }
      } catch (error) {
        console.error("Error fetching Upvoted post IDs:", error);
      }
    };

    fetchUpvotedPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>COMBOSTART | Upvoted Combos</title>

        <link rel="canonical" href="https://combostart.vercel.app/Upvoted" />
      </Helmet>

      <main className={styles[`${theme}content_container`]}>
        <Navbar theme={theme} />
        {noCombosFound ? (
          <h3 className={styles.noCombosFound_header}>
            No upvoted combos found
          </h3>
        ) : (
          <section className={styles.upvotedCombos_container}>
            <ComboCard
              displayedCombos={filteredUpvotedPostsSF6}
              theme={theme}
              noShowVote={noShowVote}
            />
            <ComboCardMK
              displayedCombos={filteredUpvotedPostsMK1}
              theme={theme}
              noShowVote={noShowVote}
            />
          </section>
        )}
        <StickyButton />
        <Footer theme={theme} />
      </main>
    </>
  );
};

export default withAuth(Upvoted);
