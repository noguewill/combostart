import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import styles from "@/styles/ComboCard.module.css";
import Image from "next/image";

// Define ComboCard component
const ComboCard = ({ displayedCombos }) => {
  const { theme } = useContext(ThemeContext);
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

  const handleExpandClick = () => {
    setRow2Visible(!isRow2Visible); // Toggle the visibility of row2
  };

  // Function to determine whether to show the expand button
  const shouldShowExpandButton = (card) => {
    return card.inputs.length > 14;
  };

  return (
    <>
      {displayedCombos.map((card) => (
        <article key={card.id?.N} className={styles.combocard_container}>
          <div className={styles.combocard}>
            {/* Render upvote button */}
            <div className={styles.comboCard_upvote__container}>
              <button className={styles.upvoteArrow}>
                <svg
                  width="12"
                  height="10"
                  viewBox="0 0 15 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L14.8612 12.75H0.138784L7.5 0Z"
                    fill={"#ebebeb"}
                  />
                </svg>
              </button>

              <span className={styles[`${theme}comboCard_upvote__text`]}>
                0
              </span>
            </div>

            <div className={styles.combocard_hugger}>
              {/* Render card title */}
              <div className={styles.comboCard__title__container}>
                <h4 className={styles[`${theme}comboCard_title`]}>
                  {card.PostTitle?.S}
                </h4>
                <a className={styles.comboCard_title__username}>
                  {card.User?.S} |
                </a>
                <a className={styles.comboCard_title__timeStamp}>
                  Posted in {card.SubmissionDate?.S}
                </a>
              </div>

              <div className={styles[`${theme}content_container`]}>
                {/* Render character frame */}
                <div className={styles.combocard_charFrame__container}>
                  <div className={styles[`${theme}comboCard_charName`]}>
                    {card.Character?.S}
                  </div>

                  <Image
                    className={styles.charAvatar_img}
                    src={`/comboAvatars/sf6/sf6_charAvatar_${card.Character?.S}.png`}
                    alt="blanka"
                    width={100}
                    height={100}
                  />
                </div>

                {/* Combo Information row */}
                <div className={styles.combocard_body__container}>
                  <div className={styles.comboCard_info__container}>
                    <div className={styles.comboCard_super}>
                      <span style={{ zIndex: 1 }}>S</span>
                    </div>
                    <div className={styles.comboCard_bars}>
                      <span className={styles.comboCard_bars__text}>
                        {card.DriveBars?.N}
                      </span>
                    </div>
                    <div className={styles.comboCard_damage_bar}>
                      <div className={styles.comboCard_damage_text_container}>
                        <span className={styles.comboCard_damage__text}>
                          DAMAGE:
                        </span>
                        <span className={styles.comboCard_damageNum__text}>
                          {card.Damage?.N}
                        </span>
                        <span className={styles.dmgDot}></span>
                        <span className={styles.comboCard_hitNum__text}>
                          {card.Hits?.N} hits
                        </span>
                      </div>
                    </div>
                    <div className={styles[`${theme}comboCard_comboType`]}>
                      {card.ScreenPosition?.S}
                    </div>
                  </div>
                  {/* Inputs row */}
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
                  {/* 
                  {isRow2Visible && (
                    <div
                      id="row2"
                      className={styles.comboCard_inputs__container}
                    >
                      {card.inputs.slice(14, 28).map((input) => (
                        <figure
                          className={styles.input_container}
                          key={input.id}
                        >
                          <Image
                            src={input.imageSrc}
                            alt={input.altText}
                            width={34}
                            height={34}
                          />
                          <figcaption className={styles[`${theme}input_text`]}>
                            {input.figCaption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )} 
                  {/* Patch version row */}
                  <div className={styles.comboCard_patch__container}>
                    <div className={styles.patch_text__container}>
                      <div className={styles.patch__text}>
                        PATCH: 1.0.0{/* {card.patchVer} */}
                      </div>
                    </div>

                    {/*           {shouldShowExpandButton(card) && (
                      <button
                        className={styles.expand_btn}
                        onClick={handleExpandClick}
                      >
                        {isRow2Visible ? "Collapse" : "Expand"}
                      </button>
                    )} */}
                  </div>
                </div>
              </div>

              {/* Social combocard options */}
              <div className={styles.comboCard_social__container}>
                {/* Container for the tags */}
                <div className={styles.tag_container}>
                  <span className={styles.tag_text}>TAGS:</span>

                  <button className={styles.tag_btn}>{card.Tags?.S}</button>
                </div>
                {/* Container for the social buttons   */}
                <div className={styles.socialOptions_container}>
                  {/*            <button className={styles.social_bookmark__btn}>
                    <Image
                      src="/bookmark.svg"
                      alt="Picture of the author"
                      width={24}
                      height={24}
                    />
                  </button>
                  <button className={styles.social_share__btn}>
                    <Image
                      src="/shareIcon.svg"
                      alt="Picture of the author"
                      width={24}
                      height={24}
                    />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default ComboCard;
