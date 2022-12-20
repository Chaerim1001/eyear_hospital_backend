FROM node:16.15.1
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# 아이어 어플리케이션을 도커 컨테이너로 만들기 위한 파일