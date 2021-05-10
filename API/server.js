const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

const db = require("./app/models");

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });



app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
res.json({ message: "Test GCTA" });
});

require("./app/routes/user.routes")(app);
require("./app/routes/coach.routes")(app);
// require("./app/routes/jeux.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`serveur à l'écoute : http://localhost:${PORT} .`);
});


