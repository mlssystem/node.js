# COMO RODAR O PROJETO BAIXADO
### Esse projeto está sendo implementado com apoio das aulas do curso de Node.js com o Mestre Cesar da [Celke](https://celke.com.br/curso/curso-de-node-js)

1. Com o [Node.js](https://nodejs.org/en) e MSQL instalados em sua maquina basta abrir o terminal (NODE, CMD, GIT, ou outro) e digite o comando abaixo para instalar as dependencias usadas no projeto e que estão especificadas no aquivo "package.json":
Observação: Para rodar os comandos abaixo tem que estar no diretório do projeto. 👍
```
npm install
```
2. Criar um banco de dados e alterar as credenciais no arquivo ".envi" que está no diretório raiz

3. O comando abaixo cria as tabelas (que estão no diretório /migrations) no banco de dados o qual você criou e especificou no arquivo ".env" como orientado no passo 2
```
npx sequelize-cli db:migrate
```

4. O comando abaixo insere algumas informações (que estão no diretório /seeders) nas tabelas
```
npx sequelize-cli db:seed:all
```

5. Rode o comando no terminal 
```
node app.js
```

6. Digite o endereço abaixo no seu navegador e pronto! 
http://localhost:8080


> ### Observação:
>
>> Quando eu via projetos em Node.js tinha vontade de baixar mas não fazia ideia como rodar! 
>
>>> Por isso resolvi resolvi descrever os passos.
>
>>>> Qualquer dúvidas conte comigo! 
>
>>>> `Paz!!!`


# APRESENTAÇÃO:

![home](https://github.com/mlssystem/node.js/blob/main/apresentacao/home.png)

![cadastro](https://github.com/mlssystem/node.js/blob/main/apresentacao/cadastrar.png)

![listar](https://github.com/mlssystem/node.js/blob/main/apresentacao/listar.png)

![visualizar](https://github.com/mlssystem/node.js/blob/main/apresentacao/editar.png)

![visualizar](https://github.com/mlssystem/node.js/blob/main/apresentacao/visualizar.png)


--

# INFORMAÇÕES PARA CRIAÇÃO DO PROJETO DO ZERO

SEQUÊNCIA PARA CRIAR O PROJETO
```
npm init
```

Gerenciar as requisições, rotas e URLs, entre outra funcionalidades
```
npm install --save express
```

Manipular variaveis de ambiente
```
npm install --save dotenv
```

O Handlebars é um processador de templates que gera paginas HTML de forma dinamica
```
npm install --save express-handlebars 
```

Sequelize é uma biblioteca Javascript que facilita o gerenciamento do banco de dados SQL
```
npm install --save sequelize
```

Instalar o drive do banco de dados
```
npm install --save mysql2
```

Sequelize-cli interface de linha de comando usada para criar modelos, configuracoes e arquivos de migracao para banco de dados
```
npm install --save-dev sequelize
```
Iniciar o sequelize-cli e criar o arquivo config
```
npx sequelize-cli init
```

Criar a base de dados
```
CREATE DATABASE seuBanco CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Criar migration
```
npx sequelize-cli migration:generate --name create-users
```

Alterar tabela se necessário
```
npx sequelize-cli migration:generate --name alter-users
```

Executar migration
```
npx sequelize-cli db:migrate
```

Criar seeders
```
npx sequelize-cli seed:generate --name users
```

Executar as seeders
```
npx sequelize-cli db:seed:all
```
Abrir o endereço no navegador para acessar a pagina inicial
### http://localhost:8080

Instalar o modulo para criptografar a senha
```
npm install --save bcryptjs
```

Receber os dados do formulario
```
npm install --save body-parser
```

Criar tabela 
```
npx sequelize-cli model:generate --name --attributes name:string,email:string,password:string,image:string

npx sequelize-cli model:generate --name banco --attributes banco:integer,name:string,operador:integer,tipo_conta:integer
```

Criar sessão e armazenar dados no servidor
```
npm install --save express-session
```

Flash é uma área especial da sessão usada para armazenar mensagens
```
npm install --save connect-flash
```

Validar formulario
```
npm install --save yup
```

Instalar, o módulo Passport é uma midleware para a implementação de autenticação
```
npm install --save passport
```

Instalar a estratégia de validação local
```
npm install --save passport-local
```
