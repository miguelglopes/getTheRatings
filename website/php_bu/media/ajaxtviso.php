<?php
	//AJAX tviso CORRER APENAS SE NAO FOR PESSOA
	
	//VARIABLES
	include "ajaxkey.php";
	$tvisomovieouserie=array(
		"2" => "movie",
		"1" => "series",
		"3" => "documentary",
		"4" =>"tv-show"
	);
	
	$url = "https://api.tviso.com/media/find/external?auth_token=" . $apikeytviso . "&imdb=" . $MImdbId . "&locale=" . $LaId;
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_FAILONERROR, 1);
	$results = curl_exec($ch);
	$data1=json_decode($results,true);
	if(!$results or curl_error($ch) or $data1["error"] or $data1["results"][0]==0 or !$data1["results"][0]["mediaInfo"])
	{
		//echo "<br> error ajaxtviso <br>";
		//echo curl_error($ch) . " <br>";
		//echo json_encode($results);
		curl_close($ch);
	}
	else
	{
		//echo "<br> sucess ajaxtviso <br>";
		curl_close($ch);
		//print_r($data1);
		$data=$data1["results"][0]["mediaInfo"];
		$MY=$data["year"];
		$MMtTviso=$data["mediaType"];
		$MTvisoId=$data["idm"];
		$MN=$data["name"];
		if(array_key_exists ("backdrop", $data["images"]))
			$bp="https://img.tviso.com/COUNTRY/TYPE/SIZE/VALUE" . $data["images"]["backdrop"];
		else
			$bp="";
		$tviso_kav=array(
			array("idm","MTvisoId",""),//int
			array("imdb","MImdbId",""),
			array("mediaType","MMtTviso",""),//int
			array("punzinho","MVaTviso",$data["rating"]*10),//int
			array("original_name","MOn",""),
			array("year", "MY", ""),
			array("ratings_num", "MVcTviso", ""),//int
			array("punzinho","MBp", $bp),
			array("punzinho", "MUTviso", "https://www.tviso.com/media/" . $tvisomovieouserie[$MMtTviso] . "/" . $MTvisoId . "/" . $MN)
		);
		$data["punzinho"]="";
		foreach($tviso_kav as $tviso_kavv)
		{
			if(array_key_exists ($tviso_kavv[0], $data))
				list($arraymedia,$keysmedia) = assinginfotovariable($arraymedia, $keysmedia, mysql_real_escape_string($data[$tviso_kavv[0]]),$tviso_kavv[1], mysql_real_escape_string($tviso_kavv[2]));
		}
		
		$tviso_kav_lan=array(
			array("name","MN",""),
			array("plot", "MO", ""),
			array("punzinho","MPp", "https://img.tviso.com/COUNTRY/TYPE/SIZE/VALUE" . $data["images"]["poster"])
		);
		foreach($tviso_kav_lan as $tviso_kav_lanv)
		{
			list($arraymedialan,$keysmedialan) = assinginfotovariable($arraymedialan, $keysmedialan, mysql_real_escape_string($data[$tviso_kav_lanv[0]]),$tviso_kav_lanv[1], mysql_real_escape_string($tviso_kav_lanv[2]));
		}
				
		/* PARA PAISES_MEDIA */
		if(array_key_exists("country",$data))
			$arraycountries= array_merge($data["country"], $arraycountries);
		
		/*PARA LINGUAS_MEDIA*/
		if(array_key_exists("languages",$data))
			$arraylanguages= array_merge($data["languages"], $arraylanguages);
		
		/*PARA GENEROS_MEDIA*/
		if(array_key_exists("genres",$data))
			$arraygenres=array_merge($arraygenres, $data["genres"]);

		/*PARA KEYWORDS_MEDIA */
		if(array_key_exists("keywords",$data))
			$arraykeywords=$data["keywords"];
		
		/* PARA RUNTIME */
		if(array_key_exists("runtime",$data))
			$arrayruntime[]=$data["runtime"];

//$seasonstviso=@mysql_real_escape_string(json_encode($data["results"][0]["mediaInfo"]["runtime"]));	//$seasonstviso=@mysql_real_escape_string(json_encode($data["results"][0]["mediaInfo"]["seasons"])); 
//$casttviso=mysql_real_escape_string(json_encode($data["results"][0]["mediaInfo"]["cast"]));
//$mediaStyletviso=mysql_real_escape_string($data["results"][0]["mediaInfo"]["mediaStyle"]);
//$maingenretviso=mysql_real_escape_string($data["results"][0]["mediaInfo"]["maingenre"]);
//$episodestviso=@mysql_real_escape_string($data["results"][0]["mediaInfo"]["episodes"]);
//$id_mediatviso=mysql_real_escape_string($data["results"][0]["mediaInfo"]["id_media"]);
//$statustviso=mysql_real_escape_string($data["results"][0]["mediaInfo"]["status"]);
//$broadcasttviso=mysql_real_escape_string($data["results"][0]["mediaInfo"]["broadcast"]);
//$lists_numtviso=@mysql_real_escape_string($data["results"][0]["mediaInfo"]["lists_num"]);
//$total_userstviso=mysql_real_escape_string($data["results"][0]["mediaInfo"]["total_users"]);
//$directortviso=mysql_real_escape_string(json_encode($data["results"][0]["mediaInfo"]["director"]));
//$composetviso=mysql_real_escape_string(json_encode($data["results"][0]["mediaInfo"]["compose"]));
//$writetviso=mysql_real_escape_string(json_encode($data["results"][0]["mediaInfo"]["write"]));
//$liststviso=@mysql_real_escape_string(json_encode($data["results"][0]["mediaInfo"]["lists"]));	//$rate_summarytviso=mysql_real_escape_string(json_encode($data["results"][0]["mediaInfo"]["rate_summary"]));

		/*ISTO E PARA OS PRODUTORES E NAO PROD COMPANIES
		/*PARA NETPROD
		for($i=0; $i<count($data["produce"]); $i++)
		{
			if($data["produce"][$i]["name"]!="" and $data["produce"][$i]["name"]!="N/A")
			{
				$arraynetprod["values"][] = array($data["produce"][$i]["name"], $data["produce"][$i]["imdb"], "Production Company");
				$arraynetprod["keys"][] = array("NpN", "NpImdbId", "NpTy");
			}
		}
		*/

	}
?>