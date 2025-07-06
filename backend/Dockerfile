# Use Node.js official image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port for the backend
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
