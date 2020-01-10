var express = require("express");
var router = express.Router();
var newTable = require("../models/tables.js");
var newPlan = require("../models/plans.js");
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public.index.html"));
});
router.get("/tables", function (req, res) {
    newTable.all(function (data) {
        res.json({ tables: data });
    });
});
router.get("/plans", function (req, res) {
    newPlan.all(function (data) {
        res.json({ plans: data });
    });
});
router.post("/tables", function (req, res) {
    newTable.create([
        'title', 'color_code'
    ], [
        req.body.title,
        req.body.color_code
    ], function (result) {
        res.json({ id: result.insertId });
    });
});
router.post("/plans", function (req, res) {
    newPlan.create([
        'plan', 'description', 'tableId', 'color_code'
    ], [
        req.body.plan,
        req.body.description,
        req.body.tableId,
        req.body.color_code
    ], function (result) {
        res.json({ id: result.insertId });
    });
});
router.put("/tables/:tableId", function (req, res) {
    var condition = "tableId = " + req.params.tableId;
    console.log("condition: ", condition);
    newTable.update({
        title: req.body.title,
        color_code: req.body.color_code
    }, condition, function (result) {
        if (result.changedRow == 0) {
            return res.status(404).end();
        } else {
            res.json({ id: req.params.id });
        }
    });
});
router.put("/plans/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition: ", condition);
    newPlan.update({
        plan: req.body.plan,
        description: req.body.description,
        tableId: req.body.tableId,
        color_code: req.body.color_code
    }, condition, function (result) {
        if (result.changedRow == 0) {
            return res.status(404).end();
        } else {
            res.json({ id: req.params.id });
        }
    });
});
router.delete("/tables/:tableId", function (req, res) {
    var condition = "tableId = " + req.params.tableId;
    newTable.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
router.delete("/plans/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    newPlan.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// router.deleteAll("/tables", function (req, res) {
//     newTable.deleteAll(function (result) {
//         if (result.affectedRows == 0) {
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });
module.exports = router;