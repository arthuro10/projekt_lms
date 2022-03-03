module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('user', {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV1, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        activatedAt: { type: DataTypes.DATE, defaultValue: null }
    }, {
        //options
        timestamps: false
    });

    User.sync().then(function() {
        console.log('User Table created');
    }, function(err) {
        console.error('error occurred while creating table : ' + err.stack);
    });

    return User;
};