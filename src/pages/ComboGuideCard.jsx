import React, { useState } from "react";
import { guideCardData } from "./guideCardData";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/ComboGuides.module.css";

const ComboGuideCard = () => {
  const [cardLimit, setCardLimit] = useState(10);
  const cards = guideCardData
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
        </div>
      </Link>
    ));

  const featuredCards = guideCardData.filter(
    (card) => card.attr === "Featured"
  );

  const featuredCardElements = featuredCards.map((card) => {
    let cardClassName;
    if (card.id === 1) {
      cardClassName = styles.featuredCard_left;
    } else if (card.id === 2) {
      cardClassName = styles.featuredCard_mid;
    } else if (card.id === 3) {
      cardClassName = styles.featuredCard_right;
    }

    return (
      <Link key={card.id} href={card.src} className={cardClassName}>
        <span className={styles.cardTitle}>{card.name}</span>
        <Image
          className={styles.cardImage}
          src={card.bgImg}
          alt={card.name}
          fill
        />
      </Link>
    );
  });

  const upcomingCards = guideCardData.filter(
    (card) => card.attr === "Upcoming"
  );

  const upcomingCardElements = upcomingCards.map((card) => {
    let cardClassName;
    if (card.id === 16) {
      cardClassName = styles.upcoming_left;
    } else if (card.id === 17) {
      cardClassName = styles.upcoming_mid;
    } else if (card.id === 18) {
      cardClassName = styles.upcoming_right;
    }

    return (
      <Link key={card.id} href={card.src} className={cardClassName}>
        <span className={styles.cardTitle}>{card.name}</span>
        <Image
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
      <h2 className={styles.rowTitle}>FEATURED</h2>
      <div className={styles.featuredRow}>{featuredCardElements}</div>

      <h2 className={styles.rowTitle}>UPCOMING</h2>
      <div className={styles.upcomingRow}>{upcomingCardElements}</div>

      {/* Ongoing row */}
      <h2 className={styles.rowTitle} style={{ marginTop: "2rem" }}>
        ONGOING
      </h2>
      <div className={styles.ongoingRow}>{cards.slice(0, cardLimit * 3)}</div>
    </>
  );
};

export default ComboGuideCard;
