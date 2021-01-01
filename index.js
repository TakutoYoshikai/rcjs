const RemoconModuleType = {
  BUTTON: "button",
}
class RemoconModule {
  constructor(id, type) {
    this.id = id;
    this.type = type;
  }
}

class Button extends RemoconModule {
  constructor(id, title, callback) {
    super(id, RemoconModuleType.BUTTON);
    this.title = title;
    this.callback = callback;
  }
}
function Remocon() {
  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set("view engine", "ejs");
  let modules = {};
  app.get("/", function(req, res) {
    res.render(__dirname + "/index.ejs", {
      modules: modules
    });
  })
  app.post("/event", function(req, res) {
    modules[req.body.id].callback();
    res.status(200).send("");
  });
  this.addButton = function(id, title, callback) {
    modules[id] = new Button(id, title, callback);
  }
  this.app = app;
}

module.exports = Remocon;
