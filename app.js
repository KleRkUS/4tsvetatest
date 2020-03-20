const express = require('express'),
      app = express(),
      path = require("path"),
      port = 8080,
      index = require('./app/routes/index.js');

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use("/", index);

console.log("App is running on port "+port);

app.listen(port);