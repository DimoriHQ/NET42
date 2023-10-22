FROM --platform=linux/arm64 node:18

WORKDIR /app

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-*.yaml .
COPY node_modules .

COPY packages/server/package.json packages/server/package.json
COPY packages/server/dist packages/server/dist
COPY packages/server/node_modules packages/server/node_modules

RUN pnpm install

CMD [ "node","--trace-warnings", "--es-module-specifier-resolution=node", "/app/packages/server/dist/main.js" ]
