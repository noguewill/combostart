import React from "react";

import styles from "@/styles/Navbar.module.css";
import Image from "next/image";
import { useState } from "react";

function Navbar({}) {
  const [showMenu, setShowMenu] = useState(false);
  const [subDirectory, setSubDirectory] = useState(false);
  /* is navbar inside a subdirectory? */
  /* Style to remove bg color of the buttons, as well as hover properties */
  /* Color of the font */

  return (
    <nav className={styles.navbar}>
      {/* Desktop nav buttons */}
      <div className={styles.navbar_logo__container}>
        <div className={styles.navbar_logo}>LOGO</div>
      </div>

      <div className={styles.navbar_btn__container}>
        <button className={styles.navbar_btn}>New Post +</button>
        <button className={styles.navbar_btn}>Combos</button>
        <button className={styles.navbar_btn}>Characters</button>
        <button className={styles.navbar_btn}>About</button>
        <div className={styles.profileBtn_container}>
          <button className={styles.navbar_profileBtn}>
            {" "}
            <Image
              src="/ryuAvatar.png"
              alt="Upvote arrow"
              width={56}
              height={55}
              priority
            />
          </button>
          <a className={styles.profileBtn_username}>WilhelmDM</a>
          <button className={styles.profileBtn_logOut}>Log Out </button>
        </div>
      </div>

      {/* Mobile Menu button */}
      <div className={styles.mobileMenu__container}>
        <button
          className={styles.menuContainer__menuBtn}
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? (
            /* Hamburger icons shows when showMenu is true */
            <svg
              width="28"
              height="19"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http:www.w3.org/2000/svg"
            >
              <rect
                x="2.22266"
                width="15.6282"
                height="1.87538"
                transform="rotate(45 2.22266 0)"
                fill="#FE5959"
              />
              <rect
                x="0.94873"
                y="11.3663"
                width="15.6282"
                height="1.87538"
                transform="rotate(-45 0.94873 11.3663)"
                fill="#FE5959"
              />
            </svg>
          ) : (
            /* If showMenu is false, it show an "X" icon */
            <svg
              width="28"
              height="19"
              viewBox="0 0 28 19"
              fill="none"
              xmlns="http:www.w3.org/2000/svg"
            >
              <rect width="27.9412" height="3.35294" fill="#FE5959" />
              <rect
                y="7.82352"
                width="27.9412"
                height="3.35294"
                fill="#FE5959"
              />
              <rect
                y="15.6471"
                width="27.9412"
                height="3.35294"
                fill="#FE5959"
              />
            </svg>
          )}

          {/* Text underneath the Menu icon */}
          <h6 className={styles.menuBtn__text}>
            {showMenu ? "CLOSE" : "MENU"}
          </h6>
        </button>
      </div>

      {/* Menu is visible when showMenu is true */}
      {showMenu ? (
        <div className={styles.mobileMenu__navParent}>
          <div className={styles.mobileMenu__navContainer}>
            <button className={styles.mobileMenu__navContainer__btn}>
              LOG IN
            </button>
            <button className={styles.mobileMenu__navContainer__btn}>
              COMBOS
            </button>
            <button className={styles.mobileMenu__navContainer__btn}>
              CHARACTERS
            </button>
            <button className={styles.mobileMenu__navContainer__btn}>
              COMMUNITY
            </button>
            <button className={styles.mobileMenu__navContainer__btn}>
              ABOUT
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}

export default Navbar;
