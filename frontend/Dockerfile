# Use an offica node runtime as a parent image
FROM node:20.16

# Set the working directory
WORKDIR /app

# Copy package.json and package-log.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Make port 3000 avalible to the world ousite this container
EXPOSE 3000

# Run npm start when the container launches
CMD [ "npm", "start" ]