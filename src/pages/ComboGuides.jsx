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

/* 
create the state to store all the upvoted posts of the currently auth'ed user
Create the state to store all the downvoted posts of the currently auth'ed user

Create the logic that compares both postId of shown posts and user's voting history
Create the logic that updates the UI to show the result of the comparing

Create the handleVoting function
where it checks if the user has already voted on that specific post
if he did, and it was an upvote, -1 
if he did, and it was a downvote, +1

do not let him vote more than once on the same post
  */

/* const handleVoting = (parentId, action) => { */
/*  
The schema for userData[i].voteHistory should be an array of objects,
each object have the id of the postid, and inside the object should have a key named "vote"
if the user upvoted that specific post the vote key will hold "1"
if the user downvoted that specific post the vote key will hold "-1"
if the handleVoting function did not find any object with the contextual postId in the user 
voteHistory that means the user did not vote 

The logic above will be used to render the UI of the upvtes and downvotes of the currentAuthUser
Also to determine if the user can upvote/downvote 

The logic for just displaying the voteCount of the posts is another table's problem, the postVotes table


so 2 tables, one to determine which UI should update, and to handle the behavior of the voting of the user

the other table to just show the number of votes for each specific post

*/
/*   if (parentId === upvotedPosts || downvotedPosts) { */
/*  Remove item from both userData table voteHistory and postsVotes post voteCount 
        that corresponds with the parentId */
/* userData:
          voteHistory: {
           postId: postId,
           voteAction: 1
            } */
/* postsVotes:
         postId: {
          voteCount: 100;
         } */
/*   } else { */
/* add the item to postsVotes table and to the userData voteHistory table object with
    the parent id and "action" */
/*  } */
/* }; */

const ComboGuides = () => {
  const { theme } = useContext(ThemeContext);
  const [userId, setUserId] = useState("");
  const [postId, setPostId] = useState([]);
  const [upvotedPosts, setUpvotedPosts] = useState([]);
  const [downvotedPosts, setDownvotedPosts] = useState([]);
  const [displayedCombos, setDisplayedCombos] = useState([]);

  // Fetch data once when the component mounts
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      awsmobile;
      const client = new DynamoDBClient({
        region: "us-east-1",
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          sessionToken: process.env.AWS_SESSION_TOKEN, // Include sessionToken for temporary unauthenticated credentials
        },
      });

      const comboParams = {
        TableName: "CombosSF6",
      };

      try {
        const user = await Auth.currentAuthenticatedUser();
        setUserId(user.attributes.sub);
        console.log("User authenticated:", user);
      } catch (error) {
        console.log("User not authenticated.");
      }

      try {
        const response = await client.send(new ScanCommand(comboParams));
        setDisplayedCombos(response.Items);

        // Process the displayedCombos array to extract postId and set it in the state
        const postIds = response.Items.map((val) => val.id?.N);
        setPostId(postIds);

        console.log("Success, data received:", response.Items);
      } catch (error) {
        console.error("Error retrieving data from DynamoDB:", error);
      }
    };

    fetchData().then(() => {
      // Ensure the component is still mounted before updating the state
      if (isMounted) {
        console.log("Data fetching and state updates completed.");
      }
    });
  });

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
