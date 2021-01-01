# rc.js
rc.js is a remote controller framework.

### Usage
```javascript
const Remocon = require("rcjs");

const remocon = new Remocon();

remocon.addButton("event id", "button title", function() {
  console.log("do something");
});

remocon.app.listen(3000);
```

### License
MIT License
