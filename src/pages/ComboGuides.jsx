import React, { useState } from "react";
import styles from "@/styles/ComboGuides.module.css";
import Navbar from "./Navbar";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";
import CookieBanner from "./CookieBanner";

const ComboHub = () => {
  const [cardLimit, setCardLimit] = useState(10);
  const [dataFromChild, setDataFromChild] = useState("");
  const colorStyle =
    dataFromChild === 1 ? { backgroundColor: "" } : { backgroundColor: "" };

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };
  const cards = [...Array(cardLimit * 3)].map((_, i) => (
    <Link key={i} href="#" className={styles.card}>
      <h2 className={styles.cardTitle}>Card {i + 1}</h2>
      <div className={styles.cardImageContainer}>
        <img
          src={`https://picsum.photos/seed/${i + 1}/300/200`}
          alt={`Card ${i + 1}`}
          className={styles.cardImage}
        />
      </div>
    </Link>
  ));

  const loadMore = () => {
    setCardLimit(cardLimit + 10);
  };

  return (
    <div className={styles.bigboi}>
      <Navbar btnType={`classic`} />
      <Search btnType={`classic`} onData={handleDataFromChild} />
      <div className={styles.container}>
        <CookieBanner />

        <div className={styles.topRow}>
          <Link
            href={"/"}
            className={styles.featuredCard_left}
            style={colorStyle}
          >
            <span className={styles.cardTitle}>STREET FIGHTER 6</span>
            <Image
              className={styles.cardImage}
              src="/sf6coverArt.webp"
              alt="Picture of the author"
              fill
              object-fit="fit"
            />
          </Link>
          <Link
            href={"/"}
            className={styles.featuredCard_mid}
            style={colorStyle}
          >
            <span className={styles.cardTitle}>TEKKEN 7</span>
            <Image
              className={styles.cardImage}
              src="/tekken7coverArt.jpg"
              alt="Picture of the author"
              fill
              object-fit="fit"
            />
          </Link>
          <Link
            href={"/"}
            className={styles.featuredCard_right}
            style={colorStyle}
          >
            <span className={styles.cardTitle}>MORTAL KOMBAT 11</span>
            <Image
              className={styles.cardImage}
              src="/mk11UltimatecoverArt.webp"
              alt="Picture of the author"
              fill
              object-fit="fit"
            />
          </Link>
        </div>

        <div className={styles.bottomRow}>{cards.slice(0, cardLimit * 3)}</div>
        {cardLimit < 10 && (
          <button className={styles.button} onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default ComboHub;
