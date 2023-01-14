# Dockerfile for backend

# Build Stage
FROM node:18.12.1

# Working Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

# Install Dependencies
RUN npm install --silent

# Copy Files to Working Directory
COPY . .

EXPOSE 5000

CMD ["npm", "dev"]