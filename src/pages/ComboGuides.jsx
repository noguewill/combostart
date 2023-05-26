import React, { useState } from "react";
import styles from "@/styles/ComboGuides.module.css";
import Navbar from "./Navbar";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";
import CookieBanner from "./CookieBanner";
import { guideCardData } from "./guideCardData";

const ComboGuides = () => {
  const [cardLimit, setCardLimit] = useState(10);
  const [dataFromChild, setDataFromChild] = useState("");
  const colorStyle =
    dataFromChild === 1 ? { backgroundColor: "" } : { backgroundColor: "" };

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  const cards = guideCardData
    .filter((card) => card.attr !== "Featured") // Ignore cards with "Featured" attribute
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
      <Link
        key={card.id}
        href={card.src}
        className={cardClassName}
        style={colorStyle}
      >
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

  const loadMore = () => {
    setCardLimit(cardLimit + 10);
  };

  return (
    <div className={styles.bigboi}>
      <Navbar btnType={`classic`} />
      <Search btnType={`classic`} onData={handleDataFromChild} />
      <div className={styles.container}>
        <CookieBanner />

        <h2 className={styles.rowTitle}>FEATURED</h2>
        <div className={styles.featuredRow}>{featuredCardElements}</div>
        <h2 className={styles.rowTitle}>ONGOING</h2>
        <div className={styles.ongoingRow}>{cards.slice(0, cardLimit * 3)}</div>
        {cardLimit < 10 && (
          <button className={styles.loadMore_btn} onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default ComboGuides;
