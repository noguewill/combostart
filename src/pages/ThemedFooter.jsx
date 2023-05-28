import React, { useState, useEffect } from "react";
import styles from "@/styles/ThemedFooter.module.css";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className={styles.footer_container}>
        <h7 className={styles.footer_warningBanner}>
          sfcombos.com is an unnoficcial fanmade website and is not affiliated
          with CAPCOM or Street Fighter VI in any capacity.
        </h7>
        <section className={styles.footer_body__container}>
          {/*         <div className={styles.stats_container}>
            <h3 className={styles.stats_header}>SFC stats</h3>
            <span className={styles.stat}>
              Most clicked character:{" "}
              <span style={{ color: "#489EEE" }}>Ryu</span>
              <span style={{ color: "#E9FF61" }}> (14%)</span>
            </span>
            <span className={styles.stat}>
              Most viewed combo:{" "}
              <span style={{ color: "#489EEE" }}>
                Ken 6000 damage superless combo by{" "}
              </span>{" "}
              <span style={{ color: "#4BDBFB", fontWeight: "bold" }}>
                sajam
              </span>{" "}
              <span style={{ color: "#E9FF61" }}>(954 views)</span>
            </span>
            <span className={styles.stat}>
              Most combos for a character:{" "}
              <span style={{ color: "#489EEE" }}>Juri</span>
              <span style={{ color: "#E9FF61" }}> (49 posts)</span>
            </span>
            <span className={styles.stat}>
              Highest string count for a character:{" "}
              <span style={{ color: "#489EEE" }}>
                Kimberly edging TOD 26 hit combo
              </span>
              <span style={{ color: "#E9FF61" }}> (26 unique inputs)</span>
            </span>
          </div>
 */}{" "}
          <div className={styles.evoAd_container}>
            <div className={styles.evoAd}>
              <Image
                src={"/capcomProTourLogo.png"}
                alt={"Capcom Pro Tour logo"}
                width={300}
                height={300}
                object-fit="cover"
              />
              <h3 className={styles.cptText}>
                CAPCOM Pro Tour 2023 starts in: <strong>TBD</strong>{" "}
              </h3>
            </div>
          </div>
          <hr className={styles.footer_divider} />
          <div className={styles.quickNav_container}>
            <div className={styles.quickNav_menu__container}>
              <h3 className={styles.quickNav_header}>Quick navigation</h3>
              <button className={styles.quickNav_btn}>New Post +</button>
              <button className={styles.quickNav_btn}>Combos</button>
              <button className={styles.quickNav_btn}>Characters</button>
              <button className={styles.quickNav_btn}>Tier List</button>
              <button className={styles.quickNav_btn}>About</button>
            </div>

            <div className={styles.toTop_container} onClick={scrollToTop}>
              <button className={styles.toTop_btn}></button>
              <a className={styles.toTop_text}>Back to the Top</a>
            </div>
          </div>
        </section>

        {/* Copyright notice */}
        <div className={styles.copyright_container}>
          {/* Desktop nav buttons */}
          <div className={styles.copyright_text__container}>
            <p className={styles.copyright_text}>
              All rights reserved sfcombos.com @2023
            </p>
          </div>

          <div className={styles.copyright_logo__container}>
            <Link href="/" className={styles.copyright_logo}>
              <Image
                src="/logo.svg"
                width={50}
                height={50}
                alt="ComboStart Logo"
              />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
