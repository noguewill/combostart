import React from "react";
import styles from "@/styles/ThemedFooter.module.css";
import Image from "next/image";
import Link from "next/link";

const ThemedFooter = () => {
  return (
    <>
      <footer className={styles.footer_container}>
        <h6 className={styles.footer_warningBanner}>
          combostart.com is an unnoficcial fanmade website and is not affiliated
          with CAPCOM or STREET FIGHTER 6 in any capacity.
        </h6>
        <section className={styles.footer_body__container}>
          {/*           <div className={styles.evoAd_container}>
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
          </div> */}
          {/* 
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
          </div> */}
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
};

export default ThemedFooter;
