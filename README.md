Olá,
Esta é a API do projeto aceleraedu, esta api foi desenvolvida utilizando a plataforma NodeJS com os seguintes frameworks/bibliotecas:
	"body-parser": "^1.15.2",
	"consign": "^0.1.2",
   	"express": "^4.14.0",
    "express-validator": "^2.20.8",
    "memcached": "^2.2.2",
    "morgan": "^1.7.0",
    "mysql": "^2.11.1",
    "restify": "^4.1.1",
    "soap": "^0.16.0",
    "winston": "^2.2.0"

Para testes foram utilizados os seguintes frameworks:
    "mocha": "^3.2.0",
    "supertest": "^2.0.1"

Para dar instart na aplicação em produção basta executar o comando:
    npm start

Para executar a rotina de teste automatizado na aplicação basta executar:
    npm test <controller>
    		<controller>
    			cursos
    			aulas
    			materias
				usuarios

Cada controle equivale a um arquivo de rota da aplicação, que contém todos os comportamentos possíveis e necessários para o bom gerenciamento do sistema, como cursos, que possui a consulta, o cadastro, atualização e deleção.



