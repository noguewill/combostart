import React, { useContext, useState, useEffect } from "react";
import styles from "@/styles/NewCombo.module.css";
import { ThemeContext } from "../../components/ThemeContext";
import { Auth } from "aws-amplify";
import { awsmobile } from "../../logic/amplifyHandler";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { NotificationModal } from "components/NotificationModal";
import Footer from "../../components/Footer";
import withAuth from "components/withAuth";
import SF6Form from "components/gameForms/SF6Form";
import MKOneForm from "components/gameForms/MKOneForm";
import StickyButton from "components/StickyButton";

const NewCombo = () => {
  const router = useRouter();
  const [userDisplayName, setUserDisplayName] = useState("");
  const { theme } = useContext(ThemeContext);

  /* Form Inputs states */
  const [game, setGame] = useState("");
  const [screenPosition, setScreenPosition] = useState("");
  const [character, setCharacter] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [comboStrings, setComboStrings] = useState([]);
  const [hasSuper, setHasSuper] = useState("");
  const [meterBars, setMeterBars] = useState("");
  const [damage, setDamage] = useState("");
  const [hits, setHits] = useState("");
  const [tags, setTags] = useState([]);

  /* tool states */
  const [isFormValid, setIsFormValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [postNotification, setPostNotification] = useState("");
  const voteCount = 1;
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const numericTimestamp = currentDate.getTime(); // This gives you the timestamp in milliseconds since January 1, 1970 (UTC)

  useEffect(() => {
    awsmobile;
    const fetchUserAttributes = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        const userInfo = await Auth.currentUserInfo();
        setUserDisplayName(userInfo.attributes["custom:DisplayName"]);
      } catch (error) {
        // Handle error or redirect to the sign-in page
        console.error(error);
      }
    };

    fetchUserAttributes();
  }, []);

  /* Handling the inputs values of the form */
  const handleGameChange = (event) => {
    setGame(event.target.value);
  };

  const handleScreenPositionChange = (event) => {
    setScreenPosition(event.target.value);
  };

  const handleCharacterChange = (event) => {
    setCharacter(event.target.value);
  };

  const handlePostTitleChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handleHasSuper = (event) => {
    setHasSuper(event.target.value);
  };

  const handleMeterBars = (event) => {
    setMeterBars(parseInt(event.target.value));
  };

  const handleHitsChange = (event) => {
    let input = event.target.value;
    input = input.replace(/\D/g, ""); // Remove non-numeric characters
    input = input.slice(0, 2); // Limit input to 2 characters
    setHits(input);
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const defaultProps = {
    uuidv4,
    theme,
    router,
    game,
    setGame,
    screenPosition,
    setScreenPosition,
    character,
    setCharacter,
    postTitle,
    comboStrings,
    setComboStrings,
    hasSuper,
    setHasSuper,
    meterBars,
    setMeterBars,
    damage,
    setDamage,
    hits,
    setHits,
    tags,
    setTags,
    setPostNotification,
    handleGameChange,
    handleScreenPositionChange,
    handleCharacterChange,
    handlePostTitleChange,
    handleHasSuper,
    handleMeterBars,
    handleHitsChange,
    handleRemoveTag,
    isFormValid,
    setIsFormValid,
    formSubmitted,
    setFormSubmitted,
    voteCount,
    currentDate,
    hours,
    minutes,
    seconds,
    day,
    month,
    year,
    numericTimestamp,
    userDisplayName,
  };

  return (
    <div className={styles[`${theme}post_parent`]}>
      <Navbar userDisplayName={userDisplayName} />
      <main className={styles.content_container}>
        <NotificationModal notificationText={postNotification} />
        {game === "" ? (
          <section className={styles.selectGame_parent}>
            <div className={styles.selectGame_container}>
              <h3 className={styles[`${theme}selectGame_header`]}>
                Create a combo for:
              </h3>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <select
                  value={game}
                  onChange={handleGameChange}
                  className={styles[`${theme}stringsOptions_stringType`]}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Street Fighter 6">Street Fighter 6</option>
                  <option value="Mortal Kombat 1">Mortal Kombat 1</option>
                </select>
              </div>
            </div>
          </section>
        ) : game === "Street Fighter 6" ? (
          <SF6Form {...defaultProps} />
        ) : game === "Mortal Kombat 1" ? (
          <MKOneForm {...defaultProps} />
        ) : null}
      </main>
      <StickyButton />
      <Footer theme={theme} />
    </div>
  );
};

export default withAuth(NewCombo);
