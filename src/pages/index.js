import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Navbar from "./Navbar";
import Search from "./Search";
import ComboCard from "./ComboCard";
import WelcomePage from "./WelcomePage";
import Footer from "./Footer";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const visited = Cookies.get("visited");
    if (!visited) {
      Cookies.set("visited", "true", { expires: 7 });
      setShowWelcome(true);
    }
  }, []);

  return (
    <>
      {!showWelcome ? (
        <WelcomePage />
      ) : (
        <>
          <Head>
            <title>Street Fighter Combos</title>
            <meta
              name="description"
              content="Combos for the videogame Street Fighter 6 by Capcom"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div className={styles.img_container}>
            <Image
              className={styles.bg_img}
              src="/bg4000.jpg"
              alt="Picture of the author"
              fill
              sizes="(max-width: 1920px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
              object-fit="cover"
            />
          </div>

          <main className={styles.main}>
            <Navbar />
            <Search />
            <section className={styles.combos_container}>
              {/*  <ComboCard
            videoUrl="Phdd6XJovgg"
            hasSuper={true}
            usesDriveRush={false}
            damage={5600}
            hits={16}
            comboType="CORNER"
            characterName="Ryu"
            patchVersion="1.0.0"
            inputType="Stick"
            inputTypeText="Arcade Stick"
            comboTitle="Ryu advanced 5600 damage corner combo"
            username="SFO Ghost"
            lastUpdated="December 20, 2022"
          />
          <ComboCard
            videoUrl="dMxh2lMzTWo"
            hasSuper={true}
            usesDriveRush={false}
            damage={3300}
            hits={12}
            comboType="ANYWHERE"
            characterName="Ken"
            patchVersion="1.0.0"
            inputType="Stick"
            inputTypeText="Arcade Stick"
            comboTitle="Fun Ken Combo, 12 hits"
            username="gentle step"
            lastUpdated="December 16, 2022"
          />{" "}
          <ComboCard
            videoUrl="O_FLTu5eGcg"
            hasSuper={true}
            usesDriveRush={false}
            damage={2800}
            hits={7}
            comboType="CORNER"
            characterName="Juri"
            patchVersion="1.0.0"
            inputType="Stick"
            inputTypeText="Arcade Stick"
            comboTitle="Feng shui engine Juri combo"
            username="VesperArcade"
            lastUpdated="October 10, 2022"
          />{" "}
          <ComboCard
            videoUrl="jhiSCTpFTmE"
            hasSuper={true}
            usesDriveRush={false}
            damage={3100}
            hits={13}
            comboType="MID"
            characterName="Chun-li"
            patchVersion="1.0.0"
            inputType="Stick"
            inputTypeText="Arcade Stick"
            comboTitle="Closed Beta Chun-li sakura combo"
            username="UFOrange  "
            lastUpdated="October 9, 2022"
  /> */}
            </section>
            <Footer />
          </main>
        </>
      )}
    </>
  );
}
