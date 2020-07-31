const express = require("express");
const server = require("../server");

const projectsRouter = require("./projects/projectsRouter.js");
const resourcesRouter = require("./resources/resourcesRouter.js");

const router = express.Router();

router.use("/projects", projectsRouter);
router.use("/resources", resourcesRouter);


module.exports = router;