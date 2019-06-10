'use strict';
module.exports = (sequelize, DataTypes) => {
    var Conversation = sequelize.define('Conversation', {
        convoID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        userID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
    },{schema: 'chatapp'});

    return Conversation;
};