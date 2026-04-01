# Use official Node.js runtime as the base image
FROM node:18-alpine as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Final Stage: Lean production image
FROM node:18-alpine

WORKDIR /app

# Copy only relevant files from build stage
COPY --from=build /app .

# Expose the application port
EXPOSE 5001

# Start the application
CMD ["npm", "start"]
