FROM node:22

WORKDIR /usr/src/app

COPY . .
RUN npm install --production --include=dev
RUN npm run build
CMD ["npm", "start"]
