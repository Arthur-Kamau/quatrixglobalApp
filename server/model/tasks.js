const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../database");

const Tasks = sequelize.define("tasks", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    customerFirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    personnelFirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    personnelOtherName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerLastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customerPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    agentId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    assigned: {
        type: DataTypes.DATE,
        allowNull: false
    },
    inProgress: {
        type: DataTypes.DATE,
        allowNull: false
    },
    completed: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deferred: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    accessCode: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    splashPage: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mpesa: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    autoplay: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    comments: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registration: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = Tasks;