import React, { useState } from "react";
import styles from "@/styles/ComboHub.module.css";
import Navbar from "./Navbar";
import Link from "next/link";
import Search from "./Search";

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
        <div className={styles.topRow}>
          <Link
            href={"/"}
            className={styles.featuredCard_left}
            style={colorStyle}
          >
            <span className={styles.cardTitle}>STREET FIGHTER 6</span>
            <div className={styles.square1}></div>
          </Link>
          <Link
            href={"/"}
            className={styles.featuredCard_mid}
            style={colorStyle}
          >
            <span className={styles.cardTitle}>TEKKEN 7</span>
            <div className={styles.square2}></div>
          </Link>
          <Link
            href={"/"}
            className={styles.featuredCard_right}
            style={colorStyle}
          >
            <span className={styles.cardTitle}>MORTAL KOMBAT 11</span>
            <div className={styles.square3}></div>
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
