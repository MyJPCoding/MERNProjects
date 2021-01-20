const mongoose = require("mongoose");
const Action = mongoose.model("Action");

module.exports = {
    create: (req, res) => {

        Action.create(req.body)
            .then(action => res.json(action))
            .catch(err => res.status(400).json(err));
    },
    findAll: (req, res) => {
        Action.find().sort({name: 1})
            .then(action => res.json(action))
            .catch(err => res.status(400).json(err));
    },
    findOne: (req, res) => {
         Action.findOne({_id: req.params.id})
            .then(action => res.json(action))
            .catch(err => res.status(400).json(err));
    },
    update: (req, res) => {
        Action.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true})
            .then(action => res.json(action))
            .catch(err => res.status(400).json(err));
    },
    delete: (req, res) => {
        Action.deleteOne({_id: req.params.id})
            .then(action => res.json(action))
            .catch(err => res.status(400).json(err));
    }
}