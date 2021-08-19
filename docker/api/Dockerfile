FROM node:14-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

ADD package*.json /home/node/
ADD dist/src /home/node/dist/
ADD prisma/schema.prisma /home/node/prisma/schema.prisma

RUN npm ci
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:prod"]