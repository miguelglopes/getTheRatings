<?php
	//AJAX NETFLIX
	
	$netflixmovieouserie=array(
		"movie" => "Movie",
		"tv" => "shows"
	);
	
	$url = "http://netflixroulette.net/api/api.php?title=" . rawurlencode($MOn) . "&year=" . rawurlencode($MY);
	//echo $url;
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	//curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_FAILONERROR, 1);
	$results = curl_exec($ch);
	$data=json_decode($results,true);
	if(!$results or curl_error($ch))
	{
		//echo "<br> error ajaxNETFLIX </br>";
		//echo curl_error($ch) . " </br>";
		curl_close($ch);
	}
	else
	{
		//echo "<br> sucess ajaxNETFLIX </br>";
		curl_close($ch);
		//print_r($data);
		$MNflixId=$data["show_id"];
		$nflix_kav=array(
			array("show_id","MNflixId",""),//int
			array("release_year","MY",""),//int
			array("punzinho","MVaNflix",$data["rating"]*20),//int
			array("punzinho","MUNflix", "http://dvd.netflix.com/" . $netflixmovieouserie[$media_type] . "/" . $MNflixId)
		);
		$data["punzinho"]="";
		foreach($nflix_kav as $nflix_kavv)
		{
			list($arraymedia,$keysmedia) = assinginfotovariable($arraymedia, $keysmedia,mysql_real_escape_string($data[$nflix_kavv[0]]),$nflix_kavv[1], mysql_real_escape_string($nflix_kavv[2]));
		}
		
		$nflix_kav_lan=array(
			array("show_title","MN",""),
			array("summary", "MO", ""),
			array("poster","MPp", "")
		);
		foreach($nflix_kav_lan as $nflix_kav_lanv)
		{
			list($arraymedialan,$keysmedialan) = assinginfotovariable($arraymedialan, $keysmedialan, mysql_real_escape_string($data[$nflix_kav_lanv[0]]),$nflix_kav_lanv[1], mysql_real_escape_string($nflix_kav_lanv[2]));
		}
		
		/* PARA GENEROS */
		$arraygenres[]=$data["category"];
		
		/* PARA RUNTIME */
		preg_match_all('!\d+!', $data["runtime"], $matches);
		$arrayruntime=array_merge($arrayruntime, $matches[0]);	
		
		
//$unitnetflix=mysql_real_escape_string($data["unit"]);
//$show_castnetflix=mysql_real_escape_string($data["show_cast"]);
//$directornetflix=mysql_real_escape_string($data["director"]);
//$mediatypenetflix=mysql_real_escape_string($data["mediatype"]);
	}
	?>