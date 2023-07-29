import React, { useState, useContext, useRef } from "react";
import { ThemeContext } from "./ThemeContext";
import hubCardData from "/gamesData/hubCardData.json";
import sf6Data from "/gamesData/sf6.json";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/ComboHub.module.css";

const ComboGuideCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  let hoverTimeoutRef = useRef(null);
  const [cardLimit, setCardLimit] = useState(10);
  const { theme } = useContext(ThemeContext);

  const cards = hubCardData
    .filter((card) => card.attr !== "Featured" && card.attr !== "Upcoming") // Ignore cards with "Featured" or "Upcoming" attribute
    .slice(0, cardLimit * 3)
    .map((card) => (
      <Link key={card.id} href={card.src} className={styles.card}>
        <div className={styles.cardImageContainer}>
          <span className={styles.cardTitle}>{card.name}</span>
          <Image
            src={card.bgImg}
            alt={card.name}
            className={styles.cardImage}
            fill
          />
          <div className={styles.cardWIP}>WIP</div>
        </div>
      </Link>
    ));

  const featuredCards = hubCardData.filter((card) => card.attr === "Featured");

  const featuredCardElements = featuredCards.map((card) => {
    let cardClassName;
    let filterOverride;
    let wipNone;
    let linkPath;

    if (card.id === 1) {
      cardClassName = styles.featuredCard_left;
      filterOverride = { filter: "none" };
      wipNone = { display: "none" };
      linkPath = card.src;
    } else if (card.id === 2) {
      linkPath = "/";
      cardClassName = styles.featuredCard_mid;
    } else if (card.id === 3) {
      linkPath = "/";
      cardClassName = styles.featuredCard_right;
    }

    const handleMouseEnter = () => {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(true);
      }, 1000);
    };

    const handleMouseLeave = () => {
      clearTimeout(hoverTimeoutRef.current);
      setIsHovered(false);
    };

    const getVideoSource = () => {
      const sf6Card = sf6Data.find((item) => item.id === card.id);
      if (sf6Card) {
        return sf6Card.videoSrc;
      }
      return "";
    };
    return (
      <Link
        key={card.id}
        href={linkPath}
        className={cardClassName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered && card.id === 1 ? (
          <>
            <span className={styles.cardTitle}>{card.name}</span>
            <video
              src={getVideoSource()}
              alt={card.name}
              className={styles[`${isHovered}cardVideo`]}
              autoPlay
              muted
              loop
            />
          </>
        ) : (
          <>
            <div className={styles.cardWIP} style={{ visibility: "hidden" }}>
              WIP
            </div>
            <span className={styles.cardTitle}>{card.name}</span>
            <Image
              style={filterOverride}
              className={styles.cardImage}
              src={card.bgImg}
              alt={card.name}
              fill
            />
            <div className={styles.cardWIP} style={wipNone}>
              WIP
            </div>
          </>
        )}
      </Link>
    );
  });

  const upcomingCards = hubCardData.filter((card) => card.attr === "Upcoming");

  const upcomingCardElements = upcomingCards.map((card) => {
    let cardClassName;
    let videoLink;
    if (card.id === 13) {
      cardClassName = styles.upcoming_left;
      videoLink = "https://www.youtube.com/watch?v=UZ6eFEjFfJ0";
    } else if (card.id === 14) {
      cardClassName = styles.upcoming_right;
      videoLink = "https://www.youtube.com/watch?v=2hPuRQz6IlM";
    }

    return (
      <Link
        key={card.id}
        target="_blank"
        href={videoLink}
        className={cardClassName}
      >
        <span className={styles.cardTitle}>{card.name}</span>
        <Image
          style={{ filter: "none" }}
          className={styles.cardImage}
          src={card.bgImg}
          alt={card.name}
          fill
        />
      </Link>
    );
  });

  return (
    <>
      <h2 className={styles[`${theme}rowTitle`]}>FEATURED</h2>
      <div className={styles.featuredRow}>{featuredCardElements}</div>

      <h2 className={styles[`${theme}rowTitle`]}>UPCOMING</h2>
      <div className={styles.upcomingRow}>{upcomingCardElements}</div>

      {/* Ongoing row */}
      <h2 className={styles[`${theme}rowTitle`]} style={{ marginTop: "2rem" }}>
        ONGOING
      </h2>
      <div className={styles.ongoingRow}>{cards.slice(0, cardLimit * 3)}</div>
    </>
  );
};

export default ComboGuideCard;
