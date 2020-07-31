const db = require("../../data/db-config.js");

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    findProjects
}

function find() {
    return db("resources");
}

function findById(id) {
    return db("resources").where({ id: id }).first();
}

function add(resource) {
    return db("resources")
            .insert(resource)
            .then(ids => {
                return db("resources").where({ id: ids[0] }).first();
            });
}

function update(changes, id) {
    return db("resources")
            .where({ id: id })
            .update(changes)
            .then(count => {
                return db("resources").where({ id: id }).first();
            })
}

function remove(id) {
    return db("resources")
            .where({ id: id })
            .del();
}

function findProjects(id) {
    return db("project_resources as pr")
            .join("projects", "projects.id", "pr.project_id")
            .select("projects.*")
            .where({ resource_id: id })
            .orderBy("projects.id");

}