FROM node:14.17.3-alpine3.12 AS builder
WORKDIR /app
COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]
COPY ["src", "./src"]

ENV NODE_ENV=development
RUN npm ci && \
    npm run build && \
    rm -rf node_modules

ENV NODE_ENV=production
RUN npm ci

FROM node:14.17.3-alpine3.12
ENV NODE_ENV=production
RUN rm -rf /usr/local/lib/node_modules/ /usr/local/bin/npm /usr/local/bin/npx
COPY --from=builder ["/app/package.json", "/app/package-lock.json", "./app/"]
COPY --from=builder ["/app/dist", "./app/dist"]
COPY --from=builder ["/app/node_modules", "./app/node_modules"]
EXPOSE 3000
USER node
CMD [ "node", "./app/dist/index.js" ]
