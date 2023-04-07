'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('contatos', [{
      name: 'Bauri',
      email: 'bauri@celke.com.br',
      phone: '111111111',
      descricao: 'bauri@celke.com.br',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mesa',
      email: 'mesa@celke.com.br',
      phone: '222222222',
      descricao: 'mesa@celke.com.br',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Poltrona',
      email: 'poltrona@celke.com.br',
      phone: '333333333',
      descricao: 'poltrona@celke.com.br',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Pia',
      email: 'pia@celke.com.br',
      phone: '44444444',
      descricao: 'pia@celke.com.br',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sofa',
      email: 'sofa@celke.com.br',
      phone: '555555555',
      descricao: 'sofa@celke.com.br',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Armario',
      email: 'armario@celke.com.br',
      phone: '6666666666',
      descricao: 'armario@celke.com.br',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down () {
  }
};
