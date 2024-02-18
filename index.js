const RemoconModuleType = {
  BUTTON: "button",
}

function randomString(n) {
  var s="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  return Array.from(Array(n)).map(()=>s[Math.floor(Math.random()*s.length)]).join('')
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

function split(arr) {
  let result = [];
  for (let i in arr) {
    if (i % 3 == 0) {
      result.push([]);
    }
    result[result.length - 1].push(arr[i]);
  }
  return result;
}

function findModule(modules, id) {
  return modules.find(element => element.id == id);
}
function Remocon() {
  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set("view engine", "ejs");
  let modules = [];
  app.get("/", function(req, res) {
    res.render(__dirname + "/views/index.ejs", {
      modules: split(modules),
    });
  })
  app.post("/event", function(req, res) {
    findModule(modules, req.body.id).callback();
    res.status(200).send("");
  });
  this.addButton = function(title, callback) {
    let id = randomString(16);
    modules.push(new Button(id, title, callback));
  }
  this.app = app;
  this.start = function(port) {
    return this.app.listen(port);
  }
}

module.exports = Remocon;
