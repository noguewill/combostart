import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/ClassicFooter.module.css";
import hubCardData from "../gamesData/hubCardData.json";

const ClassicFooter = () => {
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
    <footer className={styles.footer_container}>
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
            <Image
              src="/langIcon.svg"
              alt="Language selection icon"
              width={15}
              height={15}
              style={{ marginRight: "0.5rem" }}
            />
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
export default ClassicFooter;
