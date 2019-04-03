# [Connecting NodeJs & PostgreSQL](https://github.com/dannibla/nodejs-postgresql)

Learn how to connect PostgreSQL with NodeJs, While you are using PostgreSQL as database and NodeJs as backend, you need PostgreSQL database packages to connect with nodejs. There are various packages available but most popular and well documented is node-postgres [pg](https://node-postgres.com/). Let’s start.

## What's needed

- Make sure you have [postgresql](https://www.postgresql.org/download/) installed on machine and [pgAdmin](https://www.pgadmin.org/download/) - postgresql management tool
- Make sure you have [node.js](https://nodejs.org/en/download/) installed

## Folder Structure

Within the download you'll find the following directories and files:
```
Connecting NodeJs & PostgreSQL
.
├──── app.js
├──── package.json
├── package-lock.json
├── .gitattributes
├── .gitignore
├── LICENSE
└── README.md
```
## Database Connections - PostgreSQL

Create Database and use the credentials at `connectionStrings`.

```
const { Client } = require('pg');
var connectionString = "postgres://postgres:postgres@localhost:5432/database";

const client = new Client({
    connectionString: connectionString
});
```

## Getting started

- Download the project’s zip
- Create table & insert some default value in PostgreSQL

```
CREATE TABLE Employee(
	id int not null,
	name text not null,
	rollnumber int not null
);

INSERT INTO Employee values(1,'John',1001);

```

- Type `npm install` in terminal/console in the source folder where `package.json` is located
- Type `node app.js` in terminal/console in the source folder where `app.js` is located
- server started on port 4000. (http://localhost:4000/) in default browser

## Brief Documented

Documented on [medium](https://link.medium.com/Itzt6BDbAV)

## Help on Executing Queries

Documented is available node-postgres(Doc) [pg](https://node-postgres.com/features/queries)

## Copyright and License
Copyright 2019 Connecting NodeJs & PostgreSQL, released under the MIT License.
