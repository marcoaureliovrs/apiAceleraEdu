<?php
 
require("config.php");

if (empty($_POST['codcurso'])) {
    $query = "SELECT * FROM tbl_materia";
} else {
    $query = "SELECT * FROM `tbl_materia` WHERE cod_curso_relacionado =:codcurso ";
    $query_params = array(':codcurso' => $_POST['codcurso']);
}


try {
    $stmt = $db->prepare($query);
    $result = @$stmt->execute($query_params);
} catch (PDOException $ex) {
			
    $response["success"] = 0;
    $response["message"] = "Erro no Banco de Dados";
}


$rows = $stmt->fetchAll();

if ($rows){

    $response["success"] = 1;
    $response["message"] = "Materias Cadastradas";
	

    $response["materias"] = array();
    

    foreach ($rows as $row){
		
        $cada_materia = array();

		
        $cada_materia["codmateria"] = $row["cod_materia"];
        $cada_materia["materia"] = $row["nome_materia"];
        
		array_push($response["materias"], $cada_materia);
    }
    
    
    echo json_encode($response);
}else{
		
    $response["success"] = 0;
    $response["message"] = "Matérias não cadastradas";
	
	
    die(json_encode($response));
}
?>