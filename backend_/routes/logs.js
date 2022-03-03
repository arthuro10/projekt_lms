var express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
var router = express.Router();


let logs = require("../database/controller/all_models").logs



router.get('/', function (req, res, next) {
    // Die ganzen Eigenschaften die die Logs haben kommen vom Rsyslog Server. 
    // Nur bestimmte Spalten "selecten", da nicht alle gebraucht werden. 
    logs.findAll({attributes: ['ID','FromHost', 'Priority', 'Facility', 'SysLogTag', 'ReceivedAt', 'Message'], order: [['ReceivedAt', 'DESC']]}).then(allLogs => {
        res.json({err: false, data: allLogs});
        console.log(allLogs)
    }).catch(err => {
        console.error('Unable to Select the Logs', err);
    });
});

module.exports = router;