
// const inProd = process.env.NODE_ENV
const inProd = true
console.log(process.env)

// port: 5432,
// host: inProd ? 'ec2-54-243-44-102.compute-1.amazonaws.com' : hostName;
// database: inProd ? 'devhemnpqs7jqr' : dataBaseName;
// username: inProd ? 'atovecnpivswjq' : userName;
// password: inProd ? '51a46280f1e23d8e82ca8b03db59333cf604df69014275aa1207378f3d10d7a2' : password;
// }

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