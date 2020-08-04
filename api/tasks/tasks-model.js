const db = require("../../data/db-config.js");

module.exports = {
    getTasks
}

function getTasks() {
    return db("tasks")
            .join("projects", "projects.id", "tasks.project_id")
            .select("tasks.*", "projects.name as project_name", "projects.description as project_description")
            .orderBy("tasks.id");
}