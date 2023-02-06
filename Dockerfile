FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

RUN --mount=type=secret,id=JWT_SECRET \
    --mount=type=secret,id=DATABASE_URL \
    --mount=type=secret,id=AWS_REGION \
    --mount=type=secret,id=AWS_ACCESS_KEY_ID \
    --mount=type=secret,id=AWS_SECRET_ACCESS_KEY \
    --mount=type=secret,id=AWS_BUCKET_NAME \
    --mount=type=secret,id=AWS_STATIC_URL \
    export JWT_SECRET=$(cat /run/secrets/JWT_SECRET) && \
    export DATABASE_URL=$(cat /run/secrets/DATABASE_URL) && \
    export AWS_REGION=$(cat /run/secrets/AWS_REGION) && \
    export AWS_ACCESS_KEY_ID=$(cat /run/secrets/AWS_ACCESS_KEY_ID) && \
    export AWS_SECRET_ACCESS_KEY=$(cat /run/secrets/AWS_SECRET_ACCESS_KEY) && \
    export AWS_BUCKET_NAME=$(cat /run/secrets/AWS_BUCKET_NAME) && \
    export AWS_STATIC_URL=$(cat /run/secrets/AWS_STATIC_URL) && \
EXPOSE 3000
CMD [ "npm", "start" ]