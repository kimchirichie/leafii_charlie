var express = require("express");
var app = express();
var Sequelize = require("sequelize");

var database;
if (app.get("env") === "production") {
	database = "db/leafii_prod.db";
} else if (app.get("env") === "development") {
	database = "db/leafii_dev.db";
} else {
	database = "db/leafii_test.db";
}

var sequelize = new Sequelize(undefined,undefined, undefined, {
	dialect: "sqlite",
	storage: database
});

module.exports = sequelize.define("user", {
	email: {type: Sequelize.STRING, allowNull: false, unique: true},
	password: {type: Sequelize.STRING, allowNull: false},
	firstName: {type: Sequelize.STRING, allowNull: false},
	lastName: {type: Sequelize.STRING, allowNull: false},
	url: {type: Sequelize.STRING, allowNull: false, unique: true},
	location: {type: Sequelize.STRING, allowNull: false}
});