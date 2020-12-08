const express = require("express");
const path = require("path");
const router = express.Router();

// Import models to use the database functions.
const db = require("../models/index.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../index.html"));
});

router.get("/api/wrappit", function(req, res) {
  db.findAll(function(data) {
    const hbsObject = {
      wrappit: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
    // res.render("index", hbsObject);
  }); 
});

// router.post("/api/wrappit", function(req, res) {
//   wrappit.insertOne([
//     "burger_name"
//   ], [
//     req.body.burger_name
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

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