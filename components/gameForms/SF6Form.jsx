import React, { useState, useEffect } from "react";
import styles from "@/styles/Newpost.module.css";
import TagInput from "components/PostCreation/TagInput";
import { profanityCheck } from "logic/profanityFilter";
import PostTitle from "components/PostCreation/PostTitle";
import ComboStringSelectiveInput from "components/PostCreation/ComboStringInput/ComboStringSelectiveInput";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const SF6Form = ({
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
  uuidv4,
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
  hours,
  minutes,
  seconds,
  day,
  month,
  year,
  numericTimestamp,
  userDisplayName,
}) => {
  /* Form Inputs states */
  const [initialState, setInitialState] = useState("");

  useEffect(() => {
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

  const handleInitialState = (val) => {
    setInitialState(val);
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
    const comboSf6Info = {
      postId: { S: uuidv4() },
      User: { S: userDisplayName },
      InitialState: { S: initialState },
      Game: { S: game },
      ScreenPosition: { S: screenPosition.toUpperCase() },
      Character: { S: character },
      Damage: { N: damage.toString() },
      DmgPercent: { N: dmgPercentVal.toString() },
      Hits: { N: hits },
      HasSuper: {
        S: hasSuper,
      },
      MeterBars: { N: meterBars.toString() },
      PostTitle: { S: postTitle },
      ComboStrings: { S: JSON.stringify(comboStrings) },
      Tags: { S: tags.join(",").toUpperCase() },
      SubmissionTime: { S: time },
      SubmissionDate: { S: date },
      Timestamp: { N: numericTimestamp.toString() },
      VoteCount: { N: voteCount.toString() },
    };

    const params = {
      TableName: "combosSF6",
      Item: comboSf6Info,
    };

    try {
      // Insert the item into the DynamoDB table
      await client.send(new PutItemCommand(params));

      // Reset form fields after successful submission
      setInitialState("");
      setGame("");
      setScreenPosition("");
      setCharacter("");
      setComboStrings([]);
      setHasSuper("");
      setMeterBars("");
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

  return (
    <form className={styles[`${theme}form_container`]} onSubmit={handleSubmit}>
      <div className={styles.gameInfo_input_container}>
        <div className={styles[`${theme}gameInfo_input_wrapper`]}>
          <span className={styles[`${theme}gameInfo_input_title`]}>Game</span>

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
              value={meterBars}
              onChange={handleMeterBars}
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
          <span className={styles[`${theme}gameInfo_input_title`]}>Hits</span>
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
  );
};

export default SF6Form;
