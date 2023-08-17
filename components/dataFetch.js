import { Auth } from "aws-amplify";
import { awsmobile } from "./Authentication/amplifyHandler";
import {
  DynamoDBClient,
  ScanCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
});

const comboParams = {
  TableName: "combosSF6",
};

export const defCurrentUser = async () => {
  awsmobile;
  try {
    const user = await Auth.currentAuthenticatedUser();
    console.log("User authenticated:", user);
    return user.attributes;
  } catch (error) {
    console.log("User not authenticated.");
  }
};

/* Function to fetch all comboPosts of Street Fighter 6 and set the current authenticated user */
export const fetchComboData = async () => {
  try {
    const response = await client.send(new ScanCommand(comboParams));
    console.log("Success, data received:", response.Items);
    return response.Items;
  } catch (error) {
    console.error("Error retrieving comboData from DynamoDB:", error);
  }
};

export const fetchVoteData = async (postId, userId) => {
  try {
    // Retrieve the user's vote history from the 'userData' table
    const userVoteHistoryParams = {
      TableName: "userData",
      Key: {
        userId: { S: userId },
      },
    };

    const userVoteHistoryResponse = await client.send(
      new GetItemCommand(userVoteHistoryParams)
    );

    // Check if the user's vote history is available
    const userVoteHistory = userVoteHistoryResponse.Item?.UserVoteHistory;
    if (userVoteHistory) {
      const voteTypeObject = userVoteHistory?.M[postId]; // Get the object for the specific post
      if (voteTypeObject && voteTypeObject.S) {
        console.log("Success, voting data received:", voteTypeObject.S);
        return voteTypeObject.S; // Return the voteType as a string
      } else {
        console.log(
          "PostId matches, the user voted, here's his vote:",
          voteTypeObject.S
        );
        return null;
      }
    } else {
      console.log("User's vote history not found");
      return null;
    }
  } catch (error) {
    return null; // Return null in case of an error
  }
};

export const fetchUpvotedPostIds = async (userId) => {
  try {
    const userVoteHistoryParams = {
      TableName: "userData",
      Key: {
        userId: { S: userId },
      },
    };

    const userVoteHistoryResponse = await client.send(
      new GetItemCommand(userVoteHistoryParams)
    );

    const userVoteHistory = userVoteHistoryResponse.Item?.UserVoteHistory;

    const upvotedPostIds = [];

    if (userVoteHistory) {
      for (const postId in userVoteHistory.M) {
        console.log(userVoteHistory.M[postId]);
        if (userVoteHistory.M[postId].S === "upvote") {
          upvotedPostIds.push(postId);
        }
      }
    }
    return upvotedPostIds;
  } catch (error) {
    console.error("Error fetching upvoted post IDs:", error);
    return [];
  }
};
