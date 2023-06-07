const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log("Requisição feita");
  response.send("i");
});
app.listen(3333, () => {
  console.log("servidor");
});
