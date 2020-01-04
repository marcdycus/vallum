var express = require("express");
var router = express.Router();
var plan = require("../models/plan.js");
var plans_holder = require("../models/plan_holder");

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public.index.html"));
});

router.get("/plans", function(req, res) {
    plan.all(function(data) {
        res.json({ plans: data });
    });

});

router.get("/plans_holders", function(req, res) {
    plans_holder.all(function(data) {
        res.json({ plans_holders: data});
    });
});

router.post("/plans", function(req, res) {
    plan.create([
        'plan', 'description', 'complete', 'table_id', 'color' 
    ], [
        req.body.plan, 
        req.body.description,
        req.body.complete, 
        req.body.table_id,
        req.body.color
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

router.post("/plans_holders", function(req, res) {
    plans_holder.create('title', [req.body.title], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("/plans/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition: ", condition);

    plan.update({
        plan: req.body.plan,
        description: req.body.description,
        complete: req.body.complete,
        table_id: req.body.table_id,
        color: req.body.color
    }, condition, function(result) {
        if (result.changedRow == 0) {
            return res.status(404).end();
        } else {
            res.json({ id: req.params.id });
        }
    });
});

router.put('/plans_holders/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;
    console.log('condition: ', condition);

    plans_holder.update({
        title: req.body.title
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

router.delete('/plans_holders/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;

    plans_holder.delete(condition, function(result) {
        if (result.affectedRow == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;