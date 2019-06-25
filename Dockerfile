FROM node:alpine

ARG spec_url=https://api.firstclasspostcodes.com/data/.spec

ENV NODE_ENV=production \
    PORT=80 \
    SPEC_URL=$spec_url \
    DATA_PATH=/app/src/data/ \
    SPEC_FILE=/app/spec.json

EXPOSE 80

ADD . /app

WORKDIR /app

RUN apk add --no-cache --virtual /.build-dependencies curl && \
    curl $SPEC_URL -o $SPEC_FILE && \
    npm ci --production && \
    apk del /.build-dependencies

CMD npm start
