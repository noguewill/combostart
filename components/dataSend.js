import {
  DynamoDBClient,
  DeleteItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { fetchRates } from "./dataFetch";

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
const voteRate = 5;

export const addRatesToUserData = async (userId) => {
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
};

export const recordVote = async (postId, userId, voteType) => {
  try {
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
    const userTableParams = {
      TableName: "userData",
      Key: {
        userId: { S: userId },
      },
      UpdateExpression: "SET UserVoteHistory = :history",
      ExpressionAttributeValues: {
        ":history": { M: userVoteHistoryUpdate },
      },
    };

    await client.send(new PutItemCommand(params));
    await client.send(new UpdateItemCommand(userTableParams));

    // Increment or decrement the VoteCount of the corresponding post
    if (voteType === "upvote") {
      await updateVoteCount(postId, 1); // Increase VoteCount by 1
    } else if (voteType === "downvote") {
      await updateVoteCount(postId, -1); // Decrease VoteCount by 1
    }

    console.log("voteInfo inserted successfully into DynamoDB");
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

    console.log("Vote record removed successfully");
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
    console.log("Vote count updated successfully");
  } catch (error) {
    console.error("Error updating vote count:", error);
  }
};
