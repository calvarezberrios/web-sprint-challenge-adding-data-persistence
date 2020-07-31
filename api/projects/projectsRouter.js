const express = require("express");

const projects = require("./projects-model.js");
const server = require("../../server.js");
const dbConfig = require("../../data/db-config.js");

const router = express.Router();

router.get("/", (req, res, next) => {
    projects.find()
        .then(projects => res.status(200).json(projects))
        .catch(() => next({ code: 500, message: "Error retrieving projects" }));
});

router.get("/:id", (req, res, next) => {
    projects.findById(req.params.id)
        .then(project => {
            if(project) {
                res.status(200).json(project);
            } else {
                next({ code: 404, message: "Project ID not found" });
            }
        })
        .catch(() => next({ code: 500, message: "Error retrieving project data"}))
});

router.post("/:id/tasks", (req, res, next) => {
    const { id } = req.params;
    const newTask = req.body;
    newTask.project_id = id;

    if(!(newTask.description)) {
        next({ code: 400, message: "Please provide the task description." });
    }

    projects.findById(id)
        .then(project => {
            if(project) {
                projects.addTask(newTask)
                    .then(task => res.status(201).json(task))
                    .catch(() => next({ code: 500, message: "Error adding task data to project" }));
            } else {
                next({ code: 404, message: "Project ID not found" });
            }
        })
        .catch(() => next({ code: 500, message: "Error retrieving project data" }));
});

router.post("/", (req, res, next) => {
    const newProject = req.body;

    if(!newProject.name) {
        next({ code: 400, message: "Please provide a name for the project" });
    } else {
        projects.add(newProject)
            .then(project => res.status(201).json(project))
            .catch(() => next({ code: 500, message: "Error adding project to database" }));
    }
});

router.put("/:id", (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    
    if(!changes.name) {
        next({ code: 400, message: "Missing name for the project" });
    } else {
        projects.findById(id)
            .then(project => {
                if(project) {
                    projects.update(changes, id)
                    .then(updated => res.status(200).json(updated))
                    .catch(() => next({ code: 500, message: "Error updating project in database" }));
                } else {
                    next({ code: 404, message: "Project ID not found" });
                }
            })
            .catch(() => next({ code: 500, message: "Error retrieving project data" }));
    }
});

router.delete("/:id", (req, res, next) => {
    const { id } = req.params;

    projects.findById(id)
        .then(project => {
            if(project) {
                projects.remove(id)
                    .then(() => res.status(204).end())
                    .catch(() => next({ code: 500, message: "Error removing project data" }));
            } else {
                next({ code: 404, message: "Project ID not found" });
            }
        })
        .catch(() => next({ code: 500, message: "Error retrieving project data" }));
})


module.exports = router;