import React from "react";
import styles from "@/styles/WelcomePage.module.css";
import Link from "next/link";
import Image from "next/image";

const WelcomePage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.leftColumn}>
        <h1 className={styles.combo}>COMBO</h1>
        <div className={styles.ball}></div>
        <h1 className={styles.start}>START</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <button>HOME</button>
          <button>ABOUT</button>
          <button>SERVICES</button>
          <button>CONTACT</button>
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
                <h5 className={styles.comboSelectionHeader}>
                  Show combos for:
                </h5>
                <div className={styles.comboBtnContainer}>
                  <button className={styles.comboBtn}></button>
                  <button className={styles.comboBtn}></button>
                  <button className={styles.comboBtn}></button>
                </div>
              </div>
              <Link className={styles.homeBtnContainer} href="/">
                <span className={styles.homeBtn}>
                  CONTINUE TO COMBOSTART.COM
                </span>
              </Link>
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

        <div className={styles.noticeDiv}></div>
      </div>
    </div>
  );
};

export default WelcomePage;
