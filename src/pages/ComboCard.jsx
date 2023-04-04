import React, { useState, useEffect } from "react";
import styles from "@/styles/ComboCard.module.css";
import Image from "next/image";
import YouTube from "react-youtube";

function ComboCard({
  videoUrl,
  hasSuper,
  usesDriveRush,
  damage,
  hits,
  comboType,
  characterName,
  patchVersion,
  inputType,
  inputTypeText,
  hasPlus,
  comboTitle,
  username,
  lastUpdated,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [containerWidth, setContainerWidth] = useState(null);
  const [contentWidth, setContentWidth] = useState(null);

  useEffect(() => {
    const container = document.getElementById("container");
    const content = document.getElementById("content");

    if (container && content) {
      const containerWidth = container.offsetWidth;
      const contentWidth = content.offsetWidth;

      setContainerWidth(containerWidth);
      setContentWidth(contentWidth);
    }
  }, []);

  const handleExpand = () => {
    setIsExpanded(true);
  };
  console.log(containerWidth + contentWidth);
  const shouldShowExpandButton = () => {
    if (containerWidth && contentWidth) {
      return contentWidth > containerWidth;
    }
    return false;
  };

  return (
    <>
      <div className={styles.comboCard__title__container}>
        <h4 className={styles.comboCard_title}>{comboTitle}</h4>
        <a className={styles.comboCard_title__username}>by {username} |</a>
        <a className={styles.comboCard_title__timeStamp}>
          Updated in {lastUpdated}
        </a>
      </div>

      {/* Combocard upvotes */}

      {/* ComboCard */}
      <article className={styles.combocard}>
        {/* Character frame */}
        <div className={styles.comboCard_upvote__container}>
          <button className={styles.upvoteArrow}>
            <Image
              src="/upvoteArrow.svg"
              alt="Upvote arrow"
              width={13}
              height={11}
              priority
            />
          </button>
          <span className={styles.comboCard_upvote__text}>469</span>
        </div>
        <div className={styles.combocard_hugger}>
          <div className={styles.combocard_charFrame__container}>
            <div className={styles.comboCard_charName}>{characterName} </div>
            <div className={styles.combocard_video}>
              <YouTube
                videoId={videoUrl}
                height={315}
                width={560}
                opts={{
                  controls: 1, // Disable player controls
                  autoplay: 1, // Automatically start playing
                }}
              />
            </div>
          </div>

          {/* Combo Information row */}
          <div className={styles.combocard_body__container}>
            <div className={styles.comboCard_info__container}>
              <div className={styles.comboCard_charName__mobile}>RYU</div>
              <div className={styles.comboCard_super}>
                <span style={{ zIndex: 1 }}>S</span>
              </div>
              <div className={styles.comboCard_bars}>
                <span className={styles.comboCard_bars__text}>4 BARS</span>
              </div>
              <div className={styles.comboCard_damage}>
                <span className={styles.comboCard_damage__text}>DAMAGE:</span>
                <span className={styles.comboCard_damageNum__text}>
                  {damage}
                </span>
                <span className={styles.comboCard_hitNum__text}>
                  | {hits} hits
                </span>
              </div>
              <div className={styles.comboCard_comboType}>{comboType}</div>
            </div>

            {/* Inputs row */}
            <div
              id="container"
              style={{
                height: isExpanded ? "" : "20rem",
                overflow: "hidden",
              }}
              className={styles.comboCard_inputs__container}
            >
              <div
                id="content"
                /*    style={{ paddingBottom: "1rem" }} */
                className={styles.input_container}
              >
                <Image
                  /*     className={styles.input_icon} */
                  src="/inputs/kickA.svg"
                  alt="Street Fighter medium punch icon input"
                  width={54}
                  height={54}
                  object-fit="cover"
                />
                <span className={styles.input_text}>B.AK</span>
              </div>
              {/*    <span style={{ color: "white" }}>+</span> */}
              <div className={styles.input_container}>
                <Image
                  /*     className={styles.input_icon} */
                  src="/inputs/punchM.svg"
                  alt="Street Fighter medium punch icon input"
                  width={54}
                  height={54}
                  object-fit="cover"
                />
                <span className={styles.input_text}>S.MP</span>
              </div>
              <div className={styles.input_container}>
                <Image
                  /*     className={styles.input_icon} */
                  src="/inputs/kickH.svg"
                  alt="Street Fighter medium punch icon input"
                  width={54}
                  height={54}
                  object-fit="cover"
                />
                <span className={styles.input_text}>S.MP</span>
              </div>
              <div className={styles.input_container}>
                <Image
                  /*     className={styles.input_icon} */
                  src="/inputs/arrow.svg"
                  alt="Street Fighter medium punch icon input"
                  width={34}
                  height={34}
                  object-fit="cover"
                />
                <span className={styles.input_text}>F</span>
              </div>
              <div className={styles.input_container}>
                <Image
                  /*     className={styles.input_icon} */
                  src="/inputs/punchH.svg"
                  alt="Street Fighter medium punch icon input"
                  width={54}
                  height={54}
                  object-fit="cover"
                />
                <span className={styles.input_text}>S.MP</span>
              </div>
              <div className={styles.input_container}>
                <Image
                  /*     className={styles.input_icon} */
                  src="/inputs/arrow.svg"
                  alt="Street Fighter medium punch icon input"
                  width={34}
                  height={34}
                  object-fit="cover"
                />
                <span className={styles.input_text}>F</span>
              </div>
              <div className={styles.input_container}>
                <Image
                  /*     className={styles.input_icon} */
                  src="/inputs/punchA.svg"
                  alt="Street Fighter medium punch icon input"
                  width={54}
                  height={54}
                  object-fit="cover"
                />
                <span className={styles.input_text}>F.AP</span>
              </div>
              <div className={styles.input_container}>
                <Image
                  /*     className={styles.input_icon} */
                  src="/inputs/punchM.svg"
                  alt="Street Fighter medium punch icon input"
                  width={54}
                  height={54}
                  object-fit="cover"
                />
                <span className={styles.input_text}>QCF.ML</span>
              </div>
              <div className={styles.input_container}>
                <Image
                  /*     className={styles.input_icon} */
                  src="/inputs/kickL.svg"
                  alt="Street Fighter medium punch icon input"
                  width={54}
                  height={54}
                  object-fit="cover"
                />
                <span className={styles.input_text}>B.LK</span>
              </div>
              <div className={styles.input_container}>
                <Image
                  /*     className={styles.input_icon} */
                  src="/inputs/punchH.svg"
                  alt="Street Fighter medium punch icon input"
                  width={54}
                  height={54}
                  object-fit="cover"
                />
                <span className={styles.input_text}>S.HP</span>
              </div>
            </div>

            {/* Patch version row */}
            <div className={styles.comboCard_patch__container}>
              <div className={styles.patch_text__container}>
                <div className={styles.patch__text}>PATCH: v1.0.0</div>
              </div>
              {shouldShowExpandButton() && !isExpanded && (
                <div className={styles.expand_btn__container}>
                  <button onClick={handleExpand} className={styles.expand_btn}>
                    EXPAND<div className={styles.expand_arrowDown}></div>
                  </button>
                </div>
              )}
            </div>
            {/* Bookmark, sharing, and other options section */}
          </div>
        </div>
      </article>

      {/* Social combocard options */}
      <div className={styles.comboCard_social__container}>
        <button className={styles.social_bookmark__btn}>
          {" "}
          <Image
            src="/bookmark.svg"
            alt="Picture of the author"
            width={24}
            height={24}
          />
        </button>
        <button className={styles.social_share__btn}>
          {" "}
          <Image
            src="/shareIcon.svg"
            alt="Picture of the author"
            width={24}
            height={24}
          />
        </button>
      </div>
    </>
  );
}
export default ComboCard;
