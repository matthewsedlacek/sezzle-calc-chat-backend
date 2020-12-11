const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
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
