FROM node:22

WORKDIR /usr/src/app

COPY . .
RUN npm install --production --include=dev
RUN npm run build
CMD ["npm", "start"]

# docker build -t personal-website:1.0 .
# docker run -dp 3000:3000 personal-website:1.0
