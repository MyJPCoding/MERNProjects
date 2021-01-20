const character = require("../controllers/character");
const action = require("../controllers/action");
const bonusAction = require("../controllers/bonusAction");
const reaction = require("../controllers/reaction");


module.exports = (app) => {
    app.get("/character", character.findAll);
    app.post("/character", character.create);
    app.get("/character/:id", character.findOne);
    app.delete("/character/:id", character.delete);
    app.put("/character/:id", character.update);

    app.get("/action", action.findAll);
    app.post("/action", action.create);
    app.get("/action/:id", action.findOne);
    app.delete("/action/:id", action.delete);
    app.put("/action/:id", action.update);

    app.get("/bonusAction", bonusAction.findAll);
    app.post("/bonusAction", bonusAction.create);
    app.get("/bonusAction/:id", bonusAction.findOne);
    app.delete("/bonusAction/:id", bonusAction.delete);
    app.put("/bonusAction/:id", bonusAction.update);

    app.get("/reaction", reaction.findAll);
    app.post("/reaction", reaction.create);
    app.get("/reaction/:id", reaction.findOne);
    app.delete("/reaction/:id", reaction.delete);
    app.put("/reaction/:id", reaction.update);
}