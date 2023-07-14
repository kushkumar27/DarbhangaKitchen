const mysqlDriver = require('mysql')
const DatabaseCredentials = require('./databaseCredentials')

const mysqlConnector = mysqlDriver.createConnection({
    host: DatabaseCredentials.HOSTNAME,
    user: DatabaseCredentials.USERNAME,
    password: DatabaseCredentials.PASSWORD,
    database: DatabaseCredentials.DATABASE_NAME
})

mysqlConnector.connect((err) => {
    if (err) {
        console.log("Failed to connect to database : " + DatabaseCredentials.DATABASE_NAME);
        throw err;
    }
    console.log("Successfully Connected with database : " + DatabaseCredentials.DATABASE_NAME);
});

module.exports = mysqlConnector;