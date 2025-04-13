FROM node:20-alpine

# Create app directory
WORKDIR /frontend

# Copy only package.json
COPY package.json ./

# Install app dependencies
RUN yarn install

# Copy app source
COPY . .

# Make sure config.js isn't overwritten by the volume mount
# by creating it here (will be overwritten by volume)
RUN echo "// This will be replaced by volume mount" > config.js

EXPOSE 3000

CMD ["yarn", "start"]