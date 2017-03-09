<?php
 
//php56 occ maintenance:install --database "mysql" --database-name "aceleradrive"  --database-user "aceleradrive" --database-pass"Utbt1992mavrs" --database-host "aceleradrive.mysql.dbaas.com.br" --admin-user "admin" --admin-pass "Maltx26792mavrs"

require("config.php");

 if(empty($_POST['semestre'])){
        $response["success"] = 0;
        $response["message"] = "Todos os campos sao obrigatorios";
        die(json_encode($response));
    }


//Consulta Cursos
$queryCursos = "SELECT * FROM tbl_curso";

try {
    $stmtCursos = $db->prepare($queryCursos);
    $result = @$stmtCursos->execute($query_params);
} catch (PDOException $ex) {
    $response["success"] = 0;
    $response["message"] = "Erro no banco de dados";
}


//Consulta quantidade de matérias
   $queryMaterias = "SELECT count(*) as qtd_materias FROM tbl_materia INNER JOIN tbl_curso ON tbl_materia.cod_curso_relacionado = tbl_curso.cod_curso WHERE semestre = :semestre;";
    $query_params = array(
        ':semestre' => $_POST['semestre']
    );
    try {   
        $stmtMaterias = $db->prepare($queryMaterias);
        $result = $stmtMaterias->execute($query_params);
    } catch (PDOException $ex) {
        $response['success'] = 0 ;
        $response['message'] = "Erro no Banco de Dados, Por favor tente novamente";
        die(json_encode($response));
    }




$rowsCursos = $stmtCursos->fetchAll();
$rowsMaterias = $stmtMaterias->fetchAll();

if ($rowsCursos&&$rowsMaterias){
    $response["success"] = 1;
    $response["message"] = "Registros encontrados";
    $response["cursos"] = array();
    
    foreach ($rowsCursos as $row){
        $cada_curso = array();
        $cada_curso["codcurso"] = $row["cod_curso"];
        $cada_curso["curso"] = $row["nome_curso"];
		array_push($response["cursos"], $cada_curso);
    }

    $qtd_materias = $rowsMaterias["qtd_materias"];
    array_push($response["materias"], $qtd_materias);
    
    echo json_encode($response);
}else{
		
    $response["success"] = 0;
    $response["message"] = "Registros não encontrados";
	
	
    die(json_encode($response));
}
?>