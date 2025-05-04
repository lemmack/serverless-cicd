// service-a/src/index.ts
import { Handler } from 'aws-lambda'; // Optional: Provides type safety

// Define the handler function
export const handler: Handler = async (event, context) => {
  // event: Contains data passed to the function (we don't use it yet)
  // context: Provides info about the invocation, function, execution env

  const message: string = "Hello from Service A (v5-A)";
  console.log(message); // This will appear in CloudWatch Logs

  // Return a response object (common format for API Gateway integration later)
  const response = {
    statusCode: 200, // HTTP Status Code: OK
    headers: {
       "Content-Type": "application/json" // Indicate JSON content
    },
    body: JSON.stringify({ // The actual response data, as a JSON string
       message: message,
       eventData: event // Let's include the event data for inspection
    }),
  };

  return response;
};