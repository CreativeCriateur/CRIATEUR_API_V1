import { subscribeToChannel } from "../redis/pubsub";

// Callback to handle verification message
const handleVerificationMessage = (message: string) => {
  console.log("Received verification message:", message);
  // Here you can send the verification email or SMS to the user
  // For example, sending an email with the verification link
};

// Start listening for verification messages
subscribeToChannel("verification", handleVerificationMessage);

//This verificationListener.ts file listens for messages on the verification channel and processes them (e.g., sending a verification email to the user).
