import Redis from "ioredis";

// Create a new Redis connection (default connection to localhost)
const redis = new Redis();

// Publisher: Function that publishes the message to a channel
export const publishMessage = async (channel: string, message: string) => {
  await redis.publish(channel, message);
  console.log(`Message published to ${channel}: ${message}`);
};

// Subscriber: Listen for new messages on a specific channel
export const subscribeToChannel = (
  channel: string,
  callback: (message: string) => void
) => {
  redis.subscribe(channel, (err, count) => {
    if (err) {
      console.error("Failed to subscribe: ", err);
    } else {
      console.log(`Subscribed to ${channel}, listening for messages...`);
    }
  });

  redis.on("message", (chan, message) => {
    if (chan === channel) {
      callback(message); // Execute the callback with the received message
    }
  });
};

//publishMessage: Publishes messages to a Redis channel.
//subscribeToChannel: Listens to messages from the Redis channel and executes the provided callback.
