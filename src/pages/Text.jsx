import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { useEffect } from "react";

const Text = () => {
  useEffect(() => {
    // Create an instance of the DynamoDB client
    const client = new DynamoDBClient({
      // Configure your AWS credentials and region appropriately
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    // Example code: Send an item to the DynamoDB table
    const params = {
      TableName: "TokenId",
      Item: {
        id: { S: "yourItemId" },
        userToken: { S: "yourUserTokenValue" }, // Add the userToken attribute
        // Add other attributes as needed
        // Example: "attributeName": { S: "attributeValue" }
      },
    };

    const command = new PutItemCommand(params);

    client
      .send(command)
      .then(() => {
        console.log("Item added successfully");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  }, []);

  return (
    // Your component JSX
    <div>
      <h1>Using DynamoDB in Next.js</h1>
      {/* Rest of your component */}
    </div>
  );
};

export default Text;
