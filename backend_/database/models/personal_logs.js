module.exports = function (sequelize, DataTypes) {
    const personalLogs = sequelize.define('PersonalLogs', {
        ID: { type: DataTypes.INTEGER(10).UNSIGNED, allowNull: false, primaryKey: true },
        ReceivedAt: { type: DataTypes.DATE, allowNull: false,  },
        Facility: { type: DataTypes.SMALLINT(6), allowNull: false, defaultValue: 99 },
        Priority: { type: DataTypes.SMALLINT(6), allowNull: false, defaultValue: 99 },
        FromHost: { type: DataTypes.STRING(60), allowNull: false, defaultValue: "" },
        Message: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
        SysLogTag: { type: DataTypes.STRING(60), allowNull: false, defaultValue: '' }
    }, {
        //options
        freezeTableName: true,
            tableName: 'PersonalLogs',
            timestamps: false
    });

    personalLogs.sync().then(function() {
        console.log('PersonalLog Table created');
    }, function(err) {
        console.error('error occurred while creating table : ' + err.stack);
    });

    return personalLogs;
};