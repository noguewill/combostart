import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Navbar.module.css";
import Login from "./Login";

const Navbar = ({ btnType, themeOverride, setGameName }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay((prevShowOverlay) => !prevShowOverlay);
  };

  const handleDropdownClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleGameName = (newGameName) => {
    // Call setGameName with the desired value
    setGameName(newGameName);
  };

  const handleVerificationSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo__container}>
        <Link href="/" className={styles.navbar_logo}>
          <Image src="/logo.svg" width={50} height={50} alt="ComboStart Logo" />
        </Link>
      </div>

      <div className={styles.navbar_btn__container}>
        <Link
          href="/ComboHub"
          className={styles[`${btnType}_nav_btn`]}
          style={themeOverride}
        >
          COMBO HUB
        </Link>
        <span
          href="/ComboGuides"
          className={styles[`classic_nav_hoverBtn`]}
          style={themeOverride}
        >
          COMBO GUIDES {/* Combos Page Submenu */}
          <div className={styles.combosPage_submenu_parent}>
            <div className={styles.arrowUp}></div> {/* Arrow Icon */}
            <div className={styles.combosPage_submenu_container}>
              {/* This is a button section */}
              <div className={styles.combosPage_submenu}>
                <h1 className={styles.combosPage_submenu_header}>FEATURED</h1>
                <Link href="/ComboGuides" onClick={() => handleGameName(sf6)}>
                  <span className={styles.combosPage_submenu_btn}>
                    Street Fighter 6
                  </span>
                </Link>

                <Link href="/">
                  <span className={styles.combosPage_submenu_btn_disabled}>
                    Tekken 7 (<span style={{ color: "#fcd12a" }}>WIP</span>)
                  </span>
                </Link>

                <Link href="/">
                  <span className={styles.combosPage_submenu_btn_disabled}>
                    Mortal Kombat 11 (
                    <span style={{ color: "#fcd12a" }}>WIP</span>)
                  </span>
                </Link>
              </div>

              <div
                className={styles.combosPage_submenu}
                style={{ marginLeft: "0.9rem", marginRight: "0.9rem" }}
              >
                <h1 className={styles.combosPage_submenu_header}>ONGOING</h1>
                <Link href="/">
                  <span className={styles.combosPage_submenu_btn_disabled}>
                    Guilty Gear Strive (
                    <span style={{ color: "#fcd12a" }}>WIP</span>)
                  </span>
                </Link>

                <Link href="/">
                  <span className={styles.combosPage_submenu_btn_disabled}>
                    The King of Fighters XV (
                    <span style={{ color: "#fcd12a" }}>WIP</span>)
                  </span>
                </Link>
                <Link href="/">
                  <span className={styles.combosPage_submenu_btn_disabled}>
                    Smash Bros Ultimate (
                    <span style={{ color: "#fcd12a" }}>WIP</span>)
                  </span>
                </Link>
              </div>
              {/* This is a button section */}
              <div className={styles.combosPage_submenu}>
                <h1 className={styles.combosPage_submenu_header}>UPCOMING</h1>
                <Link
                  target="_blank"
                  href="https://www.youtube.com/watch?v=UZ6eFEjFfJ0"
                  style={{ color: "#8a8a8a" }}
                >
                  <span className={styles.combosPage_submenu_btn}>
                    Mortal Kombat 1 (2023)
                  </span>
                </Link>
                <Link
                  target="_blank"
                  href="https://www.youtube.com/watch?v=2hPuRQz6IlM"
                  style={{ color: "#8a8a8a" }}
                >
                  <span className={styles.combosPage_submenu_btn}>
                    Tekken 8
                  </span>
                </Link>
                <Link
                  target="_blank"
                  href="https://www.youtube.com/watch?v=Sc3GbTpkAmw"
                  style={{ color: "#8a8a8a" }}
                >
                  <span className={styles.combosPage_submenu_btn}>
                    GranBlue Fantasy: Rising
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </span>
        <span
          id={styles.aboutBtn}
          href="/About"
          className={styles[`classic_nav_hoverBtn`]}
          style={themeOverride}
        >
          ABOUT {/* Combos Page Submenu */}
          <div className={styles.about_submenu_parent}>
            <div
              className={styles.arrowUp}
              style={{ top: "-0.5rem", left: "10.5rem" }}
            ></div>
            {/* Arrow Icon */} {/* This is a button section */}
            <p style={{ maxWidth: "27rem" }}>
              Combostart is a beginner-friendly community-driven combo <br />
              sharing platform
              <span style={{ fontWeight: "800" }}> tailored </span> specifically
              for fighting game players <br /> of all skill levels. <br />
              Whether you&apos;re a
              <span style={{ fontWeight: "800" }}> casual </span> player or a
              seasoned pro, Combostart provides a welcoming space where you can
              <span style={{ fontWeight: "800" }}>easily</span> learn, discover,
              and explore combos for a variety of popular fighting games.
            </p>
          </div>
        </span>
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
            <button
              className={styles[`${btnType}_nav_btn`]}
              style={{ marginLeft: "auto" }}
              onClick={toggleOverlay}
            >
              LOG IN | SIGN UP
            </button>
          </>
        )}
      </div>

      {showOverlay && (
        <Login
          toggleOverlay={toggleOverlay}
          handleVerificationSuccess={handleVerificationSuccess}
        />
      )}
      {/* Mobile Menu button */}
      <div className={styles.mobileMenu__container}>
        <button
          className={styles.menuContainer__menuBtn}
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? (
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
          <h6 className={styles.menuBtn__text}>
            {showMenu ? "CLOSE" : "MENU"}
          </h6>
        </button>
      </div>

      {showMenu && (
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
      )}
    </nav>
  );
};

export default Navbar;
