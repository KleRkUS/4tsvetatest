const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {

  var spawn = require(“child_process”).spawn;
  var process = spawn(‘python’, [“../commands/imageProcess.py”]);
  
  process.stdout.on(‘data’, function (data) {
    res.send(data.toString());
  });

});

module.exports = router;