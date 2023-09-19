import React, { useState } from "react";
import styles from "@/styles/StickyButton.module.css";
import Link from "next/link";
import Image from "next/image";

const StickyButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.sticky_button_container}>
      <button className={styles.sticky_button} onClick={toggleMenu}>
        {isMenuOpen ? "X" : "Support Combostart "}
      </button>
      {isMenuOpen && (
        <div className={styles.menu}>
          <Link
            target="_blank"
            href="https://patreon.com/COMBOSTART"
            className={styles.paymentOption_patreon}
          >
            <div className={styles.logo_container_patreon}>
              <Image
                className={styles.logo_icon}
                src="/icons/patreonLogo.svg"
                fill
                alt="Patreon logo"
              />
            </div>
            PATREON
          </Link>
          <Link
            target="_blank"
            href="https://ko-fi.com/combostart"
            className={styles.paymentOption_kofi}
          >
            <div className={styles.logo_container}>
              <Image
                className={styles.logo_icon}
                src="/icons/kofiLogo.svg"
                fill
                alt="Ko-fi logo"
              />
            </div>
            KO-FI
          </Link>
        </div>
      )}
    </div>
  );
};

export default StickyButton;
