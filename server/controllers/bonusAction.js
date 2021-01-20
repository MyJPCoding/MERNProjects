const mongoose = require("mongoose");
const BonusAction = mongoose.model("BonusAction");

module.exports = {
    create: (req, res) => {

        BonusAction.create(req.body)
            .then(bonusAction => res.json(bonusAction))
            .catch(err => res.status(400).json(err));
    },
    findAll: (req, res) => {
        BonusAction.find().sort({name: 1})
            .then(bonusAction => res.json(bonusAction))
            .catch(err => res.status(400).json(err));
    },
    findOne: (req, res) => {
         BonusAction.findOne({_id: req.params.id})
            .then(bonusAction => res.json(bonusAction))
            .catch(err => res.status(400).json(err));
    },
    update: (req, res) => {
        BonusAction.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true})
            .then(bonusAction => res.json(bonusAction))
            .catch(err => res.status(400).json(err));
    },
    delete: (req, res) => {
        BonusAction.deleteOne({_id: req.params.id})
            .then(bonusAction => res.json(bonusAction))
            .catch(err => res.status(400).json(err));
    }
}