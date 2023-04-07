/** criptografar senha */
const bcrypt = require('bcryptjs');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('users', [{
      name: 'Cesar',
      email: 'cesar@celke.com.br',
      password: await bcrypt.hash('123456', 8),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Junior',
      email: 'junior@celke.com.br',
      password: await bcrypt.hash('123456', 8),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Patrick',
      email: 'patrick@celke.com.br',
      password: await bcrypt.hash('123456', 8),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Roger',
      email: 'roger@celke.com.br',
      password: await bcrypt.hash('123456', 8),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Love',
      email: 'love@celke.com.br',
      password: await bcrypt.hash('123456', 8),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Casa',
      email: 'casa@celke.com.br',
      password: await bcrypt.hash('123456', 8),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down () {
  }
};
