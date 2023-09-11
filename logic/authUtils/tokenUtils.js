import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

export const storeToken = async (token, expirationTime) => {
  const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const params = {
    TableName: "TokenId",
    Item: {
      userToken: { S: token },
      expirationTime: { N: expirationTime.toString() },
    },
  };

  try {
    await client.send(new PutItemCommand(params));
    console.log("Token stored successfully");
  } catch (error) {
    console.error("Error storing token:", error);
    throw error;
  }
};
