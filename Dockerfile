FROM node:alpine
WORKDIR /app
COPY . ./
RUN rm package-lock.json
RUN yarn
EXPOSE 7079
# CMD ["yarn", "start"]