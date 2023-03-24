import React from "react";
import styles from "@/styles/Footer.module.css";

function Footer() {
  return (
    <>
      <footer className={styles.footer_container}>
        {/* Page navigation menu */}
        <div className={styles.comboCard_pager}>
          <button className={styles.pager_leftArrow}>left</button>
          <div className={styles.pager_num}>
            <h8>1</h8> <a>dot</a>
          </div>
          <div className={styles.pager_num}>
            <h8>2</h8> <a>dot</a>
          </div>
          <div className={styles.pager_num}>
            <h8>3</h8> <a>dot</a>
          </div>
          <div className={styles.pager_num}>
            <h8>4</h8> <a>dot</a>
          </div>
          <button className={styles.pager_rightArrow}>right</button>
        </div>

        <h7 className={styles.footer_warningBanner}>
          sfcombos.com is an unnoficcial fanmade website and is not affiliated
          with CAPCOM or Street Fighter VI in any capacity.
        </h7>
        <section className={styles.footer_body__container}>
          {/* Stats column */}
          <div className={styles.stats_container}>
            <h3 className={styles.stats_header}>SFC stats</h3>
            <h8 className={styles.stat}>Lorem ipsum ich delat tsunum</h8>
            <h8 className={styles.stat}>Tsunum delat ich ipsum lorem</h8>
            <h8 className={styles.stat}>Lorem ipsum ich delat tsunum</h8>
            <h8 className={styles.stat}>Tsunum delat ich ipsum lorem</h8>
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
            <div className={styles.toTop_container}>
              <button className={styles.toTop_btn}>arrow</button>
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
