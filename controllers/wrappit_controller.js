const express = require("express");
const path = require("path");
const router = express.Router();

// Import the model (index.js) to use its database functions.
const db = require("../models/index.js");

// Create all our routes and set up logic within those routes where required.

// GET routes
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/api/users", function(req, res) {
  db.User.findAll({}).then(function(users) {
    res.json(users);
  });
});

router.get("/api/gifts/:username", function(req, res) {
  let query = {};
  if (req.params) {
    query.username = req.params.username;
  }
  db.Gift.findAll({
    include: {
      model: db.User,
      where: {
        username: query.username
      },
      require: true
    }
  }).then(function(data) {
    res.render("results", {Gifts: data});
  });
});


// POST routes
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
    author: req.body.author,
    gift_desc: req.body.gift_desc,
    gift_url: req.body.gift_url,
    image_url: req.body.img_url,
    UserId: req.body.UserId
  }).then(function(dbGift) {
      res.json(dbGift);
  }); 
});

// DELETE route
router.delete("/api/gift/:id", function(req, res) {
  db.Gift.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbGift) {
    res.json(dbGift);
  });
});

// Export routes for server.js to use.
module.exports = router;