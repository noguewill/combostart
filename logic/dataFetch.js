import { Auth } from "aws-amplify";
import { awsmobile } from "./amplifyHandler";
import {
  DynamoDBClient,
  ScanCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";

/* Credential setup */
const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
});
/* Defines the current authenticated user */
export const defCurrentUser = async () => {
  awsmobile;
  try {
    const user = await Auth.currentAuthenticatedUser();

    return user.attributes;
  } catch (error) {
    console.error("User not authenticated.");
  }
};

/* Function to fetch all comboPosts of Street Fighter 6 */
export const fetchComboData = async (game) => {
  try {
    const tableParamsMap = {
      streetfighter6: {
        TableName: "combosSF6",
      },
      mortalkombat1: {
        TableName: "combosMKOne",
      },
    };

    // Get the table parameters based on the game name
    const tableParams = tableParamsMap[game];

    if (!tableParams) {
      console.error("Invalid game name:", game);
      return []; // Return an empty array or handle the error as needed
    }

    const response = await client.send(new ScanCommand(tableParams));

    return response.Items;
  } catch (error) {
    console.error("Error retrieving comboData from DynamoDB:", error);
    // You might want to throw the error or handle it as needed
    throw error;
  }
};

/* It retrieves the vote history of a user */
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
        return voteTypeObject.S; // Return the voteType as a string
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    return null; // Return null in case of an error
  }
};

export const fetchRates = async (userId) => {
  try {
    // Define the parameters for the GetItemCommand
    const userTableParams = {
      TableName: "userData",
      Key: {
        userId: { S: userId },
      },
    };

    // Use the GetItemCommand to retrieve the item
    const results = await client.send(new GetItemCommand(userTableParams));

    /* If userRates comes back empty, return null */
    const userRates = results.Item?.Rates.M;
    if (userRates) {
      return {
        voteRate: userRates.voteRate?.N,
        rateTimer: userRates.rateTimer?.N,
      };
    } else {
      console.error(error.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching Rates from userData:", error);
    throw error; // You can handle the error as needed.
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

export const fetchTimestamps = async () => {
  const params = {
    TableName: "combosSF6",
  };

  try {
    // Use the ScanCommand to retrieve all items from the table
    const results = await client.send(new ScanCommand(params));

    // Extract the timestamps and partition keys from the results
    const itemsData = results.Items.map((item) => {
      return {
        timestamp: item.Timestamp?.N, // Assuming the timestamp is stored as a number
        postId: item.postId?.S, // Replace PARTITION_KEY_NAME with your actual partition key attribute name
      };
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};
