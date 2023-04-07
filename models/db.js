/** incluindo sequelize */
const Sequelize = require('sequelize');
/** criando conexao */
const sequelize = new Sequelize(process.env.DB_BASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});
/** verificar se conectou com o banco de dados */
sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!');
}).catch(() => {
    console.log('Erro: Conexão com o banco de dados não realizada com sucesso!');
});
/** exportando o modulo sequelize */
module.exports = sequelize;
