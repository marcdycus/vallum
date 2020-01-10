var orm = require("../config/orm.js");
var allTables = {
    all: function (cb) {
        orm.all("tables", function (res) {
            cb(res);
        });
    },
    create: function (cols, vals, cb) {
        orm.create("tables", cols, vals, function (res) {
            cb(res);
        });
    },
    update: function (objColVals, condition, cb) {
        orm.update("tables", objColVals, condition, function (res) {
            cb(res);
        });
    },
    delete: function (condition, cb) {
        orm.delete("tables", condition, function (res) {
            cb(res);
        });
    }
    // deleteAll: function (cb) {
    //   orm.deleteAll("tables", function(res) {
    //     cb(res);
    //   });
    // }
};
module.exports = allTables;