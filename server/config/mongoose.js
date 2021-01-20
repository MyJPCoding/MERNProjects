const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/dnd-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
.then(() => console.log("connected to db!"))
.catch((err) => console.log("failed to connect", err));

require("../models/character");
require("../models/action");
require("../models/bonusAction");
require("../models/reaction");