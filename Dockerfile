FROM harbor.ufpe.br/dockerhub/library/node:18.16-alpine3.16
# RUN apk add dumb-init
ENV NODE_ENV production
ARG APP_DIR=/usr/src/app
WORKDIR ${APP_DIR}
COPY --chown=node:node . .
RUN npm ci --only=production &&\
    mkdir -p ${APP_DIR}/storage
#RUN chown -R node:node ${APP_DIR}/storage
#USER node
EXPOSE 3000
#CMD ["dumb-init", "npm", "start"]
CMD ["npm", "start"]
