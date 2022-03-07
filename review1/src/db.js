const { Client } = require('pg');

const obj = require('./configdb.json');

const connectObj = {
    ...obj,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
}

const connect = () => {
    const client = new Client(connectObj);
    client.connect();
    return client;
}

module.exports = { connect }
