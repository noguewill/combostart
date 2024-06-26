import React, { useEffect } from "react";
import styles from "@/styles/ComboCard.module.css";
import { useComboCardLogic } from "logic/comboCardLogic";
import Image from "next/image";

const ComboCard = ({
  displayedCombos,
  theme,
  userId,
  noShowVote,
  loggedIn,
  setShowSignIn,
  updateLimitReached,
}) => {
  const {
    stringsCount,
    voteStatus,
    currentVotes,
    renderedPostIds,
    hoveredPost,
    shouldShowComboArrow,
    handleUpvote,
    handleDownvote,
    handleComboHighlight,
    setRenderedPostIds,
    setHoveredPost,
    postExpandCollapse,
    setPostExpandCollapse,
    hasLimitReached,
    // Destructure other functions and states you need
  } = useComboCardLogic(displayedCombos, userId, loggedIn, setShowSignIn);
  useEffect(() => {
    updateLimitReached(hasLimitReached);
  }, [hasLimitReached]);
  return (
    <>
      {displayedCombos.map((card) => {
        const postId = card.postId?.S;
        if (!renderedPostIds.includes(postId)) {
          setRenderedPostIds((prevIds) => [...prevIds, postId]); // Store the rendered post ID
        }

        const ComboStrings = card.ComboStrings?.S;
        let renderComboStrings = [];

        if (ComboStrings) {
          try {
            renderComboStrings = JSON.parse(ComboStrings);
          } catch (error) {
            console.error("Error parsing ComboStrings:", error);
          }
        }

        return (
          <main
            key={postId}
            className={styles.comboCard_wrapper}
            onClick={() => handleComboHighlight(postId)}
          >
            {noShowVote ? (
              ""
            ) : (
              <section className={styles.vote_container}>
                <button
                  className={`${
                    voteStatus[postId] === "upvote"
                      ? styles[`${theme}upvote_btn_upvote`]
                      : styles[`${theme}upvote_btn_`]
                  }`}
                  onClick={() => handleUpvote(postId)}
                ></button>

                <span
                  className={`${
                    voteStatus[postId] !== null || ""
                      ? styles[`${theme}votes_voted`]
                      : styles[`${theme}votes`]
                  }`}
                >
                  {currentVotes[postId]}
                </span>
                <button
                  className={`${
                    voteStatus[postId] === "downvote"
                      ? styles[`${theme}downvote_btn_downvote`]
                      : styles[`${theme}downvote_btn_`]
                  }`}
                  onClick={() => handleDownvote(postId)}
                ></button>
              </section>
            )}

            <article
              className={styles.comboCard_hugger}
              onMouseEnter={() => setHoveredPost(postId)} // Set the hovered post
              onMouseLeave={() => setHoveredPost(null)}
            >
              <header className={styles.postTitle_container}>
                <h2 className={styles[`${theme}postTitle`]}>
                  {card.PostTitle?.S}
                </h2>
                <p className={styles[`${theme}postedBy`]}>
                  posted by{" "}
                  <span className={styles.postedBy_authorName}>
                    {card.User?.S}
                  </span>
                  {card.SubmissionDate?.S}
                </p>
                <p className={styles.patchVersion}>VERSION: 1.0.0</p>
              </header>

              <section className={styles.comboCard_container}>
                <div className={styles.mkAvatar_container}>
                  <h5 className={styles[`${theme}mkAvatar_name`]}>
                    {card.Character?.S} and {card.Kameo?.S}
                  </h5>
                  <div className={styles.mkAvatar_frame}>
                    <Image
                      src={`/comboAvatars/mk1/${card.Character?.S}.webp`}
                      fill
                      className={styles.mkAvatar_img}
                      alt={card.Character?.S}
                    />
                  </div>
                </div>
                <div className={styles.statsAndCombo_container}>
                  <section className={styles.stats_container}>
                    {/* Mechanics */}
                    {card.HasSuper?.S === "YES" && (
                      <div className={styles.fataBlow_container}>
                        <span className={styles.fataBlow}>FATAL BLOW</span>
                      </div>
                    )}
                    <div className={styles.mechanic_container}>
                      <div className={styles.mkmeter}> {card.MeterBars?.N}</div>
                      <span className={styles[`${theme}mechanic_text`]}>
                        METER
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
                    <div className={styles[`${theme}screenPos`]}>
                      {card.ScreenPosition?.S}
                    </div>
                  </section>
                  <div className={styles.inputs_parent}>
                    <div
                      id={postId}
                      className={styles[`${theme}inputs__container`]}
                      style={
                        postExpandCollapse[postId]
                          ? { flexWrap: "wrap" }
                          : { flexWrap: "nowrap" }
                      }
                    >
                      {renderComboStrings.map((combo, comboIndex) => (
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
                                    <figcaption
                                      className={styles[`${theme}input_text`]}
                                    >
                                      {val.value}
                                    </figcaption>
                                  </figure>
                                </>
                              )}
                            </div>
                          ))}
                          {shouldShowComboArrow(comboIndex) && (
                            <span className={styles.comboArrow}></span>
                          )}
                        </div>
                      ))}
                    </div>
                    {stringsCount >= 14 && (
                      <button
                        className={styles.expand_btn}
                        onClick={() =>
                          setPostExpandCollapse((prevExpandCollapse) => ({
                            ...prevExpandCollapse,
                            [postId]: !prevExpandCollapse[postId], // Toggle the state for this post
                          }))
                        }
                      >
                        {postExpandCollapse[postId] ? "COLLAPSE" : "EXPAND"}
                      </button>
                    )}
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
