# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Compile TypeScript inside the container
RUN npm run build

# Set environment variable (optional, recommended for production)
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 4060

# Start the application
CMD ["node", "dist/server.js"]