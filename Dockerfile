ARG NODE_VERSION
FROM node:${NODE_VERSION}

# Create app directory
RUN mkdir -p /srv/app
WORKDIR /srv/app

# Copy code
COPY . /srv/app

# Install app dependencies
RUN npm install

# Copy code
COPY . /srv/app/

# expose the API port
EXPOSE 3000

# Setup healthcheck
HEALTHCHECK --start-period=5s CMD curl --fail http://localhost:3000/health

CMD ["sh", "docker.sh"]
