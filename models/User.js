const Sequelize = require('sequelize');
const db = require("./db");

const User = db.define('user', {
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
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
/** criar a tabela sequelize */
//User.sync();
/** excluir a tabela e criar novamente */
//User.sync({ force: true });
/** verifica se ha alguma diferenca na tabela e realiza a alteracao */
//User.sync({alter: true});
/** exportar o modulo 'User' */
module.exports = User;
