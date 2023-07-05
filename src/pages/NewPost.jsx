import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import styles from "@/styles/Newpost.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Auth } from "aws-amplify";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
const { v4: uuidv4 } = require("uuid");

const NewPost = () => {
  const [userDisplayName, setUserDisplayName] = useState("");
  const [userSub, setUserSub] = useState(null);
  const { theme } = useContext(ThemeContext);
  /* Form Inputs states */
  const [damage, setDamage] = useState("6000");
  const [hits, setHits] = useState("12");
  const [game, setGame] = useState("Street Fighter 6");
  const [screenPosition, setScreenPosition] = useState("Corner");
  const [character, setCharacter] = useState("Luke");
  const [postTitle, setPostTitle] = useState("Luke does things");
  const [comboStrings, setComboStrings] = useState("QCF,QCF + H");
  const [stringType, setStringType] = useState("Text");
  const [hasSuper, setHasSuper] = useState("Yes");
  const [driveBars, setDriveBars] = useState(4);
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    const fetchUserAttributes = async () => {
      try {
        const yeah = await Auth.currentAuthenticatedUser();
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
        damage !== "" &&
        hits !== "" &&
        driveBars !== 0 &&
        hasSuper !== ""
    );
  }, [game, screenPosition, character, damage, hits, driveBars, hasSuper]);

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
    setHasSuper(event.target.value === "Yes");
  };
  const handleDriveBars = (event) => {
    setDriveBars(parseInt(event.target.value));
  };
  const handleComboStringsChange = (event) => {
    setComboStrings(event.target.value);
  };

  const handleStringTypeChange = (event) => {
    setStringType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const client = new DynamoDBClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

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
      id: { N: postId }, // Generate a UUID using the `uuid` library
      Game: { S: game },
      ScreenPosition: { S: screenPosition },
      Character: { S: character },
      Damage: { N: damage.toString() },
      Hits: { N: hits },
      HasSuper: { BOOL: hasSuper },
      DriveBars: { N: driveBars.toString() },
      PostTitle: { S: postTitle },
      ComboStrings: { S: comboStrings },
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
      event.target.reset();

      console.log("Item inserted successfully into DynamoDB");
    } catch (error) {
      console.error("Error inserting item into DynamoDB:", error);
    }

    // Reset form fields after submission
    setDamage("");
    setHits("");
    setGame("Street Fighter 6");
    setScreenPosition("");
    setCharacter("");
    setStringType("");
    setHasSuper(false);
    setDriveBars(0);
    setIsFormValid(false);
    event.target.reset();
  };

  return (
    <div className={styles[`${theme}post_parent`]}>
      <Navbar userDisplayName={userDisplayName} />
      <main className={styles.content_container}>
        <div className={styles.authorPost_info_container}>
          <h2>
            Posting as {userDisplayName}
            <span className={styles.authorPost_who_info}></span>
          </h2>
          <h3 className={styles.authorPost_draft_notice}>Draft saved</h3>
        </div>
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
                  <option value="Ryu">Ryu</option>
                  <option value="Zangief">Zangief</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.gameTitle_wrapper}>
            <span>Post title</span>
            <input
              className={styles[`${theme}gameTitle_input`]}
              type="text"
              placeholder="Ryu superless 11hits combo"
              value={postTitle}
              onChange={handlePostTitleChange}
              required
            />
          </div>

          <div className={styles[`${theme}stringsOptions_container`]}>
            <div className={styles.stringsOptions_stringType_wrapper}>
              <span>Combo input</span>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <select
                  value={stringType}
                  onChange={handleStringTypeChange}
                  className={styles[`${theme}stringsOptions_stringType`]}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Text">Text</option>
                  <option value="Selectable">Selectable</option>
                </select>
              </div>
            </div>

            <div className={styles.stringsOptions_comboStrings_wrapper}>
              <span>Combo strings</span>
              <input
                className={styles[`${theme}stringsOptions_comboStrings`]}
                type="text"
                placeholder="asdasdasdasdasdasd"
                value={comboStrings}
                onChange={handleComboStringsChange}
                required
              />
            </div>
          </div>

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
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
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
                className={styles[`${theme}gameInfo_input`]}
                placeholder="5600"
                type="text"
                id="damage"
                value={damage}
                onChange={handleDamageChange}
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
                className={styles[`${theme}gameInfo_input`]}
                placeholder="11"
                required
              />
            </div>
          </div>

          <div className={styles[`${theme}stringsOptions_container`]}>
            <div className={styles.stringsOptions_stringType_wrapper}>
              <span style={{ marginLeft: "auto" }}>
                Tags
                <span className={styles[`${theme}tagTextOptional`]}>
                  ( optional )
                </span>
              </span>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <input
                  className={styles[`${theme}stringsOptions_stringType`]}
                  type="text"
                  placeholder="Mixup"
                />
              </div>
            </div>
          </div>

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
