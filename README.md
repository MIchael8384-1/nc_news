# **READ ME**

## **NCNEWS Round**

---

### **About**
This repository contains the code for a RESTful API news website. It was created during my time at Northcoders, 
for my first major sprint 'Northcoders News' back-end. I database was created using PSQL with interactions 
handled using Knex. 

Full TDD was used during the seeding of the database, making use of both Mocha and Chai.For the endpoints, testing was 
carried out using SuperTest. 

---

### **Prerequisites**
**Dependencies:**

Knex 0.17.6

PostgreSQL 11

Node Postgres 7.11.0


**Dev Dependencies:**

Express 4.17.1

Chai 4.2.0

Chai-sorted 0.2.0

Mocha 6.1.4

Supertest 4.0.2

Nodemon 1.19.1


---

### **Set-Up** 

**1.** Fork then clone the repository onto your local machine. 

**2.** Install the above dependencies using the `npm install` command followed by the dependency name. 

**3.** Create a file in the root directory and name this 'knexfile.js'. Copy the following code into the file:

```
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfigs = {
  production: { connection: `${DB_URL}?ssl=true` },
  development: { connection: { database: "ncnews" } },
  test: { connection: { database: "ncnews_test" } }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
```

*Please note: if you are using a Linux system, you will need to include your PostgreSQL username and password within this file.*

*Don't forget to .gitignore this file if you intend on re-using this repository!* 


**4.** To set-up the required databases, run the following commands:

```
$ npm run setup-dbs

$ npm run seed
```
---

### **Project Links**

Front-End:

- [Netlify - NCNews Round](https://ncnewsfend-michaells.netlify.com/)
- [Git repository](https://github.com/MIchael8384-1/ncnews-FEND)

Back-end:

- [Heroku - ncnew ](https://backend-ncnews.herokuapp.com/api)
- [Git repository](https://github.com/MIchael8384-1/nc_news)

---



### **Author** 

Michael Lynch Smith 





