FROM node:14-alpine

USER node
WORKDIR /home/node

ADD package*.json /home/node/
ADD dist/prisma/seed.js /home/node/prisma/
ADD prisma/schema.prisma /home/node/prisma/
ADD prisma/migrations/ /home/node/prisma/migrations/

RUN npm ci

CMD ["npx", "prisma", "migrate", "dev"]