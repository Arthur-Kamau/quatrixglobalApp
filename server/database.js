const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://kenn:kenn12345@localhost:5432/quatrixdb') // Example for postgres



module.exports = sequelize;