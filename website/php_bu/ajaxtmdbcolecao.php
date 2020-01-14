<?php

$arraycolecao=array(
"values" => array(),
"keys" =>[]
);

//tmdb
$apikeytmdb = '56dc0d4b22d78c87610b733926334344';
$url = 'http://api.themoviedb.org/3/collection/' . $CTmdbId . '?&api_key=' . $apikeytmdb . '&language=' . $LaId;
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FAILONERROR, 1);
$results = curl_exec($ch);
$data=json_decode($results, true);

if($data["poster_path"])
	$pp="http://image.tmdb.org/t/p/wsize" . $data["poster_path"];
else
	$pp="";
if($data["backdrop_path"])
	$bp="http://image.tmdb.org/t/p/wsize" . $data["backdrop_path"];
else
	$bp="";

$arraycolecao["values"][]=$CTmdbId;
$arraycolecao["values"][]=mysql_real_escape_string($data["name"]);//CN
$arraycolecao["values"][]=mysql_real_escape_string($pp);//CPp
$arraycolecao["values"][]=mysql_real_escape_string($bp);//CBp
$arraycolecao["values"][]=mysql_real_escape_string($data["overview"]);//CO
$arraycolecao["values"][]=$LaId;
$arraycolecao["keys"]=array("CTmdbId","CN","CPp","CBp", "CO","LaId");

for($i=0; $i<count($data["parts"]); $i++)
{
	$moviearray[$i]=$data["parts"][$i]["id"];
}
//print_r($moviearray);

//WRITE COLECAO TABLE
//echo "<br> array_colecao: " . json_encode($arraycolecao) . "<br>";
$CId=write_one_line($link, "colecao", $arraycolecao["keys"], $arraycolecao["values"], "CId");

//OBTER TODOS OS MOVIES DA COLECAO
//WRITE ROW
foreach($moviearray as $moviearrayv)
{
	$MTmdbId=$moviearrayv;
	//echo $MTmdbId;
	$sqlgetmedia="
		SELECT EXISTS(SELECT 
			*
		FROM media
		INNER JOIN medialan ON media.MId = medialan.MId
		WHERE media.MTmdbId = '" . $MTmdbId . "' AND medialan.LaId='" . $LaId . "' LIMIT 1)
	;";
	//GET MEDIA IF EXISTS
	if ($pum = $link->query($sqlgetmedia)->fetch_array()[0])
	{
		//echo "movie existe <br>";
		//print_r($media) . " <br>";
	} 
	else
	{
		//echo "faz movie a partir de colecao";
		include "media/media.php";	
	}
}

?>
