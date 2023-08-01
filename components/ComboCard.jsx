import React, { useState, useEffect } from "react";
import styles from "@/styles/ComboCard.module.css";
import Image from "next/image";

const ComboCard = ({ displayedCombos, theme, userId }) => {
  const [parsedComboStrings, setParsedComboStrings] = useState([]);
  const [isRow2Visible, setRow2Visible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (displayedCombos.length > 0) {
        const { ComboStrings } = displayedCombos[0];

        if (ComboStrings && ComboStrings.S) {
          try {
            setParsedComboStrings(JSON.parse(ComboStrings.S));
          } catch (error) {
            console.error("Error parsing ComboStrings:", error);
          }
        }
      }
    };

    fetchData();
  }, [displayedCombos]);

  // Function to determine whether to show the comboArrow
  const shouldShowComboArrow = (currentIndex) => {
    return currentIndex < parsedComboStrings.length - 1;
  };

  /*   const handleExpandClick = () => {
    setRow2Visible(!isRow2Visible); // Toggle the visibility of row2
  };
 */
  /*   // Function to determine whether to show the expand button
  const shouldShowExpandButton = (card) => {
    return card.inputs.length > 14;
  }; */

  return (
    <>
      {displayedCombos.map((card) => (
        <main key={card.id?.N} className={styles.comboCard_wrapper}>
          <section className={styles.upvote_container}>
            <button className={styles.upvote_btn}></button>
            <span className={styles.upvotes}>69</span>
            <button className={styles.downvote_btn}></button>
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
                    width={100}
                    height={100}
                    className={styles.avatar_img}
                    alt={card.Character?.S}
                  />
                </div>
              </div>
              <div className={styles.statsAndCombo_container}>
                <section className={styles.stats_container}>
                  {/* Mechanics */}
                  <div className={styles.mechanic_container}>
                    <div className={styles.mechanic}>LVL 1</div>
                    <span className={styles.mechanic_text}>SUPER ART</span>
                  </div>
                  <div className={styles.mechanic_container}>
                    <div className={styles.driveRush}>{card.DriveBars?.N}</div>
                    <span className={styles.mechanic_text}>DRIVE RUSH</span>
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
                      <span className={styles.dmg_stat_text}>PERCENTAGE</span>
                      <span className={styles.dmg_stat_number}>40%</span>
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
                            <span className={styles.plusSign}>{val.value}</span>
                          ) : (
                            <>
                              <figure
                                className={styles.comboString_string_container}
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
                <span className={styles.tag_text}>TAGS:</span>

                <button className={styles.tag_btn}>{card.Tags?.S}</button>
              </div>
            </div>
          </article>
        </main>
      ))}
    </>
  );
};

export default ComboCard;
