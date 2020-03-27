const pg = require('pg');

const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log("Postgres connected");
});

pool.on("error", (err) => {
    console.log("error connecting", err);
});
console.log('hello 1');

module.exports = pool;