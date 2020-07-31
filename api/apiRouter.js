const express = require("express");
const server = require("../server");

const projectsRouter = require("./projects/projectsRouter.js");

const router = express.Router();

router.use("/projects", projectsRouter);

module.exports = router;