import {
  DynamoDBClient,
  DeleteItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

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
