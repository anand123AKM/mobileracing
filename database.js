const mysql2 = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");

var connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "highscore",
});

connection.connect();
app.use(cors());
app.use(bodyParser.json());

app.get("/bestscore", (req, res) => {
  connection.query(
    "SELECT score FROM score WHERE id = 1",
    (error, results, fields) => {
      if (error) {
        console.error("Error retrieving best score:", error);
        res.status(500).json({ error: "Failed to retrieve best score" });
        return;
      }
      const bestScore = results.length > 0 ? results[0].score : 0;
      res.json({ bestScore });
    }
  );
});

app.post("/bestscore", (req, res) => {
  const { score } = req.body;
  connection.query(
    "SELECT score FROM score WHERE id = 1",
    (error, results, fields) => {
      if (error) {
        console.error("Error retrieving best score:", error);
        res.status(500).json({ error: "Failed to retrieve best score" });
        return;
      }
      const currentScore = results[0].score;
      if (score > currentScore) {
        connection.query(
          "UPDATE score SET score = ? WHERE id = 1",
          [score],
          (error, results, fields) => {
            if (error) {
              console.error("Error updating best score:", error);
              res.status(500).json({ error: "Failed to update best score" });
              return;
            }
            console.log("Best score updated successfully");
            res.json({ message: "Best score updated successfully" });
          }
        );
      } else {
        res.json({
          message: "Current score is not higher than the best score",
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
