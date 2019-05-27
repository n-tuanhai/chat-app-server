'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('Message', {
        MessID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        convoID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        sendFrom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sendTo: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        content: {
            allowNull: false,
            type: DataTypes.STRING,
        }, 
        sendAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
    },{schema: 'chatapp'});

    return User;
};