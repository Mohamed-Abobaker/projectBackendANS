
const inProd = process.env.NODE_ENV
// const inProd = true
console.log(process.env)

const dbCreds = (() => {
  if (inProd) {
    return {
      url: process.env.DATABASE_URL
    }
  } else {
    const { hostName, dataBaseName, password, userName } = require('./userDetails')

    return {
      port: 5432,
      host: hostName,
      database: dataBaseName,
      username: userName,
      password
    }
  }
})()


module.exports = {
  "type": "postgres",
  ...dbCreds,
  "entities": [
    "dist/**/*.entity{.ts,.js}"
  ],
  "synchronize": true,
  "migrations": ["dist/typeorm/migration/**/*.js"],
  "cli": {
    "migrationsDir": "typeorm/migration"
  }
}