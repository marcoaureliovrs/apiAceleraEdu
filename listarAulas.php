<?php
 
 //Conexão com o Banco de dados
require("config.php");


//Query que lista todas as aulas cadastradas na tabela tbl_aula
if (empty($_POST['codmateria'])) {
    $query = "SELECT * FROM tbl_aula";
} else {
    $query = "SELECT * FROM `tbl_aula` WHERE fk_cod_materia = :codmateria ";
    $query_params = array(':codmateria' => $_POST['codmateria']);
}

//Executa a consulta das aulas cadastradas
try {
    $stmt = $db->prepare($query);
    $result = @$stmt->execute($query_params);
} catch (PDOException $ex) {
			
    $response["success"] = 0;
    $response["message"] = "Erro no Banco de Dados";
}


//Passa o resultado da consulta para a variável $rows
$rows = $stmt->fetchAll();

//Caso tenha linhas quer dizer que há registros na tabela e esses serão passadados para um Array
if ($rows){
    $response["success"] = 1;
    $response["message"] = "Aulas Cadastradas";
    $response["aulas"] = array();

    
    /** Extraindo os registros do Array $row[]
        Extrai cada aula do array $row[] e passa para o array $cada_aula[] que por
        sua vez é passado para o array $response[] que é apresentado através de um método Json
    */
    foreach ($rows as $row){
        $cada_aula = array();
        $cada_aula["codaula"] = $row["cod_aula"];
        $cada_aula["nomeaula"] = $row["nome_aula"];
        $cada_aula["descaula"] = $row["desc_aula"];
        $cada_aula["urlvideoaula"] = $row["url_video_aula"];
        $cada_aula["urldocaula"] = $row["url_doc_aula"];
        $cada_aula["urlpptaula"] = $row["url_ppt_aula"];
        $cada_aula["urlexercaula"] = $row["url_exerc_aula"];
        $cada_aula["urlthumbnail"] = $row["url_thumbnail"];

        
		array_push($response["aulas"], $cada_aula);
    }
    
    echo json_encode($response);

/*
Caso não tenha linhas quer dizer que não há registros na tabela assim retornando o código 
0 e a mensagem de Aulas não cadastradas  
*/
}else{
		
    $response["success"] = 0;
    $response["message"] = "Aulas não cadastradas";
    die(json_encode($response));
}
?>