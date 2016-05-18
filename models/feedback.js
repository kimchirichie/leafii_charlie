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

module.exports = sequelize.define("feedback", {
	email: {type: Sequelize.STRING},
	name: {type: Sequelize.STRING},
	content: {type: Sequelize.TEXT, allowNull: false}
});