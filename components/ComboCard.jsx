import React, { useReducer, useCallback } from "react";
import styles from "@/styles/ComboCard.module.css";
import Image from "next/image";
import sf6 from "/gamesData/sf6.json";

// Initialize state object
const initialState = sf6.reduce(
  (acc, card) => ({
    ...acc,
    [card.id]: { count: 0, fill: "#D6D6D6" },
  }),
  {}
);

// Define reducer function for updating state
function reducer(state, action) {
  switch (action.type) {
    case "UPVOTE":
      return {
        ...state,
        [action.id]: {
          count: state[action.id].count === 0 ? 1 : 0,
          fill: state[action.id].count === 0 ? "#69EEC3" : "#D6D6D6",
        },
      };
    default:
      throw new Error();
  }
}

// Define ComboCard component
const ComboCard = () => {
  // Use useReducer hook to manage state
  const [upvotes, dispatch] = useReducer(reducer, initialState);

  // Define function to handle upvote click
  const handleUpvoteClick = useCallback(
    (id) => {
      dispatch({ type: "UPVOTE", id });
    },
    [dispatch]
  );

  // Render ComboCard component

  return (
    <>
      {sf6.map((card) => (
        <article key={card.id} className={styles.combocard_container}>
          <div className={styles.combocard}>
            {/* Render upvote button */}
            {/*       <div className={styles.comboCard_upvote__container}>
              <button
                className={styles.upvoteArrow}
                onClick={() => handleUpvoteClick(card.id)}
              >
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 15 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L14.8612 12.75H0.138784L7.5 0Z"
                    fill={upvotes[card.id].fill}
                  />
                </svg>
              </button>
            
              <span className={styles.comboCard_upvote__text}>
                {upvotes[card.id].count}
              </span>
            </div> */}
            <div className={styles.combocard_hugger}>
              {/* Render card title */}
              <div className={styles.comboCard__title__container}>
                <h4 className={styles.comboCard_title}>{card.cardTitle}</h4>
                <a className={styles.comboCard_title__username}>
                  by {card.author} |
                </a>
                <a className={styles.comboCard_title__timeStamp}>
                  Posted in {card.date}
                </a>
              </div>

              <div className={styles.content_container}>
                {/* Render character frame */}
                <div className={styles.combocard_charFrame__container}>
                  <div className={styles.comboCard_charName}>
                    {card.charName}
                  </div>
                  <div className={styles.combocard_video}>
                    <video controls>
                      <source src={card.videoSrc} type="video/mp4" />
                    </video>
                  </div>
                </div>

                {/* Combo Information row */}
                <div className={styles.combocard_body__container}>
                  <div className={styles.comboCard_info__container}>
                    <div className={styles.comboCard_charName__mobile}>
                      {card.charName}
                    </div>
                    <div className={styles.comboCard_super}>
                      <span style={{ zIndex: 1 }}>S</span>
                    </div>
                    <div className={styles.comboCard_bars}>
                      <span className={styles.comboCard_bars__text}>
                        {card.driveRushBars}
                      </span>
                    </div>
                    <div className={styles.comboCard_damage}>
                      <span className={styles.comboCard_damage__text}>
                        DAMAGE:
                      </span>
                      <span className={styles.comboCard_damageNum__text}>
                        {card.comboDamage}
                      </span>
                      <span className={styles.comboCard_hitNum__text}>
                        | {card.comboHits} hits
                      </span>
                    </div>
                    <div className={styles.comboCard_comboType}>
                      {card.comboType}
                    </div>
                  </div>

                  {/* Inputs row */}
                  <div className={styles.comboCard_inputs__container}>
                    {card.inputs.map((input) => (
                      <figure className={styles.input_container} key={input.id}>
                        <Image
                          src={input.imageSrc}
                          alt={input.altText}
                          width={44}
                          height={44}
                        />
                        <figcaption className={styles.input_text}>
                          {input.figCaption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>

                  {/* Patch version row */}
                  <div className={styles.comboCard_patch__container}>
                    <div className={styles.patch_text__container}>
                      <div className={styles.patch__text}>
                        PATCH: {card.patchVer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Social combocard options */}
              <div className={styles.comboCard_social__container}>
                {/* Container for the tags */}
                <div className={styles.tag_container}>
                  <span className={styles.tag_text}>TAGS:</span>
                  {card.tags.map((tag) => (
                    <button className={styles.tag_btn} key={tag.text}>
                      {tag.text}
                    </button>
                  ))}
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
