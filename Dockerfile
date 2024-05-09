FROM docker

WORKDIR /app

COPY compose.yml .

CMD [ "docker-compose", "up", "-d"]