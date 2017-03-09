<?php


require("config.php");

if(!empty($_POST)){

    if(empty($_POST['materia'])||empty($_POST['descricao'])||empty($_POST['cursorelacionado'])){
        
		$response["success"] = 0; 
        $response["message"] = "Todos os campos são obrigatórios";
        die(json_encode($response));
    }
	
	
    $query = "SELECT COUNT(*) AS count FROM tbl_materia WHERE nome_materia = :materia";
    $query_params = array(':materia' => $_POST['materia']); 
    
    
    try{
        
        $stmt = $db->prepare($query);
        $result = $stmt->execute($query_params);
		
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		$qtd_materia = $row["count"];
		//print_r($row);
		}

			if ($qtd_materia > 0) {

				$response["success"] = 0;
				$response["message"] = "Matéria já cadastrada no sistema.";
				die(json_encode($response));
		}

		
    }catch(PDOException $ex){
        
        $response["success"] = 0;
        $response["message"] = "Ah não! Algo deu errado! =( Tente novamente mais tarde.";

        die(json_encode($response));
    }
   

    $query = "INSERT INTO tbl_materia (nome_materia, desc_materia, cod_curso_relacionado) VALUES (:materia, :descricao, :cursorelacionado)";
    
    $query_params = array(
        ':materia' => $_POST['materia'],
		':descricao' => $_POST['descricao'],
        ':cursorelacionado' => $_POST['cursorelacionado']

    );
 
    try {

        $stmt = $db->prepare($query);
        $result = $stmt->execute($query_params);
               
    } catch (PDOException $ex) {

        $response["success"] = 0;
        $response["message"] = "Matéria já esta sendo cadastrada, tente novamente mais tarde.";

        die(json_encode($response));
    }
	

    $response["success"] = 1;
    $response["message"] = "Matéria Cadastrada com sucesso!";
	

    echo json_encode($response);
        
}else{
    ?>

<h1>Cadastro de materia</h1>
<form action="cadMateria.php" method="post">
    materia: <br/>
    <input type="text" name="materia" placeholder="materia"/><br/>
    Descricao: <br/>
    <textarea name="descricao" rows="10" cols="70"></textarea><br/>
    Codigo do curso relacionado: <br/>
    <input type="text" name="cursorelacionado" placeholder="Curso relacionado"/><br/>

    <input type="submit" value="Cadastrar materia"/>
</form>
<?php
}

?>