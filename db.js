const oracledb = require('oracledb');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING
};

async function initialize() {
    try {
        await oracledb.createPool(dbConfig);
        console.log("Oracle DB connection pool created successfully");
    } catch (err) {
        console.error("Failed to create Oracle DB connection pool:", err);
    }
}

async function close() {
    try {
        await oracledb.getPool().close();
        console.log("Oracle DB connection pool closed");
    } catch (err) {
        console.error("Error closing Oracle DB connection pool:", err);
    }
}

module.exports = { initialize, close, oracledb };