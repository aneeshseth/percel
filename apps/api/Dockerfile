FROM ubuntu:focal

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

RUN apt-get install git -y

WORKDIR /home/app

COPY script.sh script.sh
COPY index.ts index.ts
COPY package*.json .
COPY tsconfig.json tsconfig.json

RUN npm install
RUN npm install typescript
RUN npx tsc -b

RUN chmod +x script.sh
RUN chmod +x index.ts

ENTRYPOINT [ "/home/app/script.sh" ]