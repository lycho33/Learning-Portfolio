# Use a lightweight Node image
FROM node:22-alpine

# Set the working directory
WORKDIR /

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install 

# Copy the rest of your app code
COPY . .

# Expose the port your Express app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]