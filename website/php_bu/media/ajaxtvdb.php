<?php
	//VARIABLES
	$apikeytvdb = "D02DFCD117315CAD";
	
	$url = 'http://query.yahooapis.com/v1/public/yql?q=' . rawurlencode('select * from xml where url="http://thetvdb.com/api/' . $apikeytvdb . '/series/' . $MTvdbId . '"') . '&format=json';

	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_FAILONERROR, 1);
	$results = curl_exec($ch);
	$data1=json_decode($results,true);
	if(!$results or curl_error($ch) or !$data1["query"]["results"])
	{
		//echo "error ajaxtvdb </br>";
		//echo curl_error($ch) . " </br>";
		curl_close($ch);
	}
	else
	{
		//echo "sucess ajaxtvdb </br>";
		curl_close($ch);
		//var_dump($data);
		$data=$data1["query"]["results"]["Data"]["Series"];
		$MTvdbId=$data["id"];
		$tvdb_kav=array(
			array("ContentRating","MRa",""),
			array("FirstAired","MRd",""),
			array("IMDB_ID","MImdbId",""),
			array("id","MTvdbId",""),
			array("punzinho","MVaTvdb",$data["Rating"]*10),//int
			array("RatingCount", "MVcTvdb", ""),//int
			array("banner","MBp", ""),
			array("Status","MS",""),
			array("punzinho","MUTvdb","http://thetvdb.com/?tab=series&id=" . $MTvdbId)
		);
		$data["punzinho"]="";
		foreach($tvdb_kav as $tvdb_kavv)
		{
			list($arraymedia,$keysmedia) = assinginfotovariable($arraymedia, $keysmedia, mysql_real_escape_string($data[$tvdb_kavv[0]]),$tvdb_kavv[1], mysql_real_escape_string($tvdb_kavv[2]));
		}
		
		$tvdb_kav_lan=array(
			array("SeriesName","MN",""),
			array("Overview", "MO", ""),
			array("poster","MPp", "")
		);
		foreach($tvdb_kav_lan as $tvdb_kav_lanv)
		{
			list($arraymedialan,$keysmedialan) = assinginfotovariable($arraymedialan, $keysmedialan, mysql_real_escape_string($data[$tvdb_kav_lanv[0]]),$tvdb_kav_lanv[1], mysql_real_escape_string($tvdb_kav_lanv[2]));
		}
		
		/*PARA NETPROD*/
		$netprodtvdb=explode('|', $data["Network"]);
		$netprodtvdb2=explode('|', $data["NetworkID"]);
		for($i=0; $i<count($netprodtvdb); $i++)
		{
			if($netprodtvdb[$i]!="" and $netprodtvdb[$i]!="N/A")
			{
				$arraynetprod["values"][]= array($netprodtvdb[$i], $netprodtvdb2[$i], "Network");
				$arraynetprod["keys"][]= array("NpN", "NpTvdbId", "NpTy");
			}
		}
		
		/* PARA GENEROS */
		$arraygenres=array_merge($arraygenres, explode('|', $data["Genre"]));
		
		/* PARA RUNTIME */
		$arrayruntime[]=$data["Runtime"];

//$seriesidtvdb=mysql_real_escape_string($data["query"]["results"]["Data"]["Series"]["Language"]);
//$seriesidtvdb=mysql_real_escape_string($data["query"]["results"]["Data"]["Series"]["SeriesID"]);
//$addedtvdb=mysql_real_escape_string($data["query"]["results"]["Data"]["Series"]["added"]);
//$addedbytvdb=mysql_real_escape_string($data["query"]["results"]["Data"]["Series"]["addedBy"]);
//$fanarttvdb=mysql_real_escape_string($data["query"]["results"]["Data"]["Series"]["fanart"]);		
//$lastupdatedtvdb=mysql_real_escape_string($data["query"]["results"]["Data"]["Series"]["lastupdated"]);
//$tms_wanted_oldtvdb=mysql_real_escape_string($data["query"]["results"]["Data"]["Series"]["tms_wanted_old"]);
//$zap2it_idtvdb=mysql_real_escape_string($data["query"]["results"]["Data"]["Series"]["zap2it_id"]);
//$actorstvdb=mysql_real_escape_string($data["query"]["results"]["Data"]["Series"]["Actors"]);
//$airs_dayofweektvdb=mysql_real_escape_string($data["query"]["results"]["Data"]["Series"]["Airs_DayOfWeek"]);
//$airs_timetvdb=mysql_real_escape_string($data["query"]["results"]["Data"]["Series"]["Airs_Time"]);

	}
?>