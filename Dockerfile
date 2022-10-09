FROM node:lts as dependencies
WORKDIR /src
COPY . ./
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["yarn", "start"]
