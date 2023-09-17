import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/ComboHub.module.css";
import { useRouter } from "next/router";

const ComboHubCards = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const selectGame = (chosenGame) => {
    if (typeof window !== "undefined") {
      // Check if we are on the client-side
      router.push(`/combos/${chosenGame}`);
    }
  };

  return (
    <>
      <div className={styles.featured_container}>
        <div className={styles.featuredCard}>
          <Image
            className={styles.splashKeyArt}
            src="/gameCovers/splashImg.png"
            alt="Combostart splash cover"
            fill
          />
        </div>
        <div className={styles.featuredDesc_container}>
          <h2 className={styles[`${theme}featuredDesc_header`]}>
            WANNA LEARN A COMBO?
          </h2>
          <p className={styles[`${theme}featuredDesc_textBody`]}>
            Dive into the ultimate hub for discovering, learning, and sharing
            your combos for a variety of fighting games. Whether you are a
            seasoned player or just getting started, Combostart is the platform
            to showcase your jaw-dropping combos or finding them!
          </p>
          <div className={styles.featuredDesc_CTA_container}>
            <span className={styles[`${theme}CTA_header`]}>
              SHOW COMBOS FOR:
            </span>
            <button
              type="button"
              className={styles.featuredDesc_CTA}
              onClick={() => selectGame("streetfighter6")}
            >
              STREET FIGHTER 6
            </button>
            <span className={styles[`${theme}CTA_header`]}>OR</span>
            <button
              type="button"
              className={styles.featuredDesc_CTA}
              onClick={() => selectGame("mortalkombat1")}
            >
              MORTAL KOMBAT 1
            </button>
          </div>
        </div>
      </div>
      {/* Ongoing row */}
      <h2 className={styles[`${theme}rowTitle`]}>ONGOING</h2>
      <div className={styles.upcomingRow}>
        <button
          className={styles.mainCard}
          onClick={() => selectGame("mortalkombat1")}
        >
          <span className={styles.cardTitle}>Mortal Kombat 1</span>
          <Image
            className={styles.cardImage}
            src="/gameCovers/mkOne2023m.jpg"
            alt={"Mortal Kombat 1"}
            fill
          />
        </button>
        <button
          className={styles.mainCard}
          onClick={() => selectGame("streetfighter6")}
        >
          <span className={styles.cardTitle}>STREET FIGHTER 6</span>
          <Image
            className={styles.cardImage}
            src="/gameCovers/sf6coverArt.webp"
            alt="street fighter 6"
            width={920}
            height={920}
          />
        </button>
      </div>

      <h2 className={styles[`${theme}rowTitle`]}>UPCOMING</h2>
      <div className={styles.upcomingRow}>
        <Link
          target="_blank"
          href="https://www.youtube.com/watch?v=Z1FgmHRPtLU"
          className={styles.mainCard}
        >
          <span className={styles.cardTitle}>Killer Instinct</span>
          <Image
            className={styles.cardImage}
            src="/gameCovers/killerinstinct2013coverArt.jpeg"
            alt={"Killer Instinct"}
            fill
          />
        </Link>
        <Link
          target="_blank"
          href="https://www.youtube.com/watch?v=2hPuRQz6IlM"
          className={styles.mainCard}
        >
          <span className={styles.cardTitle}>TEKKEN 8</span>
          <Image
            className={styles.cardImage}
            src="/gameCovers/tekken8.webp"
            alt={"TEKKEN 8"}
            fill
          />
        </Link>
      </div>
    </>
  );
};

export default ComboHubCards;
