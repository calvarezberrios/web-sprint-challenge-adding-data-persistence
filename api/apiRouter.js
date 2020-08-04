const express = require("express");
const server = require("../server");

const projectsRouter = require("./projects/projectsRouter.js");
const resourcesRouter = require("./resources/resourcesRouter.js");
const tasksRouter = require("./tasks/tasksRouter.js")

const router = express.Router();

router.use("/projects", projectsRouter);
router.use("/resources", resourcesRouter);
router.use("/tasks", tasksRouter);


module.exports = router;