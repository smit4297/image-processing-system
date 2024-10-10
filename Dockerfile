FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3000

# Add wait-for-it script
ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Use wait-for-it to ensure DB is ready before running migrations and starting the app
CMD /usr/wait-for-it.sh db:5432 -- npm run migrate && npm start