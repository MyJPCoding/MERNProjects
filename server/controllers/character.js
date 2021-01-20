const mongoose = require("mongoose");
const Character = mongoose.model("Character");

module.exports = {
    create: (req, res) => {

        Character.create(req.body)
            .then(character => res.json(character))
            .catch(err => res.status(400).json(err));
    },
    findAll: (req, res) => {
        Character.find().sort({name: 1})
            .then(character => res.json(character))
            .catch(err => res.status(400).json(err));
    },
    findOne: (req, res) => {
         Character.findOne({_id: req.params.id})
            .then(character => res.json(character))
            .catch(err => res.status(400).json(err));
    },
    update: (req, res) => {
        Character.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true})
            .then(character => res.json(character))
            .catch(err => res.status(400).json(err));
    },
    delete: (req, res) => {
        Character.deleteOne({_id: req.params.id})
            .then(character => res.json(character))
            .catch(err => res.status(400).json(err));
    }
}