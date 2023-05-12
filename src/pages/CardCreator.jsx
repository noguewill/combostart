import React, { useState } from "react";

const CardCreator = () => {
  const [formData, setFormData] = useState({
    cardTitle: "",
    charName: "",
    comboType: "",
    comboDamage: "",
    comboHits: "",
    driveRushBars: "",
    notationType: "",
    patchVer: "",
    punishCounter: false,
    super: false,
    videoUrl: "",
    author: "",
    date: "",
    inputs: [],
    tags: [{ text: "", src: "/", desc: "" }],
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputArrayChange = (event, index) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      const inputs = [...prevState.inputs];
      inputs[index][name] = value;
      return {
        ...prevState,
        inputs,
      };
    });
  };

  const handleAddInput = () => {
    setFormData((prevState) => ({
      ...prevState,
      inputs: [
        ...prevState.inputs,
        { imageSrc: "", altText: "", figCaption: "" },
      ],
    }));
  };

  const handleRemoveInput = (index) => {
    setFormData((prevState) => {
      const inputs = [...prevState.inputs];
      inputs.splice(index, 1);
      return {
        ...prevState,
        inputs,
      };
    });
  };
  const handleTagsChange = (event, index) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      const tags = [...prevState.tags];
      tags[index][name] = value;
      return {
        ...prevState,
        tags,
      };
    });
  };

  const handleAddTag = () => {
    setFormData((prevState) => ({
      ...prevState,
      tags: [...prevState.tags, { text: "", src: "/", desc: "" }],
    }));
  };

  const handleRemoveTag = (index) => {
    setFormData((prevState) => {
      const tags = [...prevState.tags];
      tags.splice(index, 1);
      return {
        ...prevState,
        tags,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { cardTitle } = formData;

    const newCard = {
      ...formData,
      cardTitle: cardTitle,
    };

    console.log(newCard);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ color: "white" }}>
        <div>
          <label htmlFor="cardTitle">Post title:</label>
          <input
            type="text"
            id="cardTitle"
            name="cardTitle"
            value={formData.cardTitle}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="charName">Character name:</label>
          <input
            type="text"
            id="charName"
            name="charName"
            value={formData.charName}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="comboType">Combo type:</label>
          <input
            type="text"
            id="comboType"
            name="comboType"
            value={formData.comboType}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="comboDamage">Combo damage:</label>
          <input
            type="number"
            id="comboDamage"
            name="comboDamage"
            value={formData.comboDamage}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="comboHits">Combo hits:</label>
          <input
            type="number"
            id="comboHits"
            name="comboHits"
            value={formData.comboHits}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="driveRushBars">Drive rush bars:</label>
          <input
            type="number"
            id="driveRushBars"
            name="driveRushBars"
            value={formData.driveRushBars}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="notationType">Notation type:</label>
          <input
            type="text"
            id="notationType"
            name="notationType"
            value={formData.notationType}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="patchVer">Patch version:</label>
          <input
            type="text"
            id="patchVer"
            name="patchVer"
            value={formData.patchVer}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="punishCounter">Punish counter:</label>
          <input
            type="checkbox"
            id="punishCounter"
            name="punishCounter"
            checked={formData.punishCounter}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="super">Super:</label>
          <input
            type="checkbox"
            id="super"
            name="super"
            checked={formData.super}
            onChange={handleInputChange}
          />
        </div>

        <label>
          Video URL:
          <input
            type="text"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>

        {formData.inputs.map((input, index) => (
          <div key={index}>
            <h3>Input {index + 1}</h3>
            <label>
              Image Src:
              <input
                type="text"
                name="imageSrc"
                value={input.imageSrc}
                onChange={(event) => handleInputArrayChange(event, index)}
              />
            </label>
            <br />
            <label>
              Alt Text:
              <input
                type="text"
                name="altText"
                value={input.altText}
                onChange={(event) => handleInputArrayChange(event, index)}
              />
            </label>
            <br />
            <label>
              Fig Caption:
              <input
                type="text"
                name="figCaption"
                value={input.figCaption}
                onChange={(event) => handleInputArrayChange(event, index)}
              />
            </label>
            <br />
            <button type="button" onClick={() => handleRemoveInput(index)}>
              Remove Input
            </button>
            <hr />
          </div>
        ))}
        <br />

        <button type="button" onClick={handleAddInput}>
          Add Input
        </button>
        <br />
        <br />
        {formData.tags.map((tag, index) => (
          <div key={index}>
            <h3>Tag {index + 1}</h3>
            <label>
              Tag Title:
              <input
                type="text"
                name={`tags[${index}].text`}
                value={tag.text}
                onChange={(event) => handleTagsChange(event, index)}
              />
            </label>
            <br />
            <label>
              Tag src:
              <input
                type="color"
                name={`tags[${index}].src`}
                value={tag.src}
                onChange={(event) => handleTagsChange(event, index)}
              />
            </label>
            <br />
            <label>
              Tag Description:
              <input
                type="text"
                name={`tags[${index}].desc`}
                value={tag.tagDescription}
                onChange={(event) => handleTagsChange(event, index)}
              />
            </label>
            <button type="button" onClick={() => handleRemoveTag(index)}>
              Remove Tag
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddTag}>
          Add Tag
        </button>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CardCreator;
