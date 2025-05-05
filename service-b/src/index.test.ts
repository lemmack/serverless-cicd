import { handler, processServiceBEvent } from './index'; // Import handler and/or logic function
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

describe('Service B Tests', () => {
  // Test the refactored logic directly (if applicable)
  it('processServiceBEvent should return correct message', () => {
    // Minimal mock event, add properties as needed
    const mockEvent = {} as APIGatewayProxyEvent;
    const result = processServiceBEvent(mockEvent);
    expect(result.message).toContain("Hello from Service B");
    expect(result.eventData).toBe(mockEvent);
  });

  // Test the handler function
  it('handler should return 200 status and correct body', async () => {
    const mockEvent = {} as APIGatewayProxyEvent;
    // Minimal mock context, add properties as needed
    const mockContext = {} as Context;
    const mockCallback = jest.fn(); // Jest mock function for callback

    const response = await handler(mockEvent, mockContext, mockCallback) as APIGatewayProxyResult;

    expect(response.statusCode).toBe(200);
    expect(response.headers).toHaveProperty('Content-Type', 'application/json');
    const body = JSON.parse(response.body);
    expect(body.message).toContain("Hello from Service B");
  });
});