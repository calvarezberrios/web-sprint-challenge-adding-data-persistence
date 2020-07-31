const db = require("../../data/db-config.js");

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    addTask
}

function find() {
    return db("projects");
}

function findById(id) {
    return db("projects").where({ id: id }).first();
}

function add(project) {
    return db("projects")
            .insert(project)
            .then(ids => {
                return db("projects").where({ id: ids[0] }).first();
            });
}

function update(changes, id) {
    return db("projects")
            .where({ id: id })
            .update(changes)
            .then(count => {
                return db("projects").where({ id: id }).first();
            });
}

function remove(id) {
    return db("projects")
            .where({ id: id })
            .del();
}

function addTask(task) {
    return db("tasks")
            .insert(task)
            .then(ids => {
                return db("tasks")
                        .join("projects", "projects.id", "tasks.project_id")
                        .select("tasks.id", "tasks.description", "tasks.notes", "tasks.completed", "projects.name", "projects.description", "projects.completed")
                        .where({ id: ids[0] }).first();
            })
}