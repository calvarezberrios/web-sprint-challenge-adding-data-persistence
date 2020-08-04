const express = require("express");

const resources = require("./resources-model.js");

const router = express.Router();

router.get("/", (req, res, next) => {
    resources.find()
        .then(resources => res.status(200).json(resources))
        .catch(() => next({ code: 500, message: "Error retrieving resources from database" }));
});

router.get("/:id", (req, res, next) => {
    const { id } = req.params;

    resources.findById(id)
        .then(resource => {
            if(resource) {
                res.status(200).json(resource);
            } else {
                next({ code: 404, message: "Resource ID not found" });
            }
        })
        .catch(() => next({ code: 500, message: "Error retrieving resource from database" }));
});

router.get("/:id/projects", (req, res, next) => {
    const { id } = req.params;
    
    resources.findById(id)
        .then(resource => {
            if(resource) {
                resources.findProjects(id)
                    .then(projects => res.status(200).json(projects))
                    .catch(() => next({ code: 500, message: "Error retrieving projects" }));
            } else {
                next({ code: 404, message: "Resource ID not found" });
            }
        })
        .catch(() => next({ code: 500, message: "Error retrieving resource from database" }));
    
});

router.post("/", (req, res, next) => {
    const newResource = req.body;

    if(!newResource.name) {
        next({ code: 400, message: "Please provide a name for the resource" });
    } else {
        resources.add(newResource)
            .then(resource => res.status(201).json(resource))
            .catch(() => next({ code: 500, message: "Error creating resource on database" }));
    }
});

router.put("/:id", (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    if(!changes.name) {
        next({ code: 400, message: "Please provide a name for the resource" });
    } else {

        resources.findById(id)
            .then(resource => {
                if(resource) {
                    resources.update(changes, id)
                        .then(resource => res.status(200).json(resource))
                        .catch(() => next({ code: 500, message: "Error updating resource on database" }));
                } else {
                    next({ code: 404, message: "Resource ID not found" });
                }
            })
            .catch(() => next({ code: 500, message: "Error retrieving resource from database" }));

        
    }
});

router.delete("/:id", (req, res, next) => {
    const { id } = req.params;

    resources.findById(id)
        .then(resource => {
            if(resource) {
                resources.remove(id)
                    .then(() => res.status(204).end())
                    .catch(() => next({ code: 500, message: "Error removing resource from database" }));
            } else {
                next({ code: 404, message: "Resource ID not found" });
            }
        })
        .catch(() => next({ code: 500, message: "Error retrieving resource from database" }));

});

module.exports = router;