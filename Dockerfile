FROM node:18-alpine
LABEL AUTHOR=uug.ai

RUN mkdir -p /fac
WORKDIR /fac

COPY ui/ .
RUN yarn install
RUN yarn build 

EXPOSE 3000

CMD [ "yarn", "run", "dev" ]
