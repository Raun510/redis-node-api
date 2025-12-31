FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .



HEALTHCHECK --interval=30s --timeout=10s \
CMD wget -qO- http://localhost:5000/api || exit 1



EXPOSE 5000
CMD ["npm", "start"]
