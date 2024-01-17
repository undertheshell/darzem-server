const Pool = require("pg").Pool;
require('dotenv').config();

const booksReviewsSplitSymbol = process.env.BOOKS_REVIEWS_SPLIT_SYMBOL;
const serverPort = process.env.SERVER_PORT;
const jwtSecret = process.env.JWT_SECRET;
const encryptionSalt = 12;


// const pool = new Pool({
//   connectionString: process.env.CONNECTION_SRTING,
//   ssl: {
//     rejectUnauthorized: false
// }
// });

const pool = new Pool({
  user: "aboba",
  host: "localhost",
  password: "228228",
  port: 5432,
  database: "postgres"
});

module.exports = {
    jwtSecret,
    encryptionSalt,
    pool,
    serverPort,
    booksReviewsSplitSymbol
};