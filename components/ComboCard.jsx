import React, { useState, useEffect } from "react";
import styles from "@/styles/ComboCard.module.css";
import Image from "next/image";
import { recordVote, removeVote } from "./dataSend";
import { fetchVoteData } from "./dataFetch";

const ComboCard = ({ displayedCombos, theme, userId, noShowVote }) => {
  const [parsedComboStrings, setParsedComboStrings] = useState([]);
  const [expandCollapse, setExpandCollapse] = useState(false);
  const [voteStatus, setVoteStatus] = useState({});
  const [currentVotes, setCurrentVotes] = useState({});
  const [renderedPostIds, setRenderedPostIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      displayedCombos.forEach((val) => {
        const postId = val.postId?.S;
        setCurrentVotes((prevVotes) => ({
          ...prevVotes,
          [postId]: parseInt(val.VoteCount?.N, 10),
        }));
      });
    };

    const didUserVote = async () => {
      const newVoteStatus = {};
      for (const combo of displayedCombos) {
        const postId = combo.postId?.S;
        const voteData = await fetchVoteData(postId, userId);
        newVoteStatus[postId] = voteData;
      }
      setVoteStatus(newVoteStatus);
    };
    fetchData();
    didUserVote();
  }, [displayedCombos, userId]);

  // Function to determine whether to show the comboArrow element icon
  const shouldShowComboArrow = (currentIndex) => {
    return currentIndex < parsedComboStrings.length - 1;
  };

  const handleUpvote = async (postId) => {
    try {
      const voteData = await fetchVoteData(postId, userId);

      if (voteData === "upvote") {
        setCurrentVotes((prevVotes) => ({
          ...prevVotes,
          [postId]: prevVotes[postId] - 1,
        }));
        await removeVote(postId, userId, "upvote");
      } else {
        setCurrentVotes((prevVotes) => ({
          ...prevVotes,
          [postId]: prevVotes[postId] + (voteData === "downvote" ? 2 : 1),
        }));
        await recordVote(postId, userId, "upvote");
      }

      const newVoteStatus = { ...voteStatus };
      newVoteStatus[postId] = voteData === "upvote" ? "" : "upvote";
      setVoteStatus(newVoteStatus);
    } catch (error) {
      console.error("Error handling upvote:", error);
    }
  };

  const handleDownvote = async (postId) => {
    try {
      const voteData = await fetchVoteData(postId, userId);

      if (voteData === "downvote") {
        setCurrentVotes((prevVotes) => ({
          ...prevVotes,
          [postId]: prevVotes[postId] + 1,
        }));
        await removeVote(postId, userId, "downvote");
      } else {
        setCurrentVotes((prevVotes) => ({
          ...prevVotes,
          [postId]: prevVotes[postId] - (voteData === "upvote" ? 2 : 1),
        }));
        await recordVote(postId, userId, "downvote");
      }

      const newVoteStatus = { ...voteStatus };
      newVoteStatus[postId] = voteData === "downvote" ? "" : "downvote";
      setVoteStatus(newVoteStatus);
    } catch (error) {
      console.error("Error handling downvote:", error);
    }
  };

  return (
    <>
      {displayedCombos.map((card) => {
        const postId = card.postId?.S;
        if (!renderedPostIds.includes(postId)) {
          setRenderedPostIds((prevIds) => [...prevIds, postId]); // Store the rendered post ID
        }

        const ComboStrings = card.ComboStrings?.S;
        let parsedComboStrings = [];

        if (ComboStrings) {
          try {
            parsedComboStrings = JSON.parse(ComboStrings);
          } catch (error) {
            console.error("Error parsing ComboStrings:", error);
          }
        }
        const stringsCount = parsedComboStrings.reduce(
          (totalCount, comboArray) =>
            totalCount +
            comboArray.filter((item) => item.type === "image").length,
          0
        );

        return (
          <main key={postId} className={styles.comboCard_wrapper}>
            {noShowVote ? (
              ""
            ) : (
              <section className={styles.upvote_container}>
                <button
                  className={`${styles[`${theme}upvote_btn_`]} ${
                    voteStatus[postId] === "upvote"
                      ? styles.upvote_btn_upvote
                      : ""
                  }`}
                  onClick={() => handleUpvote(postId)}
                ></button>
                <span className={styles[`${theme}upvotes`]}>
                  {currentVotes[postId]}
                </span>
                <button
                  className={`${styles[`${theme}downvote_btn_`]} ${
                    voteStatus[postId] === "downvote"
                      ? styles.downvote_btn_downvote
                      : ""
                  }`}
                  onClick={() => handleDownvote(postId)}
                ></button>
              </section>
            )}

            <article className={styles.comboCard_hugger}>
              <header className={styles.postTitle_container}>
                <h2 className={styles[`${theme}postTitle`]}>
                  {card.PostTitle?.S}
                </h2>
                <p className={styles[`${theme}postedBy`]}>
                  posted by
                  <span className={styles.postedBy_authorName}>
                    {card.User?.S}
                  </span>
                  {card.SubmissionDate?.S}
                </p>
                <p className={styles.patchVersion}>PATCH: 1.0.0</p>
              </header>

              <section className={styles.comboCard_container}>
                <div className={styles.avatar_container}>
                  <h4 className={styles[`${theme}avatar_name`]}>
                    {card.Character?.S}
                  </h4>
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
                      <span className={styles[`${theme}mechanic_text`]}>
                        SUPER ART
                      </span>
                    </div>
                    <div className={styles.mechanic_container}>
                      <div className={styles.driveRush}>
                        {card.DriveBars?.N}
                      </div>
                      <span className={styles[`${theme}mechanic_text`]}>
                        DRIVE RUSH
                      </span>
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
                      <span className={styles[`${theme}mechanic_text`]}>
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
                    <div className={styles[`${theme}screenPos`]}>
                      {card.ScreenPosition?.S}
                    </div>
                  </section>
                  <div className={styles.inputs_parent}>
                    <div className={styles[`${theme}inputs__container`]}>
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
                    {stringsCount >= 14 ? (
                      <button
                        className={styles.expand_btn}
                        onClick={() => setExpandCollapse(!expandCollapse)}
                      >
                        {expandCollapse ? "COLLAPSE" : "EXPAND"}
                      </button>
                    ) : null}
                  </div>
                </div>
              </section>
              <div className={styles.comboCard_social__container}>
                {/* Container for the tags */}
                <div className={styles.tag_container}>
                  <button className={styles.tag_btn}>{card.Tags?.S}</button>
                </div>
                {/*              <button className={styles.share__btn}>
                  <Image
                    src="/icons/shareicon.svg"
                    width={26}
                    height={26}
                    alt="share icon"
                  />
                  <span className={styles[`${theme}social_text`]}>share</span>
                </button> */}
              </div>
            </article>
          </main>
        );
      })}
    </>
  );
};

export default ComboCard;
