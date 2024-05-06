FROM node:lts-bookworm as build
WORKDIR /workdir
COPY .  .
RUN npm ci
RUN npm run build
CMD npx prisma generate && npm start