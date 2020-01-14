<?php
	$url = "http://api.tvmaze.com/lookup/shows?thetvdb=" . $MTvdbId;
	$results = @file_get_contents($url);
	if(!$results or $media_type!="tv")
	{
		//echo "error ajaxTVMAZE </br>";
	}
	else
	{
		//echo "sucess ajaxTVMAZE </br>";
		$data=json_decode($results,true);
		//var_dump($data);

		$tvmaze_kav=array(
			array("id","MTvmazeId",""),//int
			array("punzinho","MTvrageId",$data["externals"]["tvrage"]),
			array("punzinho","MTvdbId",$data["externals"]["thetvdb"]),
			array("type","MSt",""),//int
			array("status","MS",""),//int
			array("premiered","MRd",""),
			array("punzinho","MVaTvmaze",$data["rating"]["average"]*10),//int
			array("url","MUTvmaze", "")
		);
		$data["punzinho"]="";
		foreach($tvmaze_kav as $tvmaze_kavv)
		{
			list($arraymedia,$keysmedia) = assinginfotovariable($arraymedia, $keysmedia, mysql_real_escape_string($data[$tvmaze_kavv[0]]),$tvmaze_kavv[1], mysql_real_escape_string($tvmaze_kavv[2]));
		}
		
		$tvmaze_kav_lan=array(
			array("name","MN",""),
			array("summary", "MO", ""),
			array("punzinho","MPp", $data["image"]["original"])
		);
		foreach($tvmaze_kav_lan as $tvmaze_kav_lanv)
		{
			list($arraymedialan,$keysmedialan) = assinginfotovariable($arraymedialan, $keysmedialan, mysql_real_escape_string($data[$tvmaze_kav_lanv[0]]),$tvmaze_kav_lanv[1], mysql_real_escape_string($tvmaze_kav_lanv[2]));
		}
		
		
		/*PARA NETPROD*/
		if($data["network"]["name"]!="" and $data["network"]["name"]!="N/A")
		{
			$arraynetprod["values"][]=array($data["network"]["name"], $data["network"]["id"], "Network", $data["network"]["country"]["code"]);
			$arraynetprod["keys"][]= array("NpN", "NpTvmazeId", "NpTy", "NpPid");
		}
		
		/* PARA GENRES */
		$arraygenres=array_merge($arraygenres, $data["genres"]);
		
		/* PARA RUNTIME */
		$arrayruntime[]=$data["runtime"];

//$weighttvmaze=mysql_real_escape_string($data["weight"]);		
//$updatedtvmaze=mysql_real_escape_string($data["updated"]);
//$languagetvmaze=mysql_real_escape_string($data["language"]);
//$scheduletvmaze=mysql_real_escape_string(json_encode($data["schedule"]));
//$webChanneltvmaze=mysql_real_escape_string(json_encode($data["webChannel"]));
//$_linkstvmaze=mysql_real_escape_string(json_encode($data["_links"]));
	}
?>