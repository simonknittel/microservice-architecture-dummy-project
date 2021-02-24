FROM node:14.16.0-alpine3.12 AS builder
ENV NODE_ENV=development
WORKDIR /app
COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]
RUN npm ci
COPY src src/
RUN npm run build

FROM node:14.16.0-alpine3.12
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder ["/app/package.json", "/app/package-lock.json", "./"]
RUN npm ci
COPY --from=builder ["/app/dist", "./dist/"]
EXPOSE 3000
CMD [ "node", "dist/index.js" ]
