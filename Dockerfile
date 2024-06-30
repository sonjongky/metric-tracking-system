FROM node:18.17.1-buster-slim AS base


FROM base AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    else yarn install; \
    fi
COPY . .
RUN yarn build