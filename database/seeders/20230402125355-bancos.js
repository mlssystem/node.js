'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('bancos', [{
      banco: '341',
      name: 'Itaú',
      operador: 0,
      tipo_conta_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      banco: '237',
      name: 'Bradesco',
      operador: 0,
      tipo_conta_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      banco: '10',
      name: 'Caixa Econômica Federal',
      operador: 13,
      tipo_conta_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      banco: '001',
      name: 'Nubank',
      operador: 0,
      tipo_conta_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down () {
  }
};
