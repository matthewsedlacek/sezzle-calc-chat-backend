const Pool = require("pg").Pool;
const pool = new Pool({
    // dbname="d6hadta3u0um4g", 
    host="ec2-54-208-233-243.compute-1.amazonaws.com",
    port=5432,
    user="ynxfswvevbsccw", 
    password="c92dc1792beb6c25c822e0211f7689af8f641965691ae720b46194b6e9531030", 
    // sslmode=require
});

const getMessages = (request, response) => {
  pool.query("SELECT * FROM messages ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createMessage = (request, response) => {
  const { text, username } = request.body;

  pool.query(
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
