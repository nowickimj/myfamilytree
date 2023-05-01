FROM node:18-alpine as builder

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package.json /app/package-lock.json

RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.3-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
