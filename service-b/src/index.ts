import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, Handler } from 'aws-lambda';

// Separate core logic
export function processServiceBEvent(event: APIGatewayProxyEvent): { message: string; eventData: APIGatewayProxyEvent } {
  const message: string = "Hello from Service B (v11-B)";
  console.log(message);
  return { message, eventData: event };
}

// Handler uses the core logic function
export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const result = processServiceBEvent(event);

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(result),
  };

  return response;
};