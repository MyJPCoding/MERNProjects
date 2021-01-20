const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [1, "You must have a name for your character."]
    },
    health:{
        type: Number,
        required: true,
        min: [1, "The lowest health available is 1."],
    },
    level: {
        type: Number,
        required: true,
        min: [1, "The lowest level available is 1."],
        max: [20, "The highest level your character can be is 20."]
    },
    current_Psi: {
        type: Number,
        required: true,
        min: [0, "You cannot have below 0 psi."]
    },
    psi_Per_Turn: {
        type: Number,
        required: true,
        min: [0, "You cannot have below 0 psi."]
    },
    channelled_Psi:{
        type: Number,
        required: true,
    },
    action: {
        type: Boolean,
        required: true,
    },
    bonusAction: {
        type: Boolean,
        required: true,
    },
    reaction: {
        type: Boolean,
        required: true,
    },
    spellSlots: {
        type:Array,
        required: true,
    }
}, {timestamps: true});

mongoose.model("Character", CharacterSchema);