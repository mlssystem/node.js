const Sequelize = require('sequelize');
const db = require("./db");

const Contato = db.define('contato', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
/** criar a tabela sequelize */
//Contato.sync();
/** excluir a tabela e criar novamente */
//Contato.sync({ force: true });
/** verifica se ha alguma diferenca na tabela e realiza a alteracao */
//Contato.sync({alter: true});
/** exportar o modulo 'Contato' */
module.exports = Contato;
