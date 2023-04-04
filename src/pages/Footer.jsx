import React, { useState, useEffect } from "react";
import styles from "@/styles/Footer.module.css";

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
        {/* Page navigation menu */}
        <div className={styles.comboCard_pager}>
          <button
            className={styles.pager_leftArrow}
            style={{ visibility: "hidden" }}
          ></button>
          <div className={styles.pager_num}>
            <span style={{ color: "#69eec3" }}>1</span>{" "}
            <a
              className={styles.pager_num__dot}
              style={{ backgroundColor: "#69eec3" }}
            ></a>
          </div>
          <div className={styles.pager_num}>
            <span>2</span> <a className={styles.pager_num__dot}></a>
          </div>
          <div className={styles.pager_num}>
            <span>3</span> <a className={styles.pager_num__dot}></a>
          </div>
          <div className={styles.pager_num}>
            <span>4</span> <a className={styles.pager_num__dot}></a>
          </div>
          <button className={styles.pager_rightArrow}></button>
        </div>

        <h7 className={styles.footer_warningBanner}>
          sfcombos.com is an unnoficcial fanmade website and is not affiliated
          with CAPCOM or Street Fighter VI in any capacity.
        </h7>
        <section className={styles.footer_body__container}>
          {/* Stats column */}
          <div className={styles.stats_container}>
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

          <hr className={styles.footer_divider} />

          {/* Quick navigation column */}
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
            <button className={styles.copyright_logo}>LOGO</button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
