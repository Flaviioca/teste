# Instruções para uso do Docker

As instruções aqui são baseadas em [10 best practices to containerize Node.js web applications with Docker](https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/)

## Para criar o imagem para ambiente production ou stage

```bash
sudo docker build -f Dockerfile.prod -t ceua:prod .
sudo docker build -f Dockerfile.dev -t ceua:dev .
```

O arquivo `Dockerfile` é usado dentro da infraestrutura da UFPE, os arquivos `Dockerfile.prod` e `Dockerfile.dev` são usados em ambiente de desenvolvimento para confirmar o funcionamento do projeto.

## Para utilizar com o docker-compose

```bash
sudo docker-compose up app-prod -d # executa o ambiente de produção
sudo docker-compose up app-dev  -d # executa o ambiente de desenvolvimento
sudo docker-compose up postgres -d # executa somente o banco de dados
```

A opção `-d` é para que os serviços sejam executados em segundo plano (liberando o terminal para a execução de outros comandos).

```bash
sudo docker-compose down # encerra a execução dos serviços ativos
```
