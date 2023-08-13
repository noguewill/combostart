import React, { useState, useEffect } from "react";
import styles from "@/styles/ComboCard.module.css";
import Image from "next/image";
import { recordVote, removeVote } from "./dataSend";
import { fetchVoteData } from "./dataFetch";

const ComboCard = ({ displayedCombos, theme, userId }) => {
  const [parsedComboStrings, setParsedComboStrings] = useState([]);
  const [currentVotes, setCurrentVotes] = useState(null);
  const [renderedPostIds, setRenderedPostIds] = useState([]); // State to store rendered post IDs
  const [isMatching, setIsMatching] = useState(""); // Add this state for className logic

  useEffect(() => {
    const fetchData = async () => {
      if (displayedCombos.length > 0) {
        const { ComboStrings } = displayedCombos[0];
        setCurrentVotes(parseInt(displayedCombos[0].VoteCount?.N, 10)); // Parse to integer or default to 1

        if (ComboStrings && ComboStrings.S) {
          try {
            setParsedComboStrings(JSON.parse(ComboStrings.S));
          } catch (error) {
            console.error("Error parsing ComboStrings:", error);
          }
        }
      }
    };
    const didUserVote = async () => {
      const results = await Promise.all(
        renderedPostIds.map((value) => fetchVoteData(value, userId))
      );
      if (results.every((result) => result === "upvote")) {
        setIsMatching("upvote");
      } else if (results.every((result) => result === "downvote")) {
        setIsMatching("downvote");
      } else {
        setIsMatching("");
      }
    };

    didUserVote();
    fetchData();
  }, [displayedCombos, renderedPostIds]);

  // Function to determine whether to show the comboArrow element icon
  const shouldShowComboArrow = (currentIndex) => {
    return currentIndex < parsedComboStrings.length - 1;
  };

  const handleUpvote = async (postId) => {
    try {
      const voteData = await fetchVoteData(postId, userId);

      if (voteData === "upvote") {
        console.log("User previously upvoted");
        setCurrentVotes(currentVotes - 1);
        setIsMatching("");
        await removeVote(postId, userId, "upvote");
        console.log("Vote removed after upvote cancellation");
      } else if (voteData === "downvote") {
        console.log("User previously downvoted");
        setIsMatching("upvote");
        await removeVote(postId, userId, "downvote");
        await recordVote(postId, userId, "upvote");
        setCurrentVotes(currentVotes + 2);
        console.log("Upvote registered after downvote cancellation");
      } else {
        console.log("User has not voted before");
        await recordVote(postId, userId, "upvote");
        setCurrentVotes(currentVotes + 1);
        setIsMatching("upvote");
      }
    } catch (error) {
      console.error("Error handling upvote:", error);
      setIsMatching("");
    }
  };

  const handleDownvote = async (postId) => {
    try {
      const voteData = await fetchVoteData(postId, userId);

      if (voteData === "downvote") {
        console.log("User previously downvoted");
        setCurrentVotes(currentVotes + 1);
        setIsMatching("");
        await removeVote(postId, userId, "downvote");
        console.log("Vote removed after downvote cancellation");
      } else if (voteData === "upvote") {
        console.log("User previously upvoted");
        await removeVote(postId, userId, "upvote");
        await recordVote(postId, userId, "downvote");
        setCurrentVotes(currentVotes - 2);
        setIsMatching("downvote");
        console.log("Downvote registered after upvote cancellation");
      } else {
        console.log("User has not voted before");
        await recordVote(postId, userId, "downvote");
        setCurrentVotes(currentVotes - 1);
        setIsMatching("downvote");
      }
    } catch (error) {
      console.error("Error handling downvote:", error);
      setIsMatching("");
    }
  };

  return (
    <>
      {displayedCombos.map((card) => {
        const postId = card.postId?.S;
        if (!renderedPostIds.includes(postId)) {
          setRenderedPostIds((prevIds) => [...prevIds, postId]); // Store the rendered post ID
        }
        return (
          <main key={card.postId?.S} className={styles.comboCard_wrapper}>
            <section className={styles.upvote_container}>
              <button
                className={`${styles.upvote_btn_} ${
                  isMatching === "upvote" ? styles.upvote_btn_upvote : ""
                }`}
                onClick={() => handleUpvote(card.postId?.S)}
              ></button>
              <span className={styles.upvotes}>{currentVotes}</span>
              <button
                className={`${styles.downvote_btn_} ${
                  isMatching === "downvote" ? styles.downvote_btn_downvote : ""
                }`}
                onClick={() => handleDownvote(card.postId?.S)}
              ></button>
            </section>

            <article className={styles.comboCard_hugger}>
              <header className={styles.postTitle_container}>
                <h2 className={styles.postTitle}> {card.PostTitle?.S}</h2>
                <p className={styles.postedBy}>
                  posted by{" "}
                  <span className={styles.postedBy_authorName}>
                    {card.User?.S}
                  </span>{" "}
                  {card.SubmissionDate?.S}
                </p>
                <p className={styles.patchVersion}>PATCH: 1.0.0</p>
              </header>

              <section className={styles.comboCard_container}>
                <div className={styles.avatar_container}>
                  <h4 className={styles.avatar_name}> {card.Character?.S}</h4>
                  <div className={styles.avatar_frame}>
                    <Image
                      src={`/comboAvatars/sf6/sf6_charAvatar_${card.Character?.S}.png`}
                      width={101}
                      height={101}
                      className={styles.avatar_img}
                      alt={card.Character?.S}
                    />
                  </div>
                </div>
                <div className={styles.statsAndCombo_container}>
                  <section className={styles.stats_container}>
                    {/* Mechanics */}
                    <div className={styles.mechanic_container}>
                      <div className={styles.mechanic}>{card.HasSuper?.S}</div>
                      <span className={styles.mechanic_text}>SUPER ART</span>
                    </div>
                    <div className={styles.mechanic_container}>
                      <div className={styles.driveRush}>
                        {card.DriveBars?.N}
                      </div>
                      <span className={styles.mechanic_text}>DRIVE RUSH</span>
                    </div>
                    <div className={styles.mechanic_container}>
                      <div className={styles.initialState}>
                        <Image
                          src={`/inputs/${card.InitialState?.S}.svg`}
                          width={26}
                          height={26}
                          alt={card.InitialState?.S}
                        />
                      </div>
                      <span className={styles.mechanic_text}>
                        INITIAL STATE
                      </span>
                    </div>
                    <div className={styles.dmg_container}>
                      <div className={styles.dmg_stat_container}>
                        <span className={styles.dmg_stat_text}>DAMAGE</span>
                        <span className={styles.dmg_stat_number}>
                          {card.Damage?.N}
                        </span>
                        <div className={styles.dmg_dot}></div>
                        <span className={styles.dmg_stat_text}>HITS</span>
                        <span className={styles.dmg_stat_number}>
                          {card.Hits?.N}
                        </span>
                        <div className={styles.dmg_dot}></div>
                        <span className={styles.dmg_stat_dmgPercent}>
                          {card.DmgPercent?.N}%
                        </span>
                        <span className={styles.dmg_stat_text}>OF HP</span>
                      </div>
                    </div>
                    <div className={styles.screenPos}>
                      {card.ScreenPosition?.S}
                    </div>
                  </section>
                  <div className={styles.comboCard_inputs__container}>
                    {parsedComboStrings.map((combo, comboIndex) => (
                      <div key={comboIndex} className={styles.comboStringRow}>
                        {combo.map((val, index) => (
                          <div
                            key={index}
                            className={styles[`${theme}comboString`]}
                          >
                            {val.type === "text" ? (
                              <span className={styles.plusSign}>
                                {val.value}
                              </span>
                            ) : (
                              <>
                                <figure
                                  className={
                                    styles.comboString_string_container
                                  }
                                >
                                  <Image
                                    src={`/inputs/${val.value}.svg`}
                                    alt={val.alt}
                                    width={34}
                                    height={34}
                                  />
                                  <figcaption className={styles.input_text}>
                                    {val.value}
                                  </figcaption>
                                </figure>
                              </>
                            )}
                          </div>
                        ))}
                        {shouldShowComboArrow(comboIndex) && (
                          <span className={styles[`${theme}comboArrow`]}></span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <div className={styles.comboCard_social__container}>
                {/* Container for the tags */}
                <div className={styles.tag_container}>
                  <button className={styles.tag_btn}>{card.Tags?.S}</button>
                </div>
              </div>
            </article>
          </main>
        );
      })}
    </>
  );
};

export default ComboCard;
