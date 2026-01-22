# Use a lightweight Node image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of your app code
COPY . .

# Expose the port your Express app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]