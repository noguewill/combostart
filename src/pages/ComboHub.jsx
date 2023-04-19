import React, { useState } from "react";
import styles from "@/styles/ComboHub.module.css";
import Navbar from "./Navbar";
import Link from "next/link";

const ComboHub = () => {
  const [cardLimit, setCardLimit] = useState(10);

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
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.square1}>1</div>
          <div className={styles.square2}>2</div>
          <div className={styles.square3}>3</div>
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
