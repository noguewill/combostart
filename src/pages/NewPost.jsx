import React, { useContext, useState, useEffect } from "react";
import styles from "@/styles/Newpost.module.css";
import { ThemeContext } from "../../components/ThemeContext";
import Navbar from "../../components/Navbar";
import TagInput from "../../components/PostCreation/TagInput";
import { NotificationModal } from "components/NotificationModal";
import Footer from "../../components/Footer";
import { profanityCheck } from "../../components/ProfanityFilter";
import PostTitle from "../../components/PostCreation/PostTitle";
import ComboStringSelectiveInput from "../../components/PostCreation/ComboStringInput/ComboStringSelectiveInput";
import { Auth } from "aws-amplify";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { awsmobile } from "../../components/Authentication/amplifyHandler";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

const NewPost = () => {
  const router = useRouter();
  const [userDisplayName, setUserDisplayName] = useState("");
  const [userSub, setUserSub] = useState(null);
  const { theme } = useContext(ThemeContext);

  /* Form Inputs states */
  const [game, setGame] = useState("Street Fighter 6");
  const [screenPosition, setScreenPosition] = useState("Mid-screen");
  const [character, setCharacter] = useState("Ryu");
  const [postTitle, setPostTitle] = useState("Ryu testing");
  const [comboStrings, setComboStrings] = useState([
    [
      {
        type: "image",
        value: "D",
        alt: "DOWN",
      },
      {
        type: "image",
        value: "DB",
        alt: "DOWN BACK",
      },
      {
        type: "image",
        value: "B",
        alt: "BACK",
      },
      {
        type: "text",
        value: "+",
      },
      {
        type: "image",
        value: "P",
        alt: "Any punch",
      },
    ],
    [
      {
        type: "image",
        value: "D",
        alt: "DOWN",
      },
      {
        type: "text",
        value: "+",
      },
      {
        type: "image",
        value: "MP",
        alt: "Medium Punch",
      },
    ],
    [
      {
        type: "image",
        value: "DR",
        alt: "Drive Rush",
      },
      {
        type: "text",
        value: "+",
      },
      {
        type: "image",
        value: "P",
        alt: "Any punch",
      },
    ],
    [
      {
        type: "image",
        value: "QCF",
        alt: "QUARTER-CIRCLE-FORWARD",
      },
      {
        type: "image",
        value: "QCF",
        alt: "QUARTER-CIRCLE-FORWARD",
      },
      {
        type: "text",
        value: "+",
      },
      {
        type: "image",
        value: "K",
        alt: "Any kick",
      },
    ],
  ]);
  const [hasSuper, setHasSuper] = useState("NONE");
  const [driveBars, setDriveBars] = useState("4");
  const [damage, setDamage] = useState("8000");
  const [hits, setHits] = useState("14");
  const [tags, setTags] = useState([]);
  const [initialState, setInitialState] = useState("CH");
  const voteCount = 1;

  const [isFormValid, setIsFormValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [postNotification, setPostNotification] = useState("");

  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  useEffect(() => {
    awsmobile;
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
        comboStrings.length >= 3 &&
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
  const handleInitialState = (val) => {
    setInitialState(val);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const time = `${hours}:${minutes}:${seconds}`;
    const date = `${month}/${day}/${year}`;

    const client = new DynamoDBClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    if (!isFormValid) {
      // Handle the case where the form is not valid, e.g., show an error message
      setPostNotification(
        "Form is not valid. Please fill in all required fields."
      );
      console.log("Form is not valid. Please fill in all required fields.");
      return;
    }

    if (profanityCheck(postTitle)) {
      // Handle the case where profanity is detected, e.g., show an error message
      setPostNotification(
        "Input contains profanity. Please revise your inputs."
      );
      console.log("Oops, post contains profanity");
      return; // Exit the function and prevent form submission
    }

    const dmgPercentVal = Math.ceil((damage / 10000) * 100);

    // Prepare the item to be inserted into the DynamoDB table
    const comboInfo = {
      postId: { S: uuidv4() },
      User: { S: userDisplayName },
      InitialState: { S: initialState },
      Game: { S: game },
      ScreenPosition: { S: screenPosition.toUpperCase() },
      Character: { S: character },
      Damage: { N: damage.toString() },
      DmgPercent: { N: dmgPercentVal.toString() },
      Hits: { N: hits },
      HasSuper: { S: hasSuper },
      DriveBars: { N: driveBars.toString() },
      PostTitle: { S: postTitle },
      ComboStrings: { S: JSON.stringify(comboStrings) },
      Tags: { S: tags.join(",").toUpperCase() },
      SubmissionTime: { S: time },
      SubmissionDate: { S: date },
      VoteCount: { N: voteCount.toString() },
    };

    const params = {
      TableName: "combosSF6",
      Item: comboInfo,
    };

    try {
      // Insert the item into the DynamoDB table
      await client.send(new PutItemCommand(params));

      // Reset form fields after successful submission
      setInitialState("");
      setGame("Street Fighter 6");
      setScreenPosition("");
      setCharacter("");
      setComboStrings([]);
      setHasSuper("");
      setDriveBars("");
      setDamage("");
      setHits("");
      setIsFormValid(false);
      setTags([]);

      setFormSubmitted(true);
      console.log("Combo post inserted successfully into DynamoDB");
      setPostNotification(
        <span>
          Combo posted<span style={{ color: "#93f367" }}> successfully </span>
          Redirecting...
        </span>
      );
      // Debug message to confirm this part is reached
      console.log("Before navigating to /Combos");
      // Delay the navigation by a few milliseconds
      setTimeout(() => {
        console.log("Before navigating to /Combos");
        router.push("/Combos");
      }, 1000);
    } catch (error) {
      console.error("Error inserting combo post into DynamoDB:", error);
      setPostNotification("Error submitting post, try again later");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };
  return (
    <div className={styles[`${theme}post_parent`]}>
      <Navbar userDisplayName={userDisplayName} />
      <main className={styles.content_container}>
        <NotificationModal notificationText={postNotification} />
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
                  <option value="Aki">Aki</option>
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
              <span>Super?</span>
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
                  <option value="NONE">NONE</option>
                  <option value="Level 1">Level 1</option>
                  <option value="Level 2">Level 2</option>
                  <option value="Level 3">Level 3</option>
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
          <ComboStringSelectiveInput
            theme={theme}
            comboStrings={comboStrings}
            setComboStrings={setComboStrings}
            handleInitialState={handleInitialState}
            initialState={initialState}
            setInitialState={setInitialState}
          />
          <TagInput
            theme={theme}
            tags={tags}
            setTags={setTags}
            removeTag={handleRemoveTag}
          />

          <button
            type="submit"
            className={styles.submitPost_btn}
            disabled={!isFormValid || formSubmitted}
          >
            {formSubmitted ? "SUBMITTING..." : "SUBMIT COMBO"}
          </button>
        </form>
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default NewPost;
