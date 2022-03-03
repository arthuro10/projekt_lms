var express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
var router = express.Router();

let personal_logs = require("../database/controller/all_models").personal_logs


router.get('/', function (req, res, next) {
    console.log("get");
    personal_logs.findAll({attributes: ['ID','FromHost', 'Priority', 'Facility', 'SysLogTag', 'ReceivedAt', 'Message'], order: [['ReceivedAt', 'DESC']]}).then(allLogs => {
        res.json({err: false, data: allLogs});
        console.log(allLogs)
    }).catch(err => {
        console.error('Unable to Select the Logs', err);
    });
});


router.post('/', function (req, res, next) {
    console.log("post")

    console.log(req.body)

    var iD = req.body.ID || '';
    var fromhost = req.body.FromHost || '';
    var priority = req.body.Priority || '';
    var facility = req.body.Facility || '';
    var syslogTag  = req.body.SysLogTag || '';
    var receivedAt  = req.body.ReceivedAt || '';
    var message  = req.body.Message || '';

    // Neue Daten hinzufügen. Zuerst Model Instanz bauen
    var newLog = personal_logs.build({
        ID: iD,
        FromHost: fromhost,
        Priority: priority,
        Facility: facility,
        SysLogTag: syslogTag,
        ReceivedAt: receivedAt,
        Message: message
    });
    // Erst mit save() wird die Datenbank Tabelle mit den neuen Daten aktualisiert. 
    newLog.save().catch(function (error) {
        console.log('Error while inserting: ' + error.stack);
    });
    res.json({"info": "Neu angelegt"});
});

router.delete('/:IDLog', function (req, res, next) {
    var idLog = req.params.IDLog || '';
    console.log("delete")
    console.log(req.params);
    // Log mit ID xy aus der Datenbank entfernen. 
    personal_logs.destroy({where: {ID: idLog}});
    res.json({info: idLog.concat(" deleted")});
});

module.exports = router;