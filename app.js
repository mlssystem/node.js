/** incluir arquivos com variaveis de ambiente */
require('dotenv').config();
//console.log(process.env);
/** incluindo moment para formatar data e hora */
const moment = require('moment');
/** 
 * incluir express-session serve para:
 *  criar sessão e armazenar dados no servidor 
 * */
const session = require('express-session');
/** criar uma variavel global dentro do flash */
const flash = require('connect-flash');
/** criptografar senha */
const bcrypt = require('bcryptjs');
/** incluir express  */
const express = require('express');
/** incluir handlebars */
const {engine} = require('express-handlebars');
/** incluindo moment para formatar data e hora */
const app = express();
/** handelebars + obejeto para formatar data e hora*/
app.engine('handlebars', engine({
    helpers: {
        formatDate: (date) =>{
            return moment(date).format('DD/MM/YYYY');
        },
        formatDateTime: (date) =>{
            return moment(date).format('DD/MM/YYYY HH:mm:ss');
        }
    }
}));
/** comando para usar imgens */
app.use(express.static("images"));
/** fim comando para usar imgens */

/** criar um middleware para manipular sessao */
app.use(session({
    secret: process.env.SECRETSESSION,
    resave: false,
    saveUninitialized: true
}));

/** usar o flash para armazenar mensagem na sessao */
app.use(flash());

/** criar uma middleware para manipular mensagens */
app.use((req, res, next) => {
    /** locais usado para criar variavel global "success_msg" */
    res.locals.success_msg = req.flash('success_msg');
    /** locais usado para criar variavel global "error_msg" */
    res.locals.error_msg = req.flash('error_msg');
    /** caso nao de erro, continue o processamento, o next e obrigatorio no midleware */
    next();
})

/** definindo template */
app.set('view engine', 'handlebars');
app.set('views', './views');

/** incluir body-parse*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
/** receber os dados em formato .json */
app.use(bodyParser.json());

/** importar models */
/** importando a models 'Banco' que manipula o banco de dados do usuario */
const Banco = require('./models/Banco');
/** importando a models 'Contato' que manipula o banco de dados do usuario */
const Contato = require('./models/Contato');
/** importando a models 'User' que manipula o banco de dados do usuario */
const User = require('./models/User');
/** criando rota para paginas 
 *  mostrar apenas mensagem na pagina
 * //res.send("Página home");
 * carregar o arquivo 
 * //res.render('home');
*/

/** paginas */
/** pagina home */
app.get('/', (req, res) => {
    res.render('home');
});
/** fim pagina home */

/** pagina bancos */
app.get('/add-banco', (req, res) => {
    res.render('add-banco');
});
/** fim pagina usuario */

/** pagina contatos*/
app.get('/add-contato', (req, res) => {
    res.render('add-contato');
});
/** fim pagina contato */

/** pagina usuario */
app.get('/add-user', (req, res) => {
    res.render('add-user');
});
/** fim pagina usuario */
/** fim paginas */

/** cadastrar detalhes banco */
app.post('/add-banco', async (req, res) => {
    /** para usar o await tem inckuir async como acima */
    await Banco.create(req.body)
    .then(() => {
        /** redirecionar para local especifico */
        //res.redirect('/');
        /** ou mostrar alguma mensagem */
        //res.send("Usuário cadastrado com sucesso!");
        /** criar a mensagem de banco cadastrado com secesso */
        req.flash("success_msg", "Banco cadastrado com sucesso!");
        /** redirecionar o usuario para cadastrar banco */
        res.redirect('/add-banco');
    }).catch(() => {
        //res.send("Erro: Contato não cadastrado com sucesso!");
        /** criar a mensagem de contato nao cadastrado com secesso */
        req.flash("error_msg", "Erro: Contato não cadastrado com csucesso");
    });
});
/** fim cadastro detalhes contato */

/** buscar detalhes do banco para editar */
app.get('/edit-banco/:id', (req, res) => {
    /** imprimir msg na tela */
    //res.send('edit');
    /** imprimir id na tela*/
    //res.send(req.params.id);
    Banco.findByPk(req.params.id, {
        /** idicar quais colunas recuperar */
        attributes: ['id', 'banco', 'name', 'operador', 'tipo_conta_id'],
    }).then((banco) => {
        /** carregar a pagina editar e enviar os dados do registro */ 
        /** renderizar (carregar) pagna*/
        res.render('edit-banco', {banco: banco.dataValues});
    }).catch(() => {
        /** criar mensage de banco nao encontrado */
        res.redirect('/list-banco');
    })
});
/** fim buscar detalhes do banco para editar */

/** editar detalhes do banco no banco de dados */
app.post('/edit-banco/:id', (req, res) => {
    //console.log(req.body);
    /** otimizando o codigo */
    var data = req.body;
    /** imprimir na tela o objeto com informacoes */
    //res.send(data);
    Banco.update (
        data,

    /*User.update (
        {
            name: req.body.name,
            email: req.body.email,
        },*/
        {
            where: {id: req.params.id}
        }
    ).then(() =>{
        /** criar mensagem de banco editado com sucesso */
        req.flash("success_msg", "Banco editado com sucesso!");
        res.redirect('/list-banco');
    }).catch(() => {
        /** criar mensagem de banco nao editado com sucesso */
        req.flash("error_msg", "Erro: Banco não editado com sucesso!");
    });
});
/** firm editar detalhes do banco no banco de dados */

/** apagar detalhes banco */
 app.get('/del-banco/:id', async (req, res) => {
    /** receber o id do usuario como parametro */
    //res.send("Id do banco: " + req.params.id);
    Banco.destroy({
        where: {'id': req.params.id}
    }).then(() => {
        //res.redirect('/list-banco');
        //res.send("Banco apagado com sucesso!");
        /** criar mensagem apagado com sucesso */
        req.flash("success_msg", "Banco apagado com sucesso!");
        /** redirecionar o banco para listar banco */
        res.redirect('/list-banco');
    }).catch(() => {
        //res.send("Erro: Banco não apagado com sucesso!")
        /** criar a mensagem de banco nao apagado com secesso */
        req.flash("error_msg", "Erro: Banco não apagado com csucesso");
    });
});
/** fim apagar detalhes banco */

/** listar detalhes usuario */
app.get('/list-banco', (req, res) => {
    Banco.findAll({
        /** escolher o que mostrar */
        attributes: ['id', 'banco', 'name', 'operador', 'tipo_conta_id'],
        order: [['id', 'DESC']]
    })
    .then((bancos) => {
        res.render('list-banco', {bancos: bancos.map(id => id.toJSON())});
    });
});
/** fim listar detalhes banco */

/** visualizar detalhes banco */
app.get('/view-banco/:id', (req, res) => {
    //console.log(req.params.id);
    //res.send(req.params.id);
    Banco.findByPk(req.params.id, {
        attributes: ['id', 'banco', 'name', 'operador', 'tipo_conta_id', 'createdAt', 'updatedAt'],
    })
    .then((banco) => {
        //console.log(banco);
        res.render('view-banco', {banco: banco.dataValues});
    }).catch(() => {
        /** criar a mensagem de usuario nao encontrado */
        req.flash("error_msg", "Erro: Banco não encontrado");
        /** redirecionar o usuario */
        res.redirect('/list-banco')
    })
})
/** fim visualizar detalhes banco */

/** cadastrar detalhes contato */
app.post('/add-contato', async (req, res) => {
    /** para usar o await tem inckuir async como acima */
    await Contato.create(req.body)
    .then(() => {
        /** redirecionar para local especifico */
        //res.redirect('/');
        /** ou mostrar alguma mensagem */
        //res.send("Usuário cadastrado com sucesso!");
        /** criar a mensagem de contato cadastrado com secesso */
        req.flash("success_msg", "Contato cadastrado com sucesso!");
        /** redirecionar o usuario para cadastrar contato */
        res.redirect('/add-contato');
    }).catch(() => {
        //res.send("Erro: Contato não cadastrado com sucesso!");
        /** criar a mensagem de contato nao cadastrado com secesso */
        req.flash("error_msg", "Erro: Contato não cadastrado com csucesso");
    });
});
/** fim cadastro detalhes contato */

/** buscar detalhes do contato para editar */
app.get('/edit-contato/:id', (req, res) => {
    /** imprimir msg na tela */
    //res.send('edit');
    /** imprimir id na tela*/
    //res.send(req.params.id);
    Contato.findByPk(req.params.id, {
        /** idicar quais colunas recuperar */
        attributes: ['id', 'name', 'email', 'phone', 'descricao'],
    }).then((contato) => {
        /** carregar a pagina editar e enviar os dados do registro */ 
        /** renderizar (carregar) pagna*/
        res.render('edit-contato', {contato: contato.dataValues});
    }).catch(() => {
        /** criar mensage de contato nao encontrado */
        res.redirect('/list-contato');
    })
});
/** fim buscar detalhes do contato para editar */

/** editar detalhes do contato no banco de dados */
app.post('/edit-contato/:id', (req, res) => {
    //console.log(req.body);
    /** otimizando o codigo */
    var data = req.body;
    /** imprimir na tela o objeto com informacoes */
    //res.send(data);
    Contato.update (
        data,

    /*User.update (
        {
            name: req.body.name,
            email: req.body.email,
        },*/
        {
            where: {id: req.params.id}
        }
    ).then(() =>{
        /** criar mensagem de contato editado com sucesso */
        req.flash("success_msg", "Contato editado com sucesso!");
        res.redirect('/list-contato');
    }).catch(() => {
        /** criar mensagem de contato nao editado com sucesso */
        req.flash("error_msg", "Erro: Contato não editado com sucesso!");
    });
});
/** firm editar detalhes do contato no banco de dados */

/** apagar detalhes contato */
 app.get('/del-contato/:id', async (req, res) => {
    /** receber o id do usuario como parametro */
    //res.send("Id do contato: " + req.params.id);
    Contato.destroy({
        where: {'id': req.params.id}
    }).then(() => {
        //res.redirect('/list-contato');
        //res.send("Contato apagado com sucesso!");
        /** criar mensagem apagado com sucesso */
        req.flash("success_msg", "Contato apagado com sucesso!");
        /** redirecionar o contato para listar contato */
        res.redirect('/list-contato');
    }).catch(() => {
        //res.send("Erro: Contato não apagado com sucesso!")
        /** criar a mensagem de contato nao apagado com secesso */
        req.flash("error_msg", "Erro: Contato não apagado com csucesso");
    });
});
/** fim apagar detalhes contato */

/** listar detalhes usuario */
app.get('/list-contato', (req, res) => {
    Contato.findAll({
        /** escolher o que mostrar */
        attributes: ['id', 'name', 'email', 'phone', 'descricao'],
        order: [['id', 'DESC']]
    })
    .then((contatos) => {
        res.render('list-contato', {contatos: contatos.map(id => id.toJSON())});
    });
});
/** fim listar detalhes contato */

/** visualizar detalhes contato */
app.get('/view-contato/:id', (req, res) => {
    //console.log(req.params.id);
    //res.send(req.params.id);
    Contato.findByPk(req.params.id, {
        attributes: ['id', 'name', 'email', 'phone', 'descricao', 'createdAt', 'updatedAt'],
    })
    .then((contato) => {
        //console.log(contato);
        res.render('view-contato', {contato: contato.dataValues});
    }).catch(() => {
        /** criar a mensagem de usuario nao encontrado */
        req.flash("error_msg", "Erro: Contato não encontrado");
        /** redirecionar o usuario */
        res.redirect('/list-contato')
    })
})
/** fim visualizar detalhes contato */

/** cadastrar detalhes usuario */
app.post('/add-user', async (req, res) => {
    var data = req.body;
    data.password = await bcrypt.hash(data.password, 8);

    /** para usar o await tem inckuir async como acima */
    await User.create(req.body)
    .then(() => {
        /** redirecionar para local especifico */
        //res.redirect('/');
        /** ou mostrar alguma mensagem */
        //res.send("Usuário cadastrado com sucesso!");
        /** criar a mensagem de usuario cadastrado com secesso */
        req.flash("success_msg", "Usuário cadastrado com sucesso!");
        /** redirecionar o usuario para cadastrar usuario */
        res.redirect('/add-user');
    }).catch(() => {
        //res.send("Erro: Usuário não cadastrado com sucesso!");
        /** criar a mensagem de usuario nao cadastrado com secesso */
        req.flash("error_msg", "Erro: Usuário não cadastrado com sucesso");
    });
});
/** fim cadastrar detalhes usuario */

/** buscar detalhes do usuario para editar */
app.get('/edit-user/:id', (req, res) => {
    /** imprimir msg na tela */
    //res.send('edit');
    /** imprimir id na tela*/
    //res.send(req.params.id);
    User.findByPk(req.params.id, {
        /** idicar quais colunas recuperar */
        attributes: ['id', 'name', 'email'],
    }).then((user) => {
        /** carregar a pagina editar e enviar os dados do registro */ 
        /** renderizar (carregar) pagna*/
        res.render('edit-user', {user: user.dataValues});
    }).catch(() => {
        /** criar mensage de usuario nao encontrado */
        res.redirect('/list-user');
    })
});
/** fim buscar detalhes do usuario para editar */

/** editar detalhes do usuario no banco de dados */
app.post('/edit-user/:id', (req, res) => {
    //console.log(req.body);
    /** otimizando o codigo */
    var data = req.body;
    /** imprimir na tela o objeto com informacoes */
    //res.send(data);
    User.update (
        data,

    /*User.update (
        {
            name: req.body.name,
            email: req.body.email,
        },*/
        {
            where: {id: req.params.id}
        }
    ).then(() =>{
        /** criar mensagem de usuario editado com sucesso */
        req.flash("success_msg", "Usuário editado com sucesso!");
        res.redirect('/list-user');
    }).catch(() => {
        /** criar mensagem de usuario nao editado com sucesso */
        req.flash("error_msg", "Erro: Usuário não editado com sucesso!");
    });
});
/** firm editar detalhes do usuario no banco de dados */

/** buscar password do usuario para editar */
app.get('/edit-user-password/:id', (req, res) => {
    /** imprimir msg na tela */
    //res.send('edit');
    /** imprimir id na tela*/
    //res.send(req.params.id);
    User.findByPk(req.params.id, {
        /** idicar quais colunas recuperar */
        attributes: ['id'],
    }).then((user_password) => {
        /** carregar a pagina editar e enviar os dados do registro */ 
        /** renderizar (carregar) pagna*/
        res.render('edit-user-password', {user_password: user_password.dataValues});
    }).catch(() => {
        /** criar mensage de usuario nao encontrado */
        res.redirect('/list-user');
    })
});
/** fim buscar detalhes do usuario para editar */

/** editar password do usuario no banco de dados */
app.post('/edit-user-password/:id', async (req, res) => {
    //console.log(req.body);
    /** otimizando o codigo */
    var data = req.body;
    data.password = await bcrypt.hash(data.password, 8);
    /** imprimir na tela o objeto com informacoes */
    //res.send(data);
    User.update (
        data,

    /*User.update (
        {
            name: req.body.name,
            email: req.body.email,
        },*/
        {
            where: {id: req.params.id}
        }
    ).then(() =>{
        /** criar mensagem de usuario editado com sucesso */
        req.flash("success_msg", "Usuário editado com sucesso!");
        res.redirect('/list-user');
    }).catch(() => {
        /** criar mensagem de usuario nao editado com sucesso */
        req.flash("error_msg", "Erro: Usuário não editado com sucesso!");
    });
});
/** firm editar detalhes do usuario no banco de dados */

/** apagar detalhes usuario */
 app.get('/del-user/:id', async (req, res) => {
    /** receber o id do usuario como parametro */
    //res.send("Id do usuário: " + req.params.id);
    User.destroy({
        where: {'id': req.params.id}
    }).then(() => {
        //res.redirect('/list-user');
        //res.send("Usuário apagado com sucesso!");
        /** criar mensagem apagado com sucesso */
        req.flash("success_msg", "Usuário apagado com sucesso!");
        /** redirecionar o usuario para listar usuario */
        res.redirect('/list-user');
    }).catch(() => {
        //res.send("Erro: Usuário não apagado com sucesso!")
        /** criar a mensagem de usuario nao apagado com secesso */
        req.flash("error_msg", "Erro: Usuário não apagado com csucesso");
    });
});
/** fim apagar detalhes usuario */

/** listar detalhes usuario */
app.get('/list-user', (req, res) => {
    User.findAll({
        /** escolher o que mostrar */
        attributes: ['id', 'name', 'email'],
        order: [['id', 'DESC']]
    })
    .then((users) => {
        res.render('list-user', {users: users.map(id => id.toJSON())});
    });
});
/** fim listar detalhes contato */

/** visualizar detalhes usuario */
 app.get('/view-user/:id', (req, res) => {
    //console.log(req.params.id);
    //res.send(req.params.id);
    User.findByPk(req.params.id, {
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    })
    .then((user) => {
        //console.log(user);
        res.render('view-user', {user: user.dataValues});
    }).catch(() => {
        /** criar a mensagem de usuario nao encontrado */
        req.flash("error_msg", "Erro: Usuário não encontrado");
        /** redirecionar o usuario */
        res.redirect('/list-user')
    })
})
/** fim visualizar detalhes usuario */

/** iniciar a conexao */
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});