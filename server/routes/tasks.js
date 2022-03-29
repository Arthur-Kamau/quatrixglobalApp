var express = require('express');
var router = express.Router();
var tasksModel = require('../model/tasks');

/* tasks page. */
router.get('/', async function (req, res, next) {

    // assign default values
    let page = 1;
    let limit = 10;
    let order = "created";
    let orderMethod = "DESC";
    // assign url parameters just incase is null 
    if (req.query.page != undefined && req.query.page !== '') {
        page = req.query.page;
    }
    if (req.query.limit != undefined && req.query.limit !== '') {
        limit = req.query.limit;
    }
    if (req.query.order != undefined && req.query.order !== '') {
        order = req.query.order;
    }
    if (req.query.orderMethod != undefined && req.query.orderMethod !== '') {
        orderMethod = req.query.orderMethod;
    }

    const pgInt = parseInt(page);
    var resDB;
    if (pgInt != 1) {
        // ten per page
        // on a different page not page one
        // start selection fom  the last of the previous page ie
        // we are on page 2 select from 11
        // (2-1)*10
        resDB = await tasksModel.findAndCountAll({
            where: {
                [Op.gte]: [{id : (pgInt-1) * 10}]
            },
            order: [
                ["createdAt", "DESC"]
            ],
            limit: limit,
        });

    } else {
        // select from id 1 to 10
        resDB = await tasksModel.findAndCountAll({

            order: [
                ["createdAt", "DESC"]
            ],
            limit: limit,
        });
    }

    res.json({
        "totalTasks": resDB.count,
        "page": parseInt(page),
        "perPage": 10,
        "tasks": resDB.rows
    });


});

module.exports = router;
