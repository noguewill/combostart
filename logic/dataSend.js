import {
  DynamoDBClient,
  DeleteItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { fetchRates } from "../logic/dataFetch";

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/* export const addRatesToUserData = async (userId) => {
  try {
    // Fetch the current UNIX timestamp
    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

    // Fetch existing rates data for the user
    const rates = await fetchRates(userId);

    let { voteRate, rateTimer } = rates;

    // Condition 1: If there is no Rates attribute and rateTimer - 1 hour is equal to 0
    if (!rates && rateTimer - 3600 === 0) {
      voteRate = 10;
      rateTimer = currentTimestampInSeconds + 3600; // 3600 seconds = 1 hour
    }
    // Condition 2: If rateTimer and voteRate are not 0, decrement voteRate by 1
    else if (rateTimer !== 0 && voteRate !== 0) {
      voteRate -= 1;
    }
    // Condition 3: If rateTimer has a value and voteRate is 0, stop executing
    else if (rateTimer !== 0 && voteRate === 0) {
      console.log("Conditions not met. Function not executed.");
      return "denied";
    }

    // Define the Rates attribute with the updated values
    const ratesAttribute = {
      voteRate: { N: voteRate.toString() },
      rateTimer: { N: rateTimer.toString() },
    };

    const userTableParams = {
      TableName: "userData",
      Key: {
        userId: { S: userId },
      },
      UpdateExpression: "SET Rates = :rates",
      ExpressionAttributeValues: {
        ":rates": { M: ratesAttribute },
      },
    };

    // Send the UpdateItem request to DynamoDB
    await client.send(new UpdateItemCommand(userTableParams));

    console.log("Rates attribute updated in userData successfully.");
  } catch (error) {
    console.error("Error updating Rates attribute in userData:", error);
  }
}; */

export const recordRate = async (userId) => {
  try {
    // Fetch the current UNIX timestamp in seconds
    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

    // Fetch existing rates data for the user
    let rates = await fetchRates(userId);

    // Check if it has been an hour since the last rate update
    if (rates && currentTimestampInSeconds >= rates.rateTimer) {
      // It has been an hour, reset rateAmount to 0 and update rateTimer
      rates.rateAmount = 0;
      rates.rateTimer = currentTimestampInSeconds + 3600; // Reset the timer to 1 hour from now
    }

    // Check if the user has reached the rate limit
    if (
      rates &&
      rates.rateAmount >= 15 &&
      currentTimestampInSeconds < rates.rateTimer
    ) {
      return "limitReached"; // Rate limit reached, don't update rateAmount
    }

    // If rate-related attributes don't exist, create them
    if (!rates) {
      const createRateAttributes = {
        TableName: "userData", // Your DynamoDB table name for user data
        Key: {
          userId: { S: userId },
        },
        UpdateExpression:
          "SET RateAmount = :initialAmount, RateTimer = :initialTimer",
        ExpressionAttributeValues: {
          ":initialAmount": { N: "0" }, // Initial rate amount is 0
          ":initialTimer": { N: "0" }, // Initial rate timer is 0
        },
      };

      await client.send(new UpdateItemCommand(createRateAttributes));

      // Set rates with the newly created attributes
      rates = {
        rateAmount: 0,
        rateTimer: 0,
      };
    }

    /* Sending data to the userData table */
    const rateInfo = {
      userId: { S: userId }, // Use userId as a key
    };
    const params = {
      TableName: "userData", // Your DynamoDB table name for user data
      Item: rateInfo,
    };

    /* Sending data to the userData table */
    const userRateUpdate = {
      RateAmount: { N: "1" }, // Assuming you always increase the rateAmount by 1
    };
    const updateUserRate = {
      TableName: "userData", // Your DynamoDB table name for user data
      Key: {
        userId: { S: userId },
      },
      UpdateExpression:
        "SET RateAmount = RateAmount + :increment, RateTimer = :timer",
      ExpressionAttributeValues: {
        ":increment": { N: "1" }, // You can adjust this value if you want to increment by a different amount
        ":timer": { N: rates.rateTimer.toString() },
      },
    };

    await client.send(new PutItemCommand(params));

    // Update the RateAmount in the userData table
    await client.send(new UpdateItemCommand(updateUserRate));
  } catch (error) {
    console.error("Error recording rate:", error);
  }
};

// Function to fetch userData by userId
export const fetchUserVoteHistory = async (userId) => {
  const params = {
    TableName: "userData",
    Key: {
      userId: { S: userId },
    },
  };

  try {
    const response = await client.send(new GetItemCommand(params));

    return response.Item; // Return the userData item
  } catch (error) {
    console.error("Error fetching userData:", error);
    throw error;
  }
};

// Function to create or update UserVoteHistory
export const recordVote = async (postId, userId, voteType) => {
  try {
    const isThereUserVoteHistory = await fetchUserVoteHistory(userId);

    /* Sending data to the postVotes table */
    const voteInfo = {
      postId: { S: postId }, // Use postId as a key
      userId: { S: userId },
      voteType: { S: voteType },
    };
    const params = {
      TableName: "postVotes",
      Item: voteInfo,
    };

    /* Sending data to the userData table */
    const userVoteHistoryUpdate = {
      [postId]: { S: voteType }, // Use postId as a key
    };
    const createUserVoteHistory = {
      TableName: "userData",
      Key: {
        userId: { S: userId },
      },
      UpdateExpression: "SET UserVoteHistory = :history",
      ExpressionAttributeValues: {
        ":history": { M: userVoteHistoryUpdate },
      },
    };

    /* Sending update vote record data to the UserVoteHistory attribute */
    const updateUserVoteHistory = {
      TableName: "userData",
      Key: {
        userId: { S: userId },
      },
      UpdateExpression: "SET UserVoteHistory.#post = :voteType",
      ExpressionAttributeNames: {
        "#post": postId, // Specify the post ID as the attribute name
      },
      ExpressionAttributeValues: {
        ":voteType": { S: voteType },
      },
    };

    await client.send(new PutItemCommand(params));

    if (isThereUserVoteHistory) {
      await client.send(new UpdateItemCommand(updateUserVoteHistory));
    } else {
      await client.send(new UpdateItemCommand(createUserVoteHistory));
    }

    // Increment or decrement the VoteCount of the corresponding post
    if (voteType === "upvote") {
      await updateVoteCount(postId, 1); // Increase VoteCount by 1
    } else if (voteType === "downvote") {
      await updateVoteCount(postId, -1); // Decrease VoteCount by 1
    }
  } catch (error) {
    console.error("Error inserting item into DynamoDB:", error);
  }
};

export const removeVote = async (postId, userId, voteType) => {
  try {
    const voteParams = {
      TableName: "postVotes",
      Key: {
        postId: { S: postId },
        userId: { S: userId },
      },
    };

    await client.send(new DeleteItemCommand(voteParams));

    const userVoteHistoryUpdate = {
      [postId]: { NULL: true }, // Remove the entry by setting it to NULL
    };
    const userTableParams = {
      TableName: "userData",
      Key: {
        userId: { S: userId },
      },
      UpdateExpression: "REMOVE UserVoteHistory.#post",
      ExpressionAttributeNames: {
        "#post": postId, // Specify the post ID as the attribute name
      },
    };

    await client.send(new UpdateItemCommand(userTableParams));

    // Increment or decrement the VoteCount of the corresponding post
    if (voteType === "upvote") {
      await updateVoteCount(postId, -1); // Decrease VoteCount by 1
    } else if (voteType === "downvote") {
      await updateVoteCount(postId, 1); // Increase VoteCount by 1
    }
  } catch (error) {
    console.error("Error removing vote record:", error);
  }
};

export const updateVoteCount = async (postId, increment) => {
  const updateParams = {
    TableName: "combosSF6",
    Key: {
      postId: { S: postId },
    },
    UpdateExpression: "SET VoteCount = VoteCount + :increment",
    ExpressionAttributeValues: {
      ":increment": { N: increment.toString() },
    },
  };

  try {
    await client.send(new UpdateItemCommand(updateParams));
  } catch (error) {
    console.error("Error updating vote count:", error);
  }
};

/* const newUser = {
  userId: { S: userId },
  UserVoteHIstory: { M: {} },
};

const params = {
  TableName: "userData",
  Item: newUser,
};
 */
