var express = require("express");
var router = express.Router();

var plan = require("../models/plan.js");

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public.index.html"));
});

router.get("/plans", function(req, res) {
    plan.all(function(data) {
        res.json({ plans: data });
    });
});

router.post("/plans", function(req, res) {
    plan.create([
        'name', 'eaten'
    ], [
        req.body.name, req.body.eaten
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("/plans/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition: ", condition);

    plan.update({
        eaten: req.body.eaten
    }, condition, function(result) {
        if (result.changedRow == 0) {
            return res.status(404).end();
        } else {
            res.json({ id: req.params.id });
        }
    });
});

router.delete("/plans/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    plan.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;