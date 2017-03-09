<?php
 
require("config.php");

if(!empty($_POST)){

    if(empty($_POST['nomeaula'])||empty($_POST['descaula'])||empty($_POST['urlvideoaula'])||empty($_POST['urldocaula'])||empty($_POST['urlpptaula'])||empty($_POST['urlexercaula'])||empty($_POST['urlthumbnail'])){
       
		$response["success"] = 0; 
        $response["message"] = "Todos os campos são obrigatórios";
        die(json_encode($response));
    }
	
	
    $query = "SELECT COUNT(*) AS count FROM tbl_aula WHERE nome_aula = :nomeaula";
    
    $query_params = array(':nomeaula' => $_POST['nomeaula']); 
    
    
    try{
        
        $stmt = $db->prepare($query);
        $result = $stmt->execute($query_params);
		
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		$qtd_aula = $row["count"];
		//print_r($row);
		}

			if ($qtd_aula > 0) {

				$response["success"] = 0;
				$response["message"] = "Aula já cadastrado no sistema.";
				die(json_encode($response));
		}

		
    }catch(PDOException $ex){
        
        $response["success"] = 0;
        $response["message"] = "Ah não! Algo deu errado! =( Tente novamente mais tarde.";

        die(json_encode($response));
    }
   

    $query = "INSERT INTO tbl_aula (nome_aula, desc_aula, url_video_aula, url_doc_aula, url_ppt_aula, url_exerc_aula, url_thumbnail) VALUES (:nomeaula, :descaula, :urlvideoaula, :urldocaula, :urlpptaula, :urlexercaula, :urlthumbnail)";
    
    $query_params = array(
        ':nomeaula' => $_POST['nomeaula'],
        ':descaula' => $_POST['descaula'],
        ':urlvideoaula' => $_POST['urlvideoaula'],
        ':urldocaula' => $_POST['urldocaula'],
        ':urlpptaula' => $_POST['urlpptaula'],
        ':urlexercaula' => $_POST['urlexercaula'],
        ':urlthumbnail' => $_POST['urlthumbnail']);
 
    try {
        $stmt = $db->prepare($query);
        $result = $stmt->execute($query_params);
               
    } catch (PDOException $ex) {

        $response["success"] = 0;
        $response["message"] = "Erro no INSERT";

        die(json_encode($response));
    }
	

    $response["success"] = 1;
    $response["message"] = "Aula cadastrado com sucesso";
	

    echo json_encode($response);
        
}else{
    ?>

<h1>Cadastro de aula</h1>
<form action="cadaula.php" method="post">
    aula: <br/>
    <input type="text" name="aula" placeholder="aula"/><br/>
    Descricao: <br/>
    <textarea name="descricao" rows="10" cols="70"></textarea><br/>
    <input type="submit" value="Cadastrar aula"/>
</form>
<?php
}

?>