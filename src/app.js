const express = require("express");
const routers = require("./routers");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routers);

const server = app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

server.on("error", (error) => {
  console.log("Error en servidor", error);
});
