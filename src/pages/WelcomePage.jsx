import React from "react";
import styles from "@/styles/WelcomePage.module.css";
import Link from "next/link";
import Image from "next/image";
import CookieBanner from "../../components/CookieBanner";

const WelcomePage = () => {
  return (
    <>
      <div className={styles.mobileMessage}>
        <h3 style={{ fontSize: "2rem" }}>Hello!</h3>
        <p style={{ padding: "1rem" }}>
          The mobile version of this website is still in{" "}
          <strong>development</strong>, please access this website on your PC.
        </p>
        <img
          src="/logo.svg"
          alt="Combostart logo"
          width={50}
          height={50}
          style={{ marginTop: "2rem" }}
        />
      </div>
      <div className={styles.page_container}>
        <CookieBanner />
        <div className={styles.leftColumn}>
          <h1 className={styles.combo}>COMBO</h1>
          <div className={styles.ball}></div>
          <h1 className={styles.start}>START</h1>
        </div>
        <div className={styles.container}>
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
                    <span className={styles.paragraphGame}>
                      STREET FIGHTER 6
                    </span>
                  </p>
                </div>

                <div className={styles.comboSelectionContainer}>
                  <Link
                    href="/ComboGuides"
                    className={styles.comboSelectionHeader}
                  >
                    SHOW ME SOME COMBOS
                  </Link>
                </div>
              </div>
            </div>

            {/* HERO RIGHT DIV */}
            <div className={styles.heroRightDiv}>
              <Image
                src="/ryuMainPage.png"
                alt="Street Fighter character Ryu"
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
                  alt="Icon for the social media platform Twitter"
                  width={20}
                  height={20}
                  className={styles.socialMediaIcon}
                />
              </a>
              <a href="https://www.instagram.com/combostart/" target="_blank">
                <Image
                  src="/instagramIcon.svg"
                  alt="Icon for the social media platform Instagram"
                  width={20}
                  height={20}
                  className={styles.socialMediaIcon}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
