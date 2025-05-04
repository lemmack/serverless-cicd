// service-b/src/index.ts
import { Handler } from 'aws-lambda'; // Optional: Provides type safety

// Define the handler function
export const handler: Handler = async (event, context) => {
  const message: string = "World from Service B (v6-B)";
  console.log(message); // This will appear in CloudWatch Logs

  // Return a response object
  const response = {
    statusCode: 200,
    headers: {
       "Content-Type": "application/json"
    },
    body: JSON.stringify({
       message: message,
       eventData: event
    }),
  };

  return response;
};