var orm = require("../config/orm.js");
var allColors = {
    all: function (cb) {
        orm.all("colors", function (res) {
            cb(res);
        });
    },
    create: function (cols, vals, cb) {
        orm.create("colors", cols, vals, function (res) {
            cb(res);
        });
    },
    update: function (objColVals, condition, cb) {
        orm.update("colors", objColVals, condition, function (res) {
            cb(res);
        });
    },
    delete: function (condition, cb) {
        orm.delete("colors", condition, function (res) {
            cb(res);
        });
    }
};
module.exports = allColors;