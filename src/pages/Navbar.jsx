import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Navbar.module.css";
import Login from "./Login";

function Navbar({ loggedIn, btnType, themeOverride }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      {/* Desktop nav buttons */}
      <div className={styles.navbar_logo__container}>
        <Link href="/" className={styles.navbar_logo}>
          <Image src="/logo.svg" width={50} height={50} alt="ComboStart Logo" />
        </Link>
      </div>

      <div className={styles.navbar_btn__container}>
        {/*         <button className={styles[`${btnType}_nav_btn`]} style={themeOverride}>
          NEW POST +
        </button> */}
        <Link
          href="/ComboGuides"
          className={styles[`${btnType}_nav_btn`]}
          style={themeOverride}
        >
          COMBOS HUB
        </Link>
        <span
          href="/ComboPage"
          className={styles[`${btnType}_nav_btn`]}
          style={themeOverride}
        >
          COMBOS PAGE
        </span>

        {/*         <button className={styles[`${btnType}_nav_btn`]} style={themeOverride}>
          SAVED COMBOS
        </button> */}

        {/* Only show if the user is logged in */}
        {loggedIn ? (
          <div
            className={styles.profileBtn_container}
            style={{ display: "none" }} /* TEMPORARY TEMPORARY TEMPORARY */
          >
            <div className={styles.navbar_profileBtn}>
              <Image
                src="/ryuAvatar.png"
                alt="Upvote arrow"
                width={56}
                height={55}
                style={{ border: "2px solid #69eec3" }}
                priority
              />
              <button
                className={styles.arrow_btn}
                onClick={() => handleDropdownClick()}
              >
                <svg
                  className={
                    isOpen ? `${styles.icon} ${styles.rotated}` : styles.icon
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
            <span className={styles[`${btnType}_profileBtn_username`]}>
              WilhelmDM
            </span>
            {isOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdown_container}>
                  <button className={styles.dropdown_item_btn}>PROFILE</button>

                  <button className={styles.dropdown_item_btn}>MY POSTS</button>

                  <button className={styles.dropdown_item_btn}>
                    SAVED POSTS
                  </button>
                </div>
                <hr style={{ width: "100%" }} />
                <div
                  className={styles.submenu_container}
                  style={{ alignItems: "flex-start", fontSize: "0.2rem" }}
                >
                  <button className={styles.submenu_item_btn}>SETTINGS</button>

                  <button className={styles.submenu_item_btn}>
                    TERMS AND CONDITIONS
                  </button>

                  <button className={styles.dropdown_logout_btn}>
                    LOG OUT
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/*             <button
              className={styles[`${btnType}_nav_btn`]}
              style={themeOverride}
              onClick={toggleOverlay}
            >
              LOG IN | SIGN UP
            </button> */}
          </>
        )}
      </div>

      {showOverlay && <Login toggleOverlay={toggleOverlay} />}
      {/* Mobile Menu button */}
      <div className={styles.mobileMenu__container} style={{ display: "none" }}>
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
