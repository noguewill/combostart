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

export const defCurrentUser = async () => {
  awsmobile;
  try {
    const user = await Auth.currentAuthenticatedUser();

    return user.attributes;
  } catch (error) {
    return;
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
      console.log("Invalid game name:", game);
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

// Function to fetch rate data for a user and create/update rate attributes
export const fetchRates = async (userId) => {
  const params = {
    TableName: "userData", // Your DynamoDB table name for user data
    Key: {
      userId: { S: userId }, // Specify the user ID to retrieve rate data
    },
  };

  try {
    const response = await client.send(new GetItemCommand(params));

    if (response.Item.Rates.M) {
      // Rate-related attributes exist; extract and return them
      const rates = response.Item.Rates.M;
      const rateAmount = parseInt(rates.RateAmount.N); // Convert RateAmount to an integer
      const rateTimer = parseInt(rates.RateTimer.N); // Convert RateTimer to an integer

      return { RateAmount: rateAmount, RateTimer: rateTimer };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching rate data:", error);
    return null;
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
