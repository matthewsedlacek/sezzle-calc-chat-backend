// const Pool = require("pg").Pool;
// const pool = new Pool({
//     // dbname="d6hadta3u0um4g",
//     host="ec2-54-208-233-243.compute-1.amazonaws.com",
//     port=5432,
//     user="ynxfswvevbsccw",
//     password="c92dc1792beb6c25c822e0211f7689af8f641965691ae720b46194b6e9531030",
//     // sslmode=require
// });

const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();
// client.query(
//   "SELECT table_schema,table_name FROM information_schema.tables;",
//   (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row));
//     }
//     client.end();
//   }
// );

const getMessages = (request, response) => {
  client.query("SELECT * FROM messages ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createMessage = (request, response) => {
  const { text, username } = request.body;

  client.query(
    "INSERT INTO messages (text, username) VALUES ($1, $2)",
    [text, username],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`);
    }
  );
};

module.exports = {
  getMessages,
  createMessage,
};
