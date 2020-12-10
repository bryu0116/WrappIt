const express = require("express");
const path = require("path");
const router = express.Router();

// Import the model (wrappit.js) to use its database functions.
const db = require("../models/index.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../index.html"));
});

router.get("/api/users", function(req, res) {
  db.User.findAll({}).then(function(users) {
    res.json(users);
  });
});

router.post("/api/user", function (req, res) {
  console.log(req.body);
  db.User.create({
    username: req.body.username,
    email: req.body.email
  }).then(function(dbUser) {
    res.json(dbUser);
  });
});

router.post("/api/gift", function(req, res) {
  console.log(req.body);
  db.Gift.create({
    gift: req.body.gift,
    gift_desc: req.body.gift_desc,
    UserId: req.body.UserId
  }).then(function(dbGift) {
      res.json(dbGift);
  }); 
});

// router.put("/api/burger/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   burger.updateOne({
//     devoured: req.body.devoured
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// Export routes for server.js to use.
module.exports = router;