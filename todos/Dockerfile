# Use Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose Vite dev server or CRA port
EXPOSE 5173

# Start the frontend dev server
CMD ["npm", "start"]
