const seqInst = require("../db").sequelizeInstance
const seq = require("../db").sequelize
let User = require("../models/user");
let Logs = require("../models/logs");
let Personal_logs = require("../models/personal_logs");

module.exports = {
    user: User(seqInst, seq),
    logs: Logs(seqInst, seq),
    personal_logs: Personal_logs(seqInst, seq)
};