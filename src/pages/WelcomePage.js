import React, { useEffect } from "react";
import styles from "@/styles/WelcomePage.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Login from "./Login";

const WelcomePage = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div className={styles.page}>
      {showOverlay && <Login toggleOverlay={toggleOverlay} />}
      <div className={styles.leftColumn}>
        <h1 className={styles.combo}>COMBO</h1>
        <div className={styles.ball}></div>
        <h1 className={styles.start}>START</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <button className={styles.navbar_btn}>COMBO GUIDES</button>
          <button className={styles.navbar_btn}>SUPPORTED GAMES</button>
          <button className={styles.navbar_btn} onClick={toggleOverlay}>
            LOGIN/SIGN UP
          </button>
        </div>
        <div className={styles.headerDiv}>
          <h3 className={styles.gameNameHeader}>STREET FIGHTER 6</h3>
          <h1 className={styles.heroHeader}>DISCOVER</h1>
        </div>
        <div className={styles.heroDiv}>
          {/* HERO LEFT DIV */}
          <div className={styles.heroLeftDiv}>
            <div className={styles.heroLeftDivWrapper}>
              <div className={styles.paragraphContainer}>
                <p className={styles.heroParagraph}>
                  <span className={styles.paragraphLogo}>COMBOSTART</span>, a
                  community driven website that curates and collects any combo
                  found on the internet for a variety of games such as:
                  <br />
                  <span className={styles.paragraphGame}>STREET FIGHTER 6</span>
                </p>
              </div>

              <div className={styles.comboSelectionContainer}>
                <Link href="/ComboHub" className={styles.comboSelectionHeader}>
                  SHOW ME SOME COMBOS
                </Link>
              </div>
            </div>
          </div>

          {/* HERO RIGHT DIV */}
          <div className={styles.heroRightDiv}>
            <Image
              src="/ryuMainPage.png"
              width={962}
              height={1341}
              style={{
                transform: "scaleX(-1)",
                position: "absolute",
                top: -390,
                left: -135,
                right: 0,
                objectFit: "contain",
              }}
            />

            <h2 className={styles.headerCombos}>COMBOS</h2>
          </div>
        </div>

        <div className={styles.noticeDiv}>
          {/* Add two social media buttons, one for Twitter the other for Instagram */}
          <div className={styles.noticeSocialMediaWrapper}>
            <a href="https://twitter.com/ComboStart" target="_blank">
              <Image
                src="/twitterIcon.svg"
                width={22}
                height={22}
                className={styles.socialMediaIcon}
              />
            </a>
            <a href="https://www.instagram.com/combostart/" target="_blank">
              <Image
                src="/instagramIcon.svg"
                width={22}
                height={22}
                className={styles.socialMediaIcon}
              />
            </a>
          </div>

          <div className={styles.noticeDivWrapper}>
            <h4 className={styles.noticeHeader}>
              FAN WEBSITE | NOT AFFILIATED WITH CAPCOM
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
