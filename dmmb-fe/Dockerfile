FROM node:18-alpine

WORKDIR /opt/

RUN apk update && apk upgrade && apk add git
COPY . /opt/

#RUN npm install --global yarn
RUN yarn && yarn build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "yarn", "start" ]