import React from "react";
import styles from "@/styles/Footer.module.css";

function Footer() {
  return (
    <>
      <footer className={styles.footer_container}>
        <h7 className={styles.footer_warningBanner}>
          sfcombos.com is an unnoficcial fanmade website and is not affiliated
          with CAPCOM or Street Fighter VI in any capacity.
        </h7>

        {/* Stats column */}
        <div className={styles.menu_sfcStats__container}>
          <h3 className={styles.stat_header}>SFC stats</h3>
          <h8 className={styles.stat}>Lorem ipsum ich delat tsunum</h8>
          <h8 className={styles.stat}>Tsunum delat ich ipsum lorem</h8>
          <h8 className={styles.stat}>Lorem ipsum ich delat tsunum</h8>
          <h8 className={styles.stat}>Tsunum delat ich ipsum lorem</h8>
        </div>

        <hr className={styles.stat_divider} />

        {/* Quick navigation column */}
        <div className={styles.menu_quickNavigation}>
          <h3 className={styles.stat_header}>Quick navigation</h3>
          <button className={styles.footer_navigationMenu_btn}>
            New Post +
          </button>
          <button className={styles.footer_navigationMenu_btn}>Combos</button>
          <button className={styles.footer_navigationMenu_btn}>
            Characters
          </button>
          <button className={styles.footer_navigationMenu_btn}>
            Tier List
          </button>
          <button className={styles.footer_navigationMenu_btn}>About</button>
        </div>

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

        {/* Copyright notice */}
        <div className={styles.copyrightNotice}>
          <p>All rights reserved sfcombos.com @2023</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
