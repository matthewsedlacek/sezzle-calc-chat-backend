const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/messages", db.getMessages);

app.post("/messages", db.createMessage);

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}.`);
});

// http.listen(PORT, () => {
//   console.log("Listening on" + PORT);
// });
