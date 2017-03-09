<?php
 
require("config.php");

$query = "SELECT * FROM tbl_curso";

try {
    $stmt = $db->prepare($query);
    $result = @$stmt->execute($query_params);
} catch (PDOException $ex) {
			
    $response["success"] = 0;
    $response["message"] = "Erro no banco de dados";
}


$rows = $stmt->fetchAll();

if ($rows){

    $response["success"] = 1;
    $response["message"] = "Registros encontrados";
	

    $response["cursos"] = array();
    

    foreach ($rows as $row){
		
        $cada_curso = array();

		
        $cada_curso["codcurso"] = $row["cod_curso"];
        $cada_curso["curso"] = $row["nome_curso"];
        
		array_push($response["cursos"], $cada_curso);
    }
    
    
    echo json_encode($response);
}else{
		
    $response["success"] = 0;
    $response["message"] = "Registros não encontrados";
	
	
    die(json_encode($response));
}
?>