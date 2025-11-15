FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g pnpm
COPY . .

RUN pnpm install
RUN pnpm run build

FROM nginx:stable-alpine

USER nginx

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]