FROM node:lts-bookworm as build
WORKDIR /workdir
COPY .  .
RUN npm ci
CMD npm run dev