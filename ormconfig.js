const { hostName, dataBaseName, password, userName } = require('./userDetails')

// const inProd = process.env.NODE_ENV
const inProd = true
const host = inProd ? 'ec2-54-243-44-102.compute-1.amazonaws.com' : hostName;
const database = inProd ? 'devhemnpqs7jqr' : dataBaseName;
const user = inProd ? 'atovecnpivswjq' : userName;
const passwordNow = inProd ? '51a46280f1e23d8e82ca8b03db59333cf604df69014275aa1207378f3d10d7a2' : password;


module.exports = {
  "type": "postgres",
  "host": host,
  "port": 5432,
  "username": user,
  "password": passwordNow,
  "database": database,
  "entities": [
    "dist/**/*.entity{.ts,.js}"
  ],
  "synchronize": true,
  "migrations": ["dist/typeorm/migration/**/*.js"],
  "cli": {
    "migrationsDir": "typeorm/migration"
  }
}