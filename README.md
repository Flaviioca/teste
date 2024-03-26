<h1 align="center">
  <a href="https://ceua-staging.ufpe.br/">Projeto da Comissão de Ética no Uso de Animais (CEUA)</a>
</h1>


<p align="center">
  <a href="#memo-requisitos">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-como-usar">Como usar</a>
</p>

## :memo: Requisitos

| Ferramenta                                         | Versão  | Descrição                                   |
| -------------------------------------------------- | ------- | ------------------------------------------- |
| [NodeJS](https://nodejs.org/en/)                   | 14.16.0 | Ambiente de execução Javascript server-side |
| [NPM](https://nodejs.org/en/download/)             | ^8.1.0  | Gerenciador de pacotes JS                   |
| [Git](https://git-scm.com)                         | -       | Controle de versões                         |
| [PostgreSQL](https://www.postgresql.org/)          | -       | Sistema de gerenciamento de banco de dados  |
| [Docker](https://www.docker.com/)                  | -       | Motor de Container                          |
| [Docker-compose](https://docs.docker.com/compose/) | -       | Orquestrador de Continers Docker            |

## :rocket: Tecnologias

Este projeto está sendo desenvolvido pela [Superintendência de Tecnologia da Informação - STI UFPE](https://www.ufpe.br/sti) com as seguintes tecnologias:

- Linguagem e ambiente: [Node.js](https://nodejs.org/)
- Motor de modelos (template engine) para o front-end: [EJS](https://ejs.co/)
- Object-Relation-Mapper (ORM): [Sequelize](https://sequelize.org/)
- Banco de dados: [PostgreSQL](https://www.postgresql.org/)
- Estilização CSS: [Tailwind CSS](https://tailwindcss.com/)
- Tailwind CSS Components: [daisyUI](https://daisyui.com/)
- Framework reativo: [Alpine.js](https://alpinejs.dev/)

## :information_source: Como usar

```bash
# Clonar este repositório
$ git clone https://gitlab.ufpe.br/stilabs/projeto-ceua

# Ir para o repositório
$ cd projeto-ceua

# Criar o arquivo .env com os valores adequados ao ambiente. APP_KEY precisa ter algum conteúdo.
$ cp .env.example .env

# Instalar as dependências
$ npm install

# Executar as migrations e Seeders (npx sequelize-cli ...)
$ sequelize db:migrate && sequelize db:seed:all

# Executar a aplicação em ambiente de desenvolvimento
$ npm run start

# Executar a aplicação com o nodemon (as configurações estão no arquivo nodemon.json)
$ nodemon
```

Endereço local: (http://localhost:3000)

<hr />

### Sequelize CLI

Para gerenciar os models, migrations e seeders é recomendado o uso do sequelize-cli

```bash
# Instalar globalmente
$ npm install -g sequelize-cli
```

Algumas instruções (comandos) uteis com o sequelize-cli estão presentes em [SEQUELIZE-CLI.md](SEQUELIZE-CLI.md)

### Docker & Docker-compose

O projeto possui um docker-compose.yml para o banco de dados, ambiente de desenvolvimento e ambiente de produção. Para utilizar basta ter o docker-compose instalado e seguir os seguintes comandos:

```bash
# Ativar o banco de dados pelo docker-compose
$ sudo docker-compose up -d
# Desativar o banco de dados pelo docker-compose
$ sudo docker-compose down
```

Mais informações podem ser encontradas no arquivo [DOCKER.md](DOCKER.md)

### Tailwind CSS

O projeto utiliza o Tailwind CSS para estilização. Ao utilizar alguma classe do tailwind nos arquivos `.ejs` dentro de `resources/views`

```bash
# Modo watch do tailwind
$ npm run watch-css
```

# Instruções para uso do Sequelize-cli

### Ver status das migrations

```
$ sequelize db:migrate:status
```

### Criar migration

```
$ sequelize migration:create --name name_of_your_migration
```

### Criar um model + migration

```
$ sequelize model:generate --name User --attributes username:string,password:string
```

### Executar todas as migrations

```
$ sequelize db:migrate
```

<hr />

### Criar Seeder

```
$ sequelize seed:generate --name defaultUsers
```

### Executar somente um seeder

```
$ sequelize db:seed --seed NomeCompletoDoArquivo.js
```

<hr />

## Referências

As instruções aqui são baseadas em

- [Sequelize CLI - NPM](https://www.npmjs.com/package/sequelize-cli)
- [Sequelize Migrations](https://sequelize.org/docs/v6/other-topics/migrations/)
- [Sequelize CLI Github](https://github.com/sequelize/cli)
- [Node, Express, Sequelize, and PostgreSQL Association Example](https://www.djamware.com/post/5bb1f05280aca74669894417/node-express-sequelize-and-postgresql-association-example)
- [Migrations e Seeders no SequelizeJS](https://medium.com/@stroklabs/migrations-e-seeders-no-sequelizejs-67ba3571ed0e)
