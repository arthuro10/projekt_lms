var sequelize = require('sequelize');

var sequelizeInstance = new sequelize('Syslog', 'supersyslog', 'supersys', {
    host: '192.168.0.90',
    port: 3306,
    dialect: 'mysql'
    
});

sequelizeInstance.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = {
    sequelizeInstance: sequelizeInstance,
    sequelize: sequelize
};