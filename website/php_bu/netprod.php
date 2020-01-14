<?php

/*
$MTmdbId="0";
$MImdbId="0";
$MTvdbId="0";
$MY="0";
$MOn="0";
$CId="0";

$MId=308;
$MTmdbId=338;
$media_type="movie";
$LaId="en";
*/

$arraynetprod=array(
"values" => [],
"keys" =>[]
);
//tmdb
$apikeytmdb = '56dc0d4b22d78c87610b733926334344';
$url = 'http://api.themoviedb.org/3/company/' . $NpTmdbId . '?&api_key=' . $apikeytmdb;
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FAILONERROR, 1);
$results = curl_exec($ch);
if(!$results or curl_error($ch))
{
	//echo "<br> error netprod </br>";
	//echo curl_error($ch) . " </br>";
	curl_close($ch);
}
else
{
	//echo "<br> success personmaedia </br>";
	curl_close($ch);
	$data=json_decode($results, true);
	//print_r($data);
	$arraynetprod["values"]["NpO"]=$data["description"];
	$arraynetprod["values"]["NpHq"]=$data["headquarters"];
	$arraynetprod["values"]["NpH"]=$data["homepage"];
	if($data["logo_path"])
		$pp="http://image.tmdb.org/t/p/wsize" . $data["logo_path"];
	else
		$pp="";
	$arraynetprod["values"]["NpLp"]=$pp;
	$arraynetprod["values"]["NpTmdbId"]=$NpTmdbId;
	$arraynetprod["values"]["jafezajax"]=1;
	$arraynetprod["keys"]=array("NpO","NpHq","NpH","NpLp","NpTmdbId","jafezajax");
	
	write_one_line($link, "netprod", $arraynetprod["keys"], $arraynetprod["values"], "NpId");
}
?>		