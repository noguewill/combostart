import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Navbar.module.css";
import AuthenticationBody from "./Authentication/AuthenticationBody";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { awsmobile } from "components/Authentication/amplifyHandler";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

const Navbar = ({ setGameName }) => {
  const router = useRouter();

  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState("");

  useEffect(() => {
    awsmobile;
    const checkAuth = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        // Session is active, the user is authenticated
        setCurrentUser(user);
        setUserDisplayName(user.attributes["custom:DisplayName"]);
      } catch (error) {
        // No active session, redirect to the sign-in page
        console.log(error);
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

  const handleGameName = (newGameName) => {
    // Call setGameName with the desired value
    setGameName(newGameName);
  };

  const handleAuthenticationSuccess = () => {
    setLoggedIn(true);
  };

  const navigateToNewPost = () => {
    router.push("/NewPost", { userDisplayName });
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      // User has been successfully signed out
      router.push("/ComboHub"); // Redirect to "/"
      window.location.reload(); // Refresh the page
      // Perform any additional actions or navigate to a different page if needed
    } catch (error) {
      // An error occurred during the sign-out process
      console.log("Error signing out:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo__container}>
        <Link href="/" className={styles.navbar_logo}>
          <Image src="/logo.svg" width={50} height={50} alt="ComboStart Logo" />
        </Link>
      </div>

      <div className={styles.navbar_btn__container}>
        {/* Add toggle button */}

        <Link href="/ComboHub" className={styles[`${theme}nav_btn`]}>
          COMBO HUB
        </Link>
        <span
          id={styles.combosPageBtn}
          href="/ComboGuides"
          className={styles[`${theme}nav_hoverBtn`]}
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

                <Link href="/" className={styles.submenu_link}>
                  <span className={styles.combosPage_submenu_btn_disabled}>
                    Tekken 7 (<span style={{ color: "#fcd12a" }}>WIP</span>)
                  </span>
                </Link>

                <Link href="/" className={styles.submenu_link}>
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
                <Link href="/" className={styles.submenu_link}>
                  <span className={styles.combosPage_submenu_btn_disabled}>
                    Guilty Gear Strive (
                    <span style={{ color: "#fcd12a" }}>WIP</span>)
                  </span>
                </Link>

                <Link href="/" className={styles.submenu_link}>
                  <span className={styles.combosPage_submenu_btn_disabled}>
                    The King of Fighters XV (
                    <span style={{ color: "#fcd12a" }}>WIP</span>)
                  </span>
                </Link>
                <Link href="/" className={styles.submenu_link}>
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
          className={styles[`${theme}nav_hoverBtn`]}
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
        <div className={styles.authNavContainer}>
          <ThemeToggleBtn theme={theme} toggleTheme={toggleTheme} />
          {currentUser !== null ? (
            <>
              <button
                onClick={navigateToNewPost}
                className={styles[`${theme}nav_btn`]}
              >
                New Post
              </button>
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
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
            <>
              <button
                className={styles[`${theme}nav_btn`]}
                onClick={toggleOverlay}
              >
                LOG IN | SIGN UP
              </button>
            </>
          )}
        </div>
      </div>

      {showOverlay && (
        <AuthenticationBody
          toggleOverlay={toggleOverlay}
          onAuthenticationSuccess={handleAuthenticationSuccess}
        />
      )}
    </nav>
  );
};

export default Navbar;
