FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the app port
EXPOSE 4000

# Start the application
CMD [ "npm", "start" ]