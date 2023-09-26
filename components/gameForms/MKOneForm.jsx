import React, { useState, useEffect } from "react";
import styles from "@/styles/NewCombo.module.css";
import TagInput from "components/PostCreation/TagInput";
import { profanityCheck } from "logic/profanityFilter";
import PostTitle from "components/PostCreation/PostTitle";
import ComboStringSelectiveInputMK from "components/PostCreation/ComboStringInput/ComboStringSelectiveInputMK";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const MKOneForm = ({
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
  damage,
  setDamage,
  meterBars,
  setMeterBars,
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
  const [kameo, setKameo] = useState("");
  const [initialState, setInitialState] = useState("NONE");
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

  const handleDamageChange = (event) => {
    let input = event.target.value;
    input = input.replace(/\D/g, ""); // Remove non-numeric characters
    input = input.slice(0, 4); // Limit input to 5 characters
    const newDamage = input === "" ? null : parseInt(input);

    if (newDamage !== null && newDamage > 1000) {
      setDamage("1000");
    } else {
      setDamage(newDamage);
    }
  };
  const handleKameoChange = (e) => {
    setKameo(e.target.value);
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
      console.error("Form is not valid. Please fill in all required fields.");
      return;
    }

    if (profanityCheck(postTitle)) {
      // Handle the case where profanity is detected, e.g., show an error message
      setPostNotification(
        "Input contains profanity. Please revise your inputs."
      );
      console.error("Oops, post contains profanity");
      return; // Exit the function and prevent form submission
    }
    const dmgPercentVal = Math.ceil((damage / 1000) * 100);

    // Prepare the item to be inserted into the DynamoDB table
    const comboMKOneInfo = {
      postId: { S: uuidv4() },
      User: { S: userDisplayName },
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
      Kameo: { S: kameo },
      PostTitle: { S: postTitle },
      ComboStrings: { S: JSON.stringify(comboStrings) },
      Tags: { S: tags.join(",").toUpperCase() },
      SubmissionTime: { S: time },
      SubmissionDate: { S: date },
      Timestamp: { N: numericTimestamp.toString() },
      VoteCount: { N: voteCount.toString() },
    };

    const params = {
      TableName: "combosMKOne",
      Item: comboMKOneInfo,
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
      setMeterBars(""), setKameo("");
      setDamage("");
      setHits("");
      setIsFormValid(false);
      setTags([]);

      setFormSubmitted(true);

      setPostNotification(
        <span>
          Combo posted<span style={{ color: "#93f367" }}> successfully </span>
          Redirecting...
        </span>
      );

      // Delay the navigation by a few milliseconds
      setTimeout(() => {
        router.push("/combos/mortalkombat1");
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
              <option value="Air">Air</option>
              <option value="Mid-screen">Mid-screen</option>
              <option value="Corner">Corner</option>
            </select>
          </div>
        </div>

        <div className={styles[`${theme}gameInfo_input_wrapper`]}>
          <span className={styles[`${theme}gameInfo_input_title`]}>
            Kombatant
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
              <option value="Ashrah">Ashrah</option>
              <option value="Baraka">Baraka</option>
              <option value="Geras">Geras</option>
              <option value="General Shao">General Shao</option>
              <option value="Havik">Havik</option>
              <option value="Johnny Cage">Johnny Cage</option>
              <option value="Kenshi">Kenshi</option>
              <option value="Kitana">Kitana</option>
              <option value="Kung Lao">Kung Lao</option>
              <option value="Li Mei">Li Mei</option>
              <option value="Liu Kang">Liu Kang</option>
              <option value="Mileena">Mileena</option>
              <option value="Nitara">Nitara</option>
              <option value="Reiko">Reiko</option>
              <option value="Reptile">Reptile</option>
              <option value="Raiden">Raiden</option>
              <option value="Scorpion">Scorpion</option>
              <option value="Shang Tsung">Shang Tsung</option>
              <option value="Sindel">Sindel</option>
              <option value="Smoke">Smoke</option>
              <option value="Sub-Zero">Sub-Zero</option>
              <option value="Tanya">Tanya</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
        </div>
        <div className={styles[`${theme}gameInfo_input_wrapper`]}>
          <span className={styles[`${theme}gameInfo_input_title`]}>Kameo</span>
          <div className={styles[`${theme}selectDropdownContainer`]}>
            <select
              value={kameo}
              onChange={handleKameoChange}
              className={styles[`${theme}stringsOptions_stringType`]}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Jax Briggs">Jax Briggs</option>
              <option value="Kano">Kano</option>
              <option value="Darrius">Darrius</option>
              <option value="Sonya Blade">Sonya Blade</option>
              <option value="Sub-Zero">Sub-Zero</option>
              <option value="Goro">Goro</option>
              <option value="Stryker">Stryker</option>
              <option value="Kung Lao">Kung Lao</option>
              <option value="Cyrax">Cyrax</option>
              <option value="Sektor">Sektor</option>
              <option value="Frost">Frost</option>
              <option value="Sareena">Sareena</option>
              <option value="Motaro">Motaro</option>
              <option value="Shujinko">Shujinko</option>
              <option value="Scorpion">Scorpion</option>
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
          <span>Fatal Blow?</span>
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
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>
        </div>

        <div className={styles.stringsOptions_stringType_wrapper}>
          <span>Meter bars</span>
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
      <ComboStringSelectiveInputMK
        theme={theme}
        comboStrings={comboStrings}
        setComboStrings={setComboStrings}
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

export default MKOneForm;
