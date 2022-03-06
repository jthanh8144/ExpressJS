const { Client } = require('pg');

const connectObj = {
    user: 'lagspzkjufqgqy',
    host: 'ec2-34-231-183-74.compute-1.amazonaws.com',
    database: 'dd3ja3cj1bflab',
    password: '72fdf2b783eda912c460dfd4d8c61c759be9ffb435081f8d8165694aa402645b',
    port: 5432,
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
