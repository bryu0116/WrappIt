// Setting up Express App
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
let db = require("./models");
// Requiring our models for syncing

// if (process.env.JAWSDB_URL) {
//   console.log("There is a JAWS DB URL");
//   db = new Sequelize(process.env.JAWSDB_URL);
// } else {
//   db = require("./models").sequelize;
// }
// Serve static content from the "public" dir.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// // Import routes and give the server access to them.
require("./controllers/wrappit_controller.js")(app);

// app.use(routes);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});