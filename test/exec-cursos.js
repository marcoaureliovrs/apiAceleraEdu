MacBook:apiAceleraEdu MarcoGorak$ NODE_ENV='test' node_modules/mocha/bin/mocha 
consign v0.1.2 Initialized in /Users/MarcoGorak/Sites/Projetos/Em Andamento/AceleraEdu/apiAceleraEdu
+ ./controllers/aulas.js
+ ./controllers/cursos.js
+ ./controllers/materias.js
+ ./controllers/usuarios.js
! Ignoring hidden entity /Users/MarcoGorak/Sites/Projetos/Em Andamento/AceleraEdu/apiAceleraEdu/models/.DS_Store
+ ./models/AulasDao.js
+ ./models/CursosDao.js
+ ./models/MateriasDao.js
+ ./models/UsuariosDao.js
+ ./models/connectionFactory.js
+ ./services/logger.js
+ ./services/memcachedClient.js


  #CursosController
Registrando um novo curso na base de dados
Curso criado
    ✓ #Cadastro de curso com dados validos (448ms)
Erros de validacao encontrados
nova chave adicionada ao cache: curso-17
    ✓ #Cadastro de curso com campos em branco (41ms)
consultando curso: 1
MISS - chave nao encontrada
Curso encontrado: [{"cod_curso":1,"nome_curso":"Pedagogia","desc_curso":"Curso voltado a educa","valor_curso":0}]
    ✓ #Consultando o curso com código 1 (128ms)
Curso atualizado
    ✓ #Atualização de curso com o codigo 4 (75ms)
Curso deletado
    ✓ #Deletando o curso com código 11 (84ms)


  5 passing (805ms)
