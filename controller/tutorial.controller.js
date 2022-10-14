const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Tutorial.create(tutorial).then((data) => {
        res.send(data);
    }).catch((err) => {
        message: err.message || "Some error occured while creating the tutorial"
    })

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.body.title;
    const condition = title ? {title: {[Op.like]: `% ${title} % `}} : null;
    Tutorial.findAll({where: condition}).then((data) => {
        console.log(data);
        res.json(data)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the tutorial"
        })
    })
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.body.id;
    Tutorial.findByPk(id).then((data) => {
        if (data) {
            res.send(data);
        } else {
            res.status(400).send({
                message: `Cannot find the tutorial with id = ${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the tutorial"
        });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Tutorial.update(req.body, {
        where: {id: id}
    }).then((data) => {
        if (data) {
            res.send(data);
        } else {
            res.status(400).send({
                message: `Cannot update the tutorial with id = ${id}`
            });
        }
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.destroy({
        where: {id: id}
    }).then((data) => {
        if (data == 1) {
            res.send({
                message: `Tutorial deleted successfully`
            });
        } else {
            res.send({
                message: `Unable to delete the tutorial with id `
            });
        }
    });

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {}, truncate: false
    }).then(nums => {
        res.send({message: `Tutorial deleted successfully`});
    }).catch((err) => {
        res.send({
            message: `Unable to delete the tutorial with id `
        });
    })
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({where: {published: "true"}})
        .then((data) => {
            res.send(data);
        }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials"
        })
    })

};