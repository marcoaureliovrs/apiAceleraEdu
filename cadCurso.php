<?php
 
require("config.php");

if(!empty($_POST)){

    if(empty($_POST['curso'])||empty($_POST['descricao'])){
        
		$response["success"] = 0; 
        $response["message"] = "Todos os campos são obrigatórios";
        die(json_encode($response));
    }
	
	
    $query = "SELECT COUNT(*) AS count FROM tbl_curso WHERE nome_curso = :curso";
    
    $query_params = array(':curso' => $_POST['curso']); 
    
    
    try{
        
        $stmt = $db->prepare($query);
        $result = $stmt->execute($query_params);
		
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		$qtd_curso = $row["count"];
		//print_r($row);
		}

			if ($qtd_curso > 0) {

				$response["success"] = 0;
				$response["message"] = "Curso já cadastrado no sistema.";
				die(json_encode($response));
		}

		
    }catch(PDOException $ex){
        
        $response["success"] = 0;
        $response["message"] = "Ah não! Algo deu errado! =( Tente novamente mais tarde.";

        die(json_encode($response));
    }
   

    $query = "INSERT INTO tbl_curso (nome_curso, desc_curso) VALUES (:curso, :descricao)";
    
    $query_params = array(
        ':curso' => $_POST['curso'],
		':descricao' => $_POST['descricao']
    );
 
    try {
        $stmt = $db->prepare($query);
        $result = $stmt->execute($query_params);
               
    } catch (PDOException $ex) {

        $response["success"] = 0;
        $response["message"] = "Curso está sendo cadastrado, tente novamente mais tarde.";

        die(json_encode($response));
    }
	

    $response["success"] = 1;
    $response["message"] = "Curso cadastrado com sucesso";
	

    echo json_encode($response);
        
}else{
    ?>

<h1>Cadastro de Curso</h1>
<form action="cadCurso.php" method="post">
    Curso: <br/>
    <input type="text" name="curso" placeholder="Curso"/><br/>
    Descricao: <br/>
    <textarea name="descricao" rows="10" cols="70"></textarea><br/>
    <input type="submit" value="Cadastrar Curso"/>
</form>
<?php
}

?>