var orm = require("../config/orm.js");

var plan_holder = {
  all: function (cb) {
    orm.all("plans_holders", function (res) {
      cb(res);
    });
  },

  create: function (cols, vals, cb) {
    orm.create("plans_holders", cols, vals, function (res) {
      cb(res);
    });
  },

  update: function (objColVals, condition, cb) {
    orm.update("plans_holders", objColVals, condition, function (res) {
      cb(res);
    });
  },

  delete: function (condition, cb) {
    orm.delete("plans_holders", condition, function (res) {
      cb(res);
    });
  }
};

module.exports = plan_holder;