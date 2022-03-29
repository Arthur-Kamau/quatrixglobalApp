const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../database");

const Tasks = sequelize.define("tasks", {
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        allowNull: false
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
        allowNull: false
    },
    deferred: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accessCode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    splashPage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mpesa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    autoplay: {
        type: DataTypes.INTEGER,
        allowNull: false
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