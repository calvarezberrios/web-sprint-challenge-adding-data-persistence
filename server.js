const express = require("express");
const helmet = require("helmet");

const apiRouter = require("./api/apiRouter.js");

const server = express();
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => res.send("API running successfully!"));

server.use("/api", apiRouter);

server.use((req, res, next) => next({ code: 404, message: "URL not found"}));

server.use((err, req, res, next) => {
    res.status(err.code).json(err);
});

module.exports = server;