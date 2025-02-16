FROM node:22

WORKDIR /usr/src/app

COPY . .
RUN npm install --production --include=dev
RUN npm run build
CMD ["npm", "start"]

EXPOSE 3000

# docker build -t personal-website:1.0 .
# docker run -dp 3000:3000 personal-website:1.0

# iphone 13 horizontal viewpoint: 400px × 850px
