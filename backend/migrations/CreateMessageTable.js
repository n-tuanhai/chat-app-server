'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Message', {
        MessID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        convoID: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        sendFrom: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        sendTo: {
            type: Sequelize.STRING,
            allowNull: false,
        }, 
        content: {
            allowNull: false,
            type: Sequelize.STRING,
        }, 
        sendAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
      
    }, {schema: 'chatapp'})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Message');
  }
};
