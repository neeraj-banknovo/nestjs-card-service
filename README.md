<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://miro.medium.com/max/1200/1*Hbyl7XGOd1-o7RBQzyg_CA.png" width="520" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This is Graphql code-first approach.


## Setting config

```bash
Copy config
$ cp template.env .env
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Graphql Playground

Playground - (http://localhost:3000/api/graphql/app)

## Migrations

```bash
# create migration
$ npm run migration:create --name=<migration-name> 
(it will create a template migration file 
in '/src/app/database/migrations')

# run migration
$ npm run migration:run
(it will run all the new migrations)

```
