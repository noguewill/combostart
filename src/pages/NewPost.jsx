import React, { useContext, useState, useEffect } from "react";
import styles from "@/styles/Newpost.module.css";
import { ThemeContext } from "../../components/ThemeContext";
import Navbar from "../../components/Navbar";
import TagInput from "../../components/PostCreation/TagInput";
import Footer from "../../components/Footer";
import { profanityCheck } from "../../components/ProfanityFilter";
import PostTitle from "../../components/PostCreation/PostTitle";
import ComboStringSelectiveInput from "../../components/PostCreation/ComboStringInput/ComboStringSelectiveInput";
import { Auth } from "aws-amplify";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const NewPost = () => {
  const [userDisplayName, setUserDisplayName] = useState("");
  const [userSub, setUserSub] = useState(null);
  const { theme } = useContext(ThemeContext);
  /* Form Inputs states */
  const [damage, setDamage] = useState("");
  const [hits, setHits] = useState("");
  const [game, setGame] = useState("Street Fighter 6");
  const [screenPosition, setScreenPosition] = useState("");
  const [character, setCharacter] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [comboStrings, setComboStrings] = useState([]);
  const [hasSuper, setHasSuper] = useState(false);
  const [driveBars, setDriveBars] = useState(4);
  const [tags, setTags] = useState([]);
  const [isFormValid, setIsFormValid] = useState(true);
  const [postNotification, setPostNotification] = useState("");

  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  useEffect(() => {
    const fetchUserAttributes = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        const userInfo = await Auth.currentUserInfo();
        setUserDisplayName(userInfo.attributes["custom:DisplayName"]);
        setUserSub(userInfo.attributes["sub"]);
      } catch (error) {
        // Handle error or redirect to the sign-in page
        console.log(error);
      }
    };

    fetchUserAttributes();

    setIsFormValid(
      game !== "" &&
        screenPosition !== "" &&
        character !== "" &&
        postTitle !== "" &&
        comboStrings !== "" &&
        hasSuper !== "" &&
        damage !== "" &&
        hits !== ""
    );
  }, [
    game,
    screenPosition,
    character,
    postTitle,
    comboStrings,
    hasSuper,
    damage,
    hits,
  ]);

  /* Handling the inputs values of the form */
  const handleDamageChange = (event) => {
    let input = event.target.value;
    input = input.replace(/\D/g, ""); // Remove non-numeric characters
    input = input.slice(0, 5); // Limit input to 5 characters
    const newDamage = input === "" ? null : parseInt(input);

    if (newDamage !== null && newDamage > 10000) {
      setDamage("10000");
    } else {
      setDamage(newDamage);
    }
  };
  const handleHitsChange = (event) => {
    let input = event.target.value;
    input = input.replace(/\D/g, ""); // Remove non-numeric characters
    input = input.slice(0, 2); // Limit input to 2 characters
    setHits(input);
  };
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
  const handleDriveBars = (event) => {
    setDriveBars(parseInt(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const time = `${hours}:${minutes}:${seconds}`;
    const date = `${day}/${month}/${year}`;

    const client = new DynamoDBClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    if (profanityCheck(postTitle)) {
      setPostNotification(
        "Input contains profanity. Please revise your inputs."
      );
      console.log("oops", postNotification);
      return; // Exit the function and prevent form submission
    }

    function generateUniqueId(sub) {
      // Extract numbers from userSub
      const userNumbers = sub.replace(/\D/g, "");

      // Get current timestamp and date
      const timestamp = Date.now();

      // Concatenate userNumbers, timestamp, and date
      const uniqueId = `${userNumbers}${timestamp}`;

      return uniqueId;
    }

    // Usage example

    const postId = generateUniqueId(userSub);

    // Prepare the item to be inserted into the DynamoDB table
    const comboInfo = {
      id: { N: postId },
      User: { S: userDisplayName },
      Game: { S: game },
      ScreenPosition: { S: screenPosition },
      Character: { S: character },
      Damage: { N: damage.toString() },
      Hits: { N: hits },
      HasSuper: { BOOL: hasSuper },
      DriveBars: { N: driveBars.toString() },
      PostTitle: { S: postTitle },
      ComboStrings: { S: comboStrings },
      Tags: { S: tags.join(",") },
      SubmissionTime: { S: time },
      SubmissionDate: { S: date },
    };

    const params = {
      TableName: "CombosSF6",
      Item: comboInfo,
    };

    try {
      // Insert the item into the DynamoDB table
      await client.send(new PutItemCommand(params));

      // Reset form fields after successful submission
      setDamage("");
      setHits("");
      setGame("Street Fighter 6");
      setScreenPosition("");
      setCharacter("");
      setStringType("");
      setHasSuper("");
      setDriveBars(0);
      setIsFormValid(false);
      setTags([]);
      event.target.reset();

      console.log("Item inserted successfully into DynamoDB");
    } catch (error) {
      console.error("Error inserting item into DynamoDB:", error);
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className={styles[`${theme}post_parent`]}>
      <Navbar userDisplayName={userDisplayName} />
      <main className={styles.content_container}>
        <form
          className={styles[`${theme}form_container`]}
          onSubmit={handleSubmit}
        >
          <div className={styles.gameInfo_input_container}>
            <div className={styles[`${theme}gameInfo_input_wrapper`]}>
              <span className={styles[`${theme}gameInfo_input_title`]}>
                Game
              </span>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <input
                  style={{ width: "6rem", color: "gray" }}
                  value={game}
                  onChange={handleGameChange}
                  className={styles[`${theme}stringsOptions_stringType`]}
                  disabled
                />
              </div>
            </div>

            <div className={styles[`${theme}gameInfo_input_wrapper`]}>
              <span className={styles[`${theme}gameInfo_input_title`]}>
                Screen position
              </span>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <select
                  value={screenPosition}
                  onChange={handleScreenPositionChange}
                  className={styles[`${theme}stringsOptions_stringType`]}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Anywhere">Anywhere</option>
                  <option value="Mid-screen">Mid-screen</option>
                  <option value="Corner">Corner</option>
                </select>
              </div>
            </div>

            <div className={styles[`${theme}gameInfo_input_wrapper`]}>
              <span className={styles[`${theme}gameInfo_input_title`]}>
                Character
              </span>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <select
                  value={character}
                  onChange={handleCharacterChange}
                  className={styles[`${theme}stringsOptions_stringType`]}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Blanka">Blanka</option>
                  <option value="Cammy">Cammy</option>
                  <option value="Chun-Li">Chun Li</option>
                  <option value="Dee Jay">Dee Jay</option>
                  <option value="Dhalsim">Dhalsim</option>
                  <option value="E-Honda">E-Honda</option>
                  <option value="Guile">Guile</option>
                  <option value="Jamie">Jamie</option>
                  <option value="JP">JP</option>
                  <option value="Juri">Juri</option>
                  <option value="Ken">Ken</option>
                  <option value="Kimberly">Kimberly</option>
                  <option value="Lily">Lily</option>
                  <option value="Luke">Luke</option>
                  <option value="Manon">Manon</option>
                  <option value="Marisa">Marisa</option>
                  <option value="Rashid">Rashid</option>
                  <option value="Ryu">Ryu</option>
                  <option value="Zangief">Zangief</option>
                </select>
              </div>
            </div>
          </div>

          <PostTitle
            theme={theme}
            postTitle={postTitle}
            handlePostTitleChange={handlePostTitleChange}
          />

          <div className={styles.comboInfo_input_container}>
            <div className={styles.stringsOptions_stringType_wrapper}>
              <span>Combo has super?</span>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <select
                  value={hasSuper}
                  onChange={handleHasSuper}
                  className={styles[`${theme}stringsOptions_stringType`]}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div>

            <div className={styles.stringsOptions_stringType_wrapper}>
              <span>Drive Rush bars</span>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <select
                  value={driveBars}
                  onChange={handleDriveBars}
                  className={styles[`${theme}stringsOptions_stringType`]}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>

            <div className={styles[`${theme}gameInfo_input_wrapper`]}>
              <label className={styles[`${theme}gameInfo_input_title`]}>
                Damage
              </label>
              <input
                className={styles[`${theme}dmgInfo_input`]}
                placeholder="5600"
                type="text"
                id="damage"
                value={damage}
                onChange={handleDamageChange}
                autoComplete="off"
                required
              />
            </div>

            <div className={styles[`${theme}gameInfo_input_wrapper`]}>
              <span className={styles[`${theme}gameInfo_input_title`]}>
                Hits
              </span>
              <input
                value={hits}
                onChange={handleHitsChange}
                className={styles[`${theme}hitsInfo_input`]}
                placeholder="11"
                autoComplete="off"
                required
              />
            </div>
          </div>
          <ComboStringSelectiveInput theme={theme} />
          <TagInput
            theme={theme}
            tags={tags}
            setTags={setTags}
            removeTag={handleRemoveTag}
          />

          <button className={styles.submitPost_btn} disabled={!isFormValid}>
            SUBMIT POST
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default NewPost;
