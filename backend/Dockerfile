FROM node:18

WORKDIR /backend
COPY ./ ./
RUN npm ci
RUN npm run build

WORKDIR /backend/build
EXPOSE 8080
CMD ["index.js"]
