import { Request, Response } from "express";
import { publishMessage } from "../redis/pubsub";
import { createTest, getTestData } from "../services/test.service";

// Function to simulate user signup and send verification message
export const signUpUser = async (username: string, email: string) => {
  console.log(`User ${username} signed up with email: ${email}`);

  // Simulate saving the user to the database here...

  // Create the verification message (can be a link or token)
  const verificationMessage = `Verification link for ${username}: http://example.com/verify?email=${email}`;

  // Publish the verification message to the "verification" channel
  await publishMessage("verification", verificationMessage);
};

//After a user signs up, this function will publish a verification message to the verification channel.

export const handleGetAllTest = async (req: Request, res: Response) => {
  return await getTestData(req, res);
};

export const handleCreateTest = async (req: Request, res: Response) => {
  return await createTest(req, res);
};
