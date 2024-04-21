FROM node:lts-bookworm as build
WORKDIR /workdir
COPY .  .
RUN npm ci
CMD npx prisma generate && npm run dev