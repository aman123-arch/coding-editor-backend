const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/run", (req, res) => {
  const { code, input } = req.body;

  // Save code to temp.py file
  fs.writeFileSync("temp.py", code);

  const process = exec("python temp.py", (error, stdout, stderr) => {
    if (error) {
      return res.send({ output: stderr });
    }
    return res.send({ output: stdout });
  });

  if (input) {
    process.stdin.write(input);
    process.stdin.end();
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
});
