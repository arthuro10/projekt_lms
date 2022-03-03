module.exports = function (sequelize, DataTypes) {
    const Logs = sequelize.define('SystemEvents', {
        ID: { type: DataTypes.INTEGER(10).UNSIGNED, allowNull: false, primaryKey: true },
        CustomerID: { type: DataTypes.BIGINT(20), allowNull: true },
        ReceivedAt: { type: DataTypes.DATE, allowNull: true },
        DeviceReportedTime: { type: DataTypes.DATE, allowNull: true },
        Facility: { type: DataTypes.SMALLINT(6), allowNull: true },
        Priority: { type: DataTypes.SMALLINT(6), allowNull: true },
        FromHost: { type: DataTypes.STRING(60), allowNull: true },
        Message: { type: DataTypes.TEXT, allowNull: true },
        NTSeverity: { type: DataTypes.INTEGER(11), allowNull: true },
        Importance: { type: DataTypes.INTEGER(11), allowNull: true },
        EventSource: { type: DataTypes.STRING(60), allowNull: true },
        EventUser: { type: DataTypes.STRING(60), allowNull: true },
        EventCategory: { type: DataTypes.INTEGER(11), allowNull: true },
        EventID: { type: DataTypes.INTEGER(11), allowNull: true },
        EventBinaryData: { type: DataTypes.TEXT, allowNull: true },
        MaxAvailable: { type: DataTypes.INTEGER(11), allowNull: true },
        CurrUsage: { type: DataTypes.INTEGER(11), allowNull: true },
        MinUsage: { type: DataTypes.INTEGER(11), allowNull: true },
        MaxUsage: { type: DataTypes.INTEGER(11), allowNull: true },
        InfoUnitID: { type: DataTypes.INTEGER(11), allowNull: true },
        SysLogTag: { type: DataTypes.STRING(60), allowNull: true },
        EventLogType: { type: DataTypes.STRING(60), allowNull: true },
        GenericFileName: { type: DataTypes.STRING(60), allowNull: true },
        SystemID: { type: DataTypes.INTEGER(11), allowNull: true }
    }, {
        //options
        timestamps: false
    });

    Logs.sync().then(function() {
        console.log('Log Table created');
    }, function(err) {
        console.error('error occurred while creating table : ' + err.stack);
    });

    return Logs;
};