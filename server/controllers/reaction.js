const mongoose = require("mongoose");
const Reaction = mongoose.model("Reaction");

module.exports = {
    create: (req, res) => {

        Reaction.create(req.body)
            .then(reaction => res.json(reaction))
            .catch(err => res.status(400).json(err));
    },
    findAll: (req, res) => {
        Reaction.find().sort({name: 1})
            .then(reaction => res.json(reaction))
            .catch(err => res.status(400).json(err));
    },
    findOne: (req, res) => {
         Reaction.findOne({_id: req.params.id})
            .then(reaction => res.json(reaction))
            .catch(err => res.status(400).json(err));
    },
    update: (req, res) => {
        Reaction.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true})
            .then(reaction => res.json(reaction))
            .catch(err => res.status(400).json(err));
    },
    delete: (req, res) => {
        Reaction.deleteOne({_id: req.params.id})
            .then(reaction => res.json(reaction))
            .catch(err => res.status(400).json(err));
    }
}