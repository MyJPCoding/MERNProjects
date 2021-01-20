const mongoose = require("mongoose");

const ActionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [1, "The action must have a name."]
    },
    description: {
        type: String,
        required: true,
        minlength: [1, "Your action must have a description."]
    },
    spellLevel: {
        type: Number,
        required: false,
        min: [-1, "The lowest spell slot is 0 for cantrip."],
        max: [9, "The highest spell slow available is 9."]
    },
    uses_psi: {
        type: Boolean,
        required: true
    },
    min_psi_cost: {
        type: Number,
        required: true,
        min: [0, "The lowest psi cost is 0 for cantrip."],
        max: [11, "The highest psi cost available is 11."]
    },
    max_psi_cost: {
        type: Number,
        required: true,
        min: [0, "The lowest psi cost is 0 for cantrip."],
        max: [11, "The highest psi cost available is 11."]
    }
}, {timestamps: true});

mongoose.model("Action", ActionSchema);