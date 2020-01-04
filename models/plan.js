var orm = require("../config/orm.js");

var plan = {
    all: function (cb) {
        orm.all("plans", function (res) {
            cb(res);
        });
    },

    create: function (cols, vals, cb) {
        orm.create("plans", cols, vals, function (res) {
            cb(res);
        });
    },

    update: function (objColVals, condition, cb) {
        orm.update("plans", objColVals, condition, function (res) {
            cb(res);
        });
    },

    delete: function (condition, cb) {
        orm.delete("plans", condition, function (res) {
            cb(res);
        });
    }
};

module.exports = plan;