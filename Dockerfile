FROM node:alpine
WORKDIR /app
COPY . ./
RUN yarn
EXPOSE 7079
# CMD ["yarn", "start"]