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

/* User rating handling */
export const recordUserRate = async (userId) => {
  const voteRate = 0;
  const rateTimerVal = Math.floor(Date.now() / 1000) + 3600; // 3600 seconds = 1 hour

  try {
    const userRates = await fetchRates(userId);

    /* FIRST TIME CREATION OF THE RATE ATTRIBUTE IN THE USERDATA TABLE */
    const rateAttributes = {
      RateAmount: { N: voteRate.toString() },
      RateTimer: { N: rateTimerVal.toString() },
    };

    const createRateAttr = {
      TableName: "userData",
      Key: {
        userId: { S: userId },
      },
      UpdateExpression: "SET Rates = :rateObj",
      ExpressionAttributeValues: {
        ":rateObj": { M: rateAttributes },
      },
    };

    // Calculate the time difference in seconds
    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
    const rateTimerInSeconds = userRates ? parseInt(userRates.RateTimer) : 0;
    const timeDifference = currentTimestampInSeconds - rateTimerInSeconds;

    // Check if an hour has passed
    const anHourHasPassed = timeDifference >= 3600;

    /* Condition 1: The user does not have the Rates attribute*/
    if (userRates === null) {
      await client.send(new UpdateItemCommand(createRateAttr));
    }

    if (userRates) {
      console.log(anHourHasPassed);
      console.log(timeDifference);
      /* Condition 2: The user has not voted 6 times and time has not ran out */
      if (userRates.RateAmount !== 5 && anHourHasPassed === false) {
        await updateRateAmount(userId, 1);

        /* Condition 3: The user voted 6 times and time has not ran out */
      } else if (userRates.RateAmount === 5 && anHourHasPassed === false) {
        console.log("Limit Reached");
        return "Limit Reached";

        /* Condition 4: Time has ran out */
      } else if (anHourHasPassed === true) {
        // Delete the "Rates" attribute for the user
        const deleteRateAttr = {
          TableName: "userData",
          Key: {
            userId: { S: userId },
          },
          UpdateExpression: "REMOVE Rates",
        };

        await client.send(new UpdateItemCommand(deleteRateAttr));
      }
    }
  } catch (error) {
    console.error("Error inserting rates into DynamoDB:", error);
  }
};

export const updateRateAmount = async (userId, increment) => {
  const updateParams = {
    TableName: "userData",
    Key: {
      userId: { S: userId },
    },
    UpdateExpression: "SET Rates.RateAmount = Rates.RateAmount + :increment",
    ExpressionAttributeValues: {
      ":increment": { N: increment.toString() },
    },
  };

  try {
    await client.send(new UpdateItemCommand(updateParams));
  } catch (error) {
    console.error("Error updating rate amount:", error);
  }
};
