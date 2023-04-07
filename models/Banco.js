const Sequelize = require('sequelize');
const db = require("./db");

const Banco = db.define('banco', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    banco: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    operador: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipo_conta_id: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
/** criar a tabela sequelize */
//Banco.sync();
/** excluir a tabela e criar novamente */
//Banco.sync({ force: true });
/** verifica se ha alguma diferenca na tabela e realiza a alteracao */
//Banco.sync({alter: true});
/** exportar o modulo 'Banco' */
module.exports = Banco;
