FROM node:20-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE ${PORT}

CMD [ "node", "app.js" ]

# HEALTHCHECK --interval=21s --timeout=3s --start-period=10s CMD node ./dist/healthcheck.js