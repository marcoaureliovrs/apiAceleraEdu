<?php

 
require('config.php');

if(!empty($_POST)){
    
    if(empty($_POST['email'])||empty($_POST['password'])){
        $response["success"] = 0;
        $response["message"] = "Todos os campos sao obrigatorios";
        die(json_encode($response));
    }
	

    
    $query = "SELECT * FROM `tbl_usuario` WHERE email_usuario = :user ";
    $query_params = array(
        ':user' => $_POST['email']
    );
	
	
    try {	
        $stmt = $db->prepare($query);
        $result = $stmt->execute($query_params);
    } catch (PDOException $ex) {
        $response['success'] = 0 ;
        $response['message'] = "Erro no Banco de Dados, Por favor tente novamente";
        die(json_encode($response));
    }
	
	
	$is_login = false;
    $encr_user_pass = md5($_POST['password']);
	$row = $stmt->fetch();
	
	
    if ($row){
        
        if($encr_user_pass === $row['senha_usuario']){
            $is_login = true;
        }
    $response["usuario"] = array();

    $single_user = array();
    $single_user["nome_usuario"] = $row["nome_usuario"];
    $single_user["email_usuario"] = $row["email_usuario"];
    $single_user["cod_nivel_usuario"] = $row["cod_nivel_usuario"];


    array_push($response["usuario"], $single_user);
    }

    

    if($is_login){
	
        $response["success"] = 1;
        $response["message"] = "Login realizado com sucesso";
	
	
        echo json_encode($response);
    }else{
		
        $response["success"] = 0;
        $response["message"] = "Usuario ou senha incorretos";
		
        die(json_encode($response));
    }
    
}else{
?>
<h1>Login</h1>
<form action="login.php" method="post">
    E-mail: <br/>
    <input type="text" name="email" placeholder="Email"/><br/>
    Senha:<br/>
    <input type="password" name="password" placeholder="Senha"/><br/>
    <input type="submit" value="Login"/>
    <a href="register.php">Registrar-se</a>
</form>
<?php
}
?>

