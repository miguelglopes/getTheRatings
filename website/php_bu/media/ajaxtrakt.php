<?php

	//AJAX trakt CORRER APENAS SE NAO FOR PESSOA
	
	//VARIABLES
	$apikeytrakt="1ea0d17a81dc9b5eedb020903b77d27b8199171a8562a2434d9120f3bcedf197";
	$traktmovieouserie = array(
		"movie" => "movies",
		"tv" => "shows"
	);
	$traktheader = array('Content-Type:application/json', 'trakt-api-version:2', 'trakt-api-key:' . $apikeytrakt);
	//$imdb_id
	//$media_type
	
	//AJAX
	$url = "https://api-v2launch.trakt.tv/" . $traktmovieouserie[$media_type] . "/" . $MImdbId . "/ratings";
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $traktheader);
	curl_setopt($ch, CURLOPT_FAILONERROR, 1);
	$results = curl_exec($ch);
	$data=json_decode($results,true);
	if(!$results or curl_error($ch))
	{
		//echo "error ajaxtrakt </br>";
		//echo curl_error($ch) . " </br>";
		curl_close($ch);
	}
	else
	{
		//echo "sucess ajaxtrakt </br>";
		curl_close($ch);
		//var_dump($data);
		
		$trakt_kav=array(
			array("punzinho","MVaTrakt",$data["rating"]*10),//int
			array("votes","MVcTrakt",""),//int
			array("punzinho","MUTrakt","https://trakt.tv/" . $traktmovieouserie[$media_type] . "/" . $MImdbId)
		);
		$data["punzinho"]="";
		foreach($trakt_kav as $trakt_kavv)
		{
			list($arraymedia,$keysmedia) = assinginfotovariable($arraymedia, $keysmedia, mysql_real_escape_string($data[$trakt_kavv[0]]),$trakt_kavv[1], mysql_real_escape_string($trakt_kavv[2]));
		}
		
//$distributiontrakt=mysql_real_escape_string(json_encode($data["distribution"]));//text jsondecode		
	}


?>