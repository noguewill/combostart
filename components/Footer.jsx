import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/ClassicFooter.module.css";
import hubCardData from "../gamesData/hubCardData.json";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const renderedGames = hubCardData.map((game) => {
    if (game.attr !== "Upcoming") {
      return (
        <Link href={game.src} as={game.alias} key={game.id}>
          <span className={styles.submenu_btn}>
            {game.name.charAt(0).toUpperCase() +
              game.name.slice(1).toLowerCase()}
          </span>
        </Link>
      );
    }
    return null;
  });

  return (
    <footer className={styles[`${theme}footer_container`]}>
      <div className={styles.submenu_parent}>
        <div>
          <h4
            style={{
              fontSize: "1.5rem",
              fontFamily: "Kanit",
              fontStyle: "italic",
            }}
          >
            COMBOSTART
          </h4>
          <div style={{ display: "flex", alignItems: "center" }}>
            <svg
              style={{ marginRight: "0.5rem" }}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 16C6.90667 16 5.87333 15.7899 4.9 15.3696C3.92667 14.9493 3.07653 14.376 2.3496 13.6496C1.6232 12.9232 1.04987 12.0733 0.629601 11.1C0.209334 10.1267 -0.000532319 9.09333 1.01394e-06 8C1.01394e-06 6.89333 0.210134 5.85653 0.630401 4.8896C1.05067 3.92267 1.624 3.07627 2.3504 2.3504C3.0768 1.62347 3.9264 1.05013 4.8992 0.6304C5.872 0.210667 6.9056 0.000533333 8 0C9.10667 0 10.1435 0.210133 11.1104 0.6304C12.0773 1.05067 12.9237 1.624 13.6496 2.3504C14.3765 3.0768 14.9499 3.92347 15.3696 4.8904C15.7893 5.85733 15.9995 6.89387 16 8C16 9.09333 15.7899 10.1267 15.3696 11.1C14.9493 12.0733 14.376 12.9235 13.6496 13.6504C12.9232 14.3768 12.0765 14.9501 11.1096 15.3704C10.1427 15.7907 9.10613 16.0005 8 16ZM8 14.36C8.34667 13.88 8.64667 13.38 8.9 12.86C9.15333 12.34 9.36 11.7867 9.52 11.2H6.48C6.64 11.7867 6.84667 12.34 7.1 12.86C7.35333 13.38 7.65333 13.88 8 14.36ZM5.92 14.04C5.68 13.6 5.46987 13.1432 5.2896 12.6696C5.10933 12.196 4.95947 11.7061 4.84 11.2H2.48C2.86667 11.8667 3.35013 12.4467 3.9304 12.94C4.51067 13.4333 5.17387 13.8 5.92 14.04ZM10.08 14.04C10.8267 13.8 11.4901 13.4333 12.0704 12.94C12.6507 12.4467 13.1339 11.8667 13.52 11.2H11.16C11.04 11.7067 10.8901 12.1968 10.7104 12.6704C10.5307 13.144 10.3205 13.6005 10.08 14.04ZM1.8 9.6H4.52C4.48 9.33333 4.44987 9.06987 4.4296 8.8096C4.40933 8.54933 4.39947 8.27947 4.4 8C4.4 7.72 4.41013 7.45013 4.4304 7.1904C4.45067 6.93067 4.48053 6.6672 4.52 6.4H1.8C1.73333 6.66667 1.6832 6.93013 1.6496 7.1904C1.616 7.45067 1.59947 7.72053 1.6 8C1.6 8.28 1.6168 8.54987 1.6504 8.8096C1.684 9.06933 1.73387 9.3328 1.8 9.6ZM6.12 9.6H9.88C9.92 9.33333 9.95013 9.06987 9.9704 8.8096C9.99067 8.54933 10.0005 8.27947 10 8C10 7.72 9.98987 7.45013 9.9696 7.1904C9.94933 6.93067 9.91947 6.6672 9.88 6.4H6.12C6.08 6.66667 6.04987 6.93013 6.0296 7.1904C6.00933 7.45067 5.99947 7.72053 6 8C6 8.28 6.01013 8.54987 6.0304 8.8096C6.05067 9.06933 6.08053 9.3328 6.12 9.6ZM11.48 9.6H14.2C14.2667 9.33333 14.3168 9.06987 14.3504 8.8096C14.384 8.54933 14.4005 8.27947 14.4 8C14.4 7.72 14.3832 7.45013 14.3496 7.1904C14.316 6.93067 14.2661 6.6672 14.2 6.4H11.48C11.52 6.66667 11.5501 6.93013 11.5704 7.1904C11.5907 7.45067 11.6005 7.72053 11.6 8C11.6 8.28 11.5899 8.54987 11.5696 8.8096C11.5493 9.06933 11.5195 9.3328 11.48 9.6ZM11.16 4.8H13.52C13.1333 4.13333 12.6501 3.55333 12.0704 3.06C11.4907 2.56667 10.8272 2.2 10.08 1.96C10.32 2.4 10.5301 2.8568 10.7104 3.3304C10.8907 3.804 11.0405 4.29387 11.16 4.8ZM6.48 4.8H9.52C9.36 4.21333 9.15333 3.66 8.9 3.14C8.64667 2.62 8.34667 2.12 8 1.64C7.65333 2.12 7.35333 2.62 7.1 3.14C6.84667 3.66 6.64 4.21333 6.48 4.8ZM2.48 4.8H4.84C4.96 4.29333 5.11013 3.8032 5.2904 3.3296C5.47067 2.856 5.68053 2.39947 5.92 1.96C5.17333 2.2 4.50987 2.56667 3.9296 3.06C3.34933 3.55333 2.86613 4.13333 2.48 4.8Z"
                fill={theme === "light_theme_" ? "#292929" : "#ebebeb"}
              />
            </svg>
            <span>English(US)</span>
          </div>
        </div>
        <div className={styles.submenu_combosPage_container}>
          <h3 className={styles.submenu_header}>Combos Page</h3>
          {renderedGames}
        </div>

        {/* Upcoming submenu */}
        <div className={styles.submenu_upcoming_container}>
          <h3 className={styles.submenu_header}>Upcoming</h3>

          <Link
            target="_blank"
            href="https://www.youtube.com/watch?v=UZ6eFEjFfJ0"
          >
            <span className={styles.submenu_btn}>Mortal Kombat 1 (2023)</span>
          </Link>

          <Link
            target="_blank"
            href="https://www.youtube.com/watch?v=2hPuRQz6IlM"
          >
            <span className={styles.submenu_btn}>Tekken 8</span>
          </Link>
          <Link
            target="_blank"
            href="https://www.youtube.com/watch?v=Sc3GbTpkAmw"
          >
            <span className={styles.submenu_btn}>GranBlue Fantasy Rising</span>
          </Link>
          <h3 className={styles.submenu_header}>Support</h3>
          <Link href="/">
            <span className={styles.submenu_btn}>Feedback</span>
          </Link>
          <Link href="/Tos">
            <span className={styles.submenu_btn}>Terms of Service </span>
          </Link>
        </div>
      </div>
      <div className={styles.copyright_container}>
        <Image src="/logo.svg" alt="Combostart logo" width={50} height={50} />
        <span style={{ fontSize: "0.65rem" }}>
          ALL RIGHTS RESERVED COMBOSTART 2023
        </span>
      </div>
    </footer>
  );
};
export default Footer;
