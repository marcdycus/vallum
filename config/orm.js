var connection = require("./connection.js");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(obj) {
    var arr = [];

    for (var key in obj) {
        var val = obj[key];

        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof val === "string") {
                val = "'" + val + "'";
            }

            arr.push(key + "=" + val);
        }
    }
    return arr.toString();
}

var orm = {
    all: function(tableInput, cb) {
        var query = "SELECT * FROM " + tableInput + ";";
        connection.query(query, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    
    create: function(table, cols, vals, cb) {
        var query = "INSERT INTO " + table;

        query += " (";
        query += cols.toString();
        query += ") ";
        query += "VALUES (";
        query += printQuestionMarks(vals.length);
        query += ") ";

        console.log(query);

        connection.query(query, vals, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    update: function(table, objColVals, condition, cb) {
        var query = "UPDATE " + table;

        query += " SET ";
        query += objToSql(objColVals);
        query += " WHERE ";
        query += condition;
    
        console.log(query);
        connection.query(query, function(err, result) {
          if (err) {
            throw err;
          }
          cb(result);
        });
    },

    delete: function(table, condition, cb) {
        var query = "DELETE FROM " + table;
        query += " WHERE ";
        query += condition;
    
        connection.query(query, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },

    innerJoin: function(whatToSelect, tableOne, tableTwo, onTableOneCol, onTableTwoCol) {
        
        var queryString = "SELECT ?? FROM ?? AS tOne";
        queryString += " INNER JOIN ?? as tTwo";
        queryString += " ON tOne.?? = tTwo.??";

        console.log(queryString);

        connection.query(queryString, [whatToSelect, tableOne, tableTwo, onTableOneCol, onTableTwoCol], function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};

module.exports = orm;