# Dockerfile for React Client

# Build Stage
FROM node:18.12.1

# Working Directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install Dependencies
RUN npm install --silent

# Copy Files to Working Directory
COPY . .

EXPOSE 3000

RUN chown -R node:node /usr/src/app/node_modules

CMD ["npm", "start"]