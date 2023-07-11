import React, { useState, useContext, useEffect } from "react";
import styles from "@/styles/ComboGuides.module.css";
import { ThemeContext } from "../../components/ThemeContext";
import Search from "/components/Search";
import Footer from "/components/Footer";
import Navbar from "/components/Navbar";
import ComboCard from "/components/ComboCard";
import sf6 from "/gamesData/sf6.json";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const ComboGuides = () => {
  const { theme } = useContext(ThemeContext);
  const [comboRawData, setComboRawData] = useState([]);
  const [filteredCombos, setFilteredCombos] = useState([]);

  useEffect(() => {
    const client = new DynamoDBClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const params = {
      TableName: "CombosSF6",
    };

    const fetchData = async () => {
      try {
        const response = await client.send(new ScanCommand(params));
        const combosData = response.Items; // Retrieve the data from the response

        // Set the retrieved data in your component state or use it as needed
        setComboRawData(combosData);

        console.log("Success, data received");
      } catch (error) {
        console.error("Error retrieving data from DynamoDB:", error);
      }
    };

    fetchData();
  }, []);

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

    setFilteredCombos(filteredData);
  };

  return (
    <div className={styles[`${theme}container`]}>
      <Navbar loggedIn={false} />

      <Search onSearch={handleSearch} />

      <ComboCard filteredCombos={filteredCombos} />

      <Footer />
    </div>
  );
};

export default ComboGuides;
