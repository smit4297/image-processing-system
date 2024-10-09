FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3000

CMD npm run migrate && npm start