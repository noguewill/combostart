import React, { useState, useContext, useEffect } from "react";
import styles from "@/styles/ComboGuides.module.css";
import { ThemeContext } from "../../components/ThemeContext";
import Search from "/components/Search";
import Footer from "/components/Footer";
import Navbar from "/components/Navbar";
import ComboCard from "/components/ComboCard";
import {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { Auth } from "aws-amplify";
import awsmobile from "../../components/Authentication/amplifyHandler";

/* const votesInfo = {
  Id: { N: postId },
  UserId: { S: UserId },
  VoteVal: { BOOL: vote },
};

const params = {
  TableName: "postVotes",
  Item: votesInfo,
}; */

/*   try {
  // Insert the item into the DynamoDB table
  await client.send(new PutItemCommand(params));
} catch(error) {
  console.log("Error sending votes:", error);
} */

const ComboGuides = () => {
  const { theme } = useContext(ThemeContext);
  const [userId, setUserId] = useState("");
  const [postId, setPostId] = useState("");
  const [displayedCombos, setDisplayedCombos] = useState([]);

  useEffect(() => {
    const client = new DynamoDBClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const comboParams = {
      TableName: "CombosSF6",
    };

    const fetchData = async () => {
      awsmobile;
      try {
        const userInfo = await Auth.currentUserInfo();
        setUserId(userInfo.attributes.sub);

        const response = await client.send(new ScanCommand(comboParams));
        setDisplayedCombos(response.Items);
        console.log("Success, data received:", displayedCombos);
      } catch (error) {
        console.error("Error retrieving data from DynamoDB:", error);
      }
    };

    fetchData();
  }, [,]);

  const handleSearch = (searchQuery) => {
    const formattedSearchQuery = searchQuery.toLowerCase().replace(/-/g, "");
    const filteredData = comboRawData.filter((card) => {
      const formattedCharName = card.Character?.S.toLowerCase().replace(
        /-/g,
        ""
      );
      const formattedTitle = card.PostTitle?.S.toLowerCase().replace(/-/g, "");
      /*       const formattedTags = card.Tags?.S.map((tag) => tag.text.toLowerCase()); */

      return (
        formattedCharName.includes(formattedSearchQuery) ||
        formattedTitle.includes(formattedSearchQuery)
        /*      formattedTags.includes(formattedSearchQuery) */
      );
    });
    setDisplayedCombos(filteredData);
  };

  return (
    <div className={styles[`${theme}container`]}>
      <Navbar />

      <Search onSearch={handleSearch} />

      <ComboCard
        displayedCombos={displayedCombos}
        userId={userId}
        theme={theme}
      />

      <Footer />
    </div>
  );
};

export default ComboGuides;
