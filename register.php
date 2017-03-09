<?php
 
 //Conexão com o Banco de dados
require("config.php");



//Validação de parâmetros vazios na programação
if(!empty($_POST)){

    if(empty($_POST['email'])||empty($_POST['password'])||empty($_POST['nomeusuario'])||empty($_POST['datanascimento'])){
		$response["success"] = 0; 
        $response["message"] = "Todos os campos são obrigatórios";
        die(json_encode($response));
    }
	

	//Consulta o banco de dados para saber se já não existe o e-mail passado
    $query = "SELECT COUNT(*) AS count FROM tbl_usuario WHERE email_usuario = :user";
    
    $query_params = array(
        ':user' => $_POST['email']
    ); 
    

    //Faz a conexão e a consulta ao banco de dados para saber se já existe o e-mail passado
    try{   
        $stmt = $db->prepare($query);
        $result = $stmt->execute($query_params);
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		$username_count = $row["count"];
		//print_r($row);
		}
                //Caso o numero de linhas seja maior que 0 siginifica que já existe o e-mail cadastrado
			if ($username_count > 0) {
				$response["success"] = 0;
				$response["message"] = "O e-mail informádo já foi cadastrado. Por favor tente novamente.";
				
				die(json_encode($response));	
		}

		
    }catch(PDOException $ex){
        
        $response["success"] = 0;
        $response["message"] = "Ah não! Algo deu errado =/. Tente novamente mais tarde";

        die(json_encode($response));
        
    }
   

    $query = "INSERT INTO tbl_usuario (email_usuario, senha_usuario, nome_usuario, nasc_usuario, cod_nivel_usuario) VALUES (:user, :pass, :displayname, :datanascimento, :nivelusuario)";

    //Encriptando a senha passada para o formato MD5
    $encr_user_pass = md5($_POST['password']);
    //Setando o nível padrão 1 para a permissão do usuário
    $nivel_usuario = 1;

    
    //$datanascimento= date("Y-m-d", strtotime($_POST['datanascimento']));
    $datanascimento = date('Y-m-d', strtotime(str_replace('-', '/', $_POST['datanascimento'])));
    
    //Parametros da Query
    $query_params = array(
        ':user' => $_POST['email'],
        ':pass' =>  $encr_user_pass,
		':displayname' => $_POST['nomeusuario'],
        ':datanascimento' => $datanascimento,
        ':nivelusuario' => $nivel_usuario
    );
 
    try {
        $stmt = $db->prepare($query);
        $result = $stmt->execute($query_params);
               
    } catch (PDOException $ex) {
        $response["success"] = 0;
        $response["message"] = "Usuário em uso, tente novamente mais tarde.";
        die(json_encode($response));
    }
	

    $response["success"] = 1;
    $response["message"] = "Usuário cadastrado com sucesso";
    //Apresenta todo o resultado obtido formatando no formato JSON
    echo json_encode($response);
        
}else{
    ?>

<h1>Register</h1>
<form action="register.php" method="post">
    E-mail: <br/>
    <input type="text" name="email" placeholder="E-mail"/><br/>
    Senha: <br/>
    <input name="password" type="password" placeholder="Senha"/><br/>
    Nome: <br/>
    <input type="text" name="nomeusuario" placeholder="Nome"/><br/>
    <input type="submit" value="Registrar"/>
</form>
<?php
}
?>