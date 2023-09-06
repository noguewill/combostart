import React, { useState, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import hubCardData from "/gamesData/hubCardData.json";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/ComboHub.module.css";

const ComboHubCards = () => {
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

  const upcomingCards = hubCardData.filter((card) => card.attr === "Upcoming");

  const upcomingCardElements = upcomingCards.map((card) => {
    let cardClassName;
    let videoLink;
    if (card.id === 5) {
      cardClassName = styles.upcoming_left;
      videoLink = "https://www.youtube.com/watch?v=UZ6eFEjFfJ0";
    } else if (card.id === 6) {
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
      <div className={styles.featured_container}>
        <Link href="/Combos" className={styles.featuredCard}>
          <span className={styles.featured_cardTitle}>STREET FIGHTER 6</span>
          <Image
            className={styles.featured_img}
            src="/gameCovers/sf6coverArt.webp"
            alt="street fighter 6"
            width={920}
            height={920}
          />
        </Link>
        <div className={styles.featuredDesc_container}>
          <h2 className={styles[`${theme}featuredDesc_header`]}>
            WANNA LEARN A COMBO?
          </h2>
          <p className={styles[`${theme}featuredDesc_textBody`]}>
            Dive into the ultimate hub for discovering, learning, and sharing
            your combos for a variety of fighting games. Whether you're a
            seasoned player or just getting started, Combostart is the platform
            to showcase your jaw-dropping combos or finding them!
          </p>
          <Link href="/Combos">
            <button type="button" className={styles.featuredDesc_CTA}>
              SHOW ME COMBOS FOR STREET FIGHTER 6
            </button>
          </Link>
        </div>
      </div>

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

export default ComboHubCards;
