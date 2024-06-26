import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Navbar.module.css";
import AuthenticationBody from "./auth/AuthenticationBody";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { useRouter } from "next/router";
import { defCurrentUser } from "../logic/dataFetch";
import { handleSignOut } from "../logic/authUtils/authHandler";

const Navbar = () => {
  const router = useRouter();
  const currentRoute = router.asPath;
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [showOverlay, setShowOverlay] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isComboOpen, setIsComboOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [userDisplayName, setUserDisplayName] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await defCurrentUser();
        setCurrentUser(user);
        setUserDisplayName(user["custom:DisplayName"]);
      } catch (error) {
        return;
      }
    };

    checkAuth();
  }, []);

  const toggleOverlay = () => {
    setShowOverlay((prevShowOverlay) => !prevShowOverlay);
  };

  const handleDropdownClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleComboOpener = (chosenGame) => {
    setIsComboOpen(!isComboOpen);

    if (typeof window !== "undefined") {
      // Check if we are on the client-side
      router.push(`/combos/${chosenGame}`);
    }
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_btn__container}>
        {/* Add toggle button */}
        <Link
          href="/"
          className={
            currentRoute === "/"
              ? styles[`${theme}nav_btn_focus`]
              : styles[`${theme}nav_btn`]
          }
        >
          HOME
        </Link>
        <button
          type="button"
          className={styles[`${theme}nav_btn`]}
          onClick={() => setIsComboOpen(!isComboOpen)}
        >
          COMBOS
        </button>
        {isComboOpen && (
          <div className={styles[`${theme}comboDropdownMenu`]}>
            <div
              className={styles.submenu_container}
              style={{ alignItems: "flex-start", fontSize: "0.2rem" }}
            >
              <button
                type="button"
                className={
                  currentRoute === "/combos/streetfighter6"
                    ? styles[`${theme}nav_comboBtn_focus`]
                    : styles[`${theme}nav_comboBtn`]
                }
                onClick={() => handleComboOpener("streetfighter6")}
              >
                STREET FIGHTER 6
              </button>
              <button
                type="button"
                className={
                  currentRoute === "/combos/mortalkombat1"
                    ? styles[`${theme}nav_comboBtn_focus`]
                    : styles[`${theme}nav_comboBtn`]
                }
                onClick={() => handleComboOpener("mortalkombat1")}
              >
                MORTAL KOMBAT 1
              </button>
            </div>
          </div>
        )}
        <span id={styles.aboutBtn} className={styles[`${theme}nav_hoverBtn`]}>
          ABOUT {/* Combos Page Submenu */}
          <div className={styles.about_submenu_parent}>
            <div className={styles.arrowUp}></div>
            {/* Arrow Icon */} {/* This is a button section */}
            <p style={{ maxWidth: "27rem" }}>
              Combostart is a beginner-friendly community driven combo <br />
              <span style={{ fontWeight: "800" }}> sharing </span> platform,
              tailored for players of all skill levels.
              <br /> Whether you&apos;re a casual or a seasoned pro, you can
              <span style={{ fontWeight: "800" }}> easily</span> learn and
              discover combos for a variety of fighting games.
            </p>
          </div>
        </span>
      </div>

      <Link href="/" className={styles.navbar_logo}>
        <Image
          src="/icons/logo.svg"
          width={50}
          height={50}
          alt="ComboStart Logo"
        />
      </Link>

      {/* Only show if the user is logged in */}
      <div className={styles.authNavContainer}>
        <ThemeToggleBtn theme={theme} toggleTheme={toggleTheme} />
        {currentUser ? (
          <>
            <Link
              href="/NewCombo"
              className={
                currentRoute === "/NewCombo"
                  ? styles[`${theme}nav_btn_focus`]
                  : styles[`${theme}nav_btn`]
              }
            >
              NEW COMBO
            </Link>
            <div className={styles.profileBtn_container}>
              <span className={styles.profileBtn_username}>
                {userDisplayName}
              </span>
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
                  stroke="#fc3434"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {isOpen && (
                <div className={styles[`${theme}dropdownMenu`]}>
                  <div
                    className={styles.submenu_container}
                    style={{ alignItems: "flex-start", fontSize: "0.2rem" }}
                  >
                    <Link href="/Settings">
                      <button className={styles.submenu_item_btn}>
                        SETTINGS
                      </button>
                    </Link>
                    <Link href="/Tos">
                      <button className={styles.submenu_item_btn}>
                        TERMS OF SERVICE
                      </button>
                    </Link>
                    <Link href="/PrivacyPolicy">
                      <button className={styles.submenu_item_btn}>
                        Privacy Policy
                      </button>
                    </Link>
                    <button
                      className={styles.dropdown_logout_btn}
                      onClick={handleSignOut}
                    >
                      LOG OUT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <button className={styles[`${theme}nav_btn`]} onClick={toggleOverlay}>
            LOG IN | SIGN UP
          </button>
        )}
      </div>

      {showOverlay && <AuthenticationBody toggleOverlay={toggleOverlay} />}
    </nav>
  );
};

export default Navbar;
