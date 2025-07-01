FROM mcr.microsoft.com/playwright:v1.53.1-jammy

WORKDIR /work

COPY . .

RUN npm ci
