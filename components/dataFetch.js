import { Auth } from "aws-amplify";
import { awsmobile } from "./Authentication/amplifyHandler";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

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
    return user.attributes.sub;
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

export const fetchVoteData = async (postId) => {
  try {
    // Construct a FilterExpression to filter the scan results by 'postId'
    const filterExpression = "postId = :postId";
    const expressionAttributeValues = {
      ":postId": { S: postId }, // Use { S: postId } to specify it as a String attribute value
    };
    const voteParams = {
      TableName: "postVotes",
      FilterExpression: filterExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    };

    const response = await client.send(new ScanCommand(voteParams));

    // Check if 'Items' array exists and has elements
    if (response.Items && response.Items.length > 0) {
      console.log("Success, voting data received:", response.Items);
      return response.Items;
    } else {
      console.log("No voting data found for postId:", postId);
      return [];
    }
  } catch (error) {
    console.error("Error retrieving data from DynamoDB:", error);
    return []; // Return an empty array in case of an error
  }
};
