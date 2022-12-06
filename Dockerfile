FROM node:17-alpine as build

ENV HOME=/home/app
WORKDIR $HOME
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --only=prod --silent
# Copy app files
COPY . /home/app

FROM nginx:1.16.0-alpine

COPY --from=build /home/app/ /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]