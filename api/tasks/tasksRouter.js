const express = require("express");

const tasks = require("./tasks-model.js");

const router = express.Router();

router.get("/", (req, res, next) => {
    tasks.getTasks()
        .then(tasks => res.status(200).json(tasks))
        .catch(() => next({ code: 500, message: "Error retrieving tasks data" }));
})

module.exports = router;