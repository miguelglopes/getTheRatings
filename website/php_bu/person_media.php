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

$credits=array(
"movie"=>"credits",
"tv"=>"credits",
"person"=>"combined_credits"
);

$original_name = array(
	"movie" => "original_title",
	"tv" => "original_name",
	"person" => "name",
);

$arraycredits=array(
"values" => [],
"keys" =>[]
);
$arraypessoa=array();
$media_type_antigo=$media_type;
//tmdb
$apikeytmdb = '56dc0d4b22d78c87610b733926334344';
$url = 'http://api.themoviedb.org/3/' . $media_type . "/" . $MTmdbId . '/' . $credits[$media_type] . '?&api_key=' . $apikeytmdb;
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FAILONERROR, 1);
$results = curl_exec($ch);
if(!$results or curl_error($ch))
{
	echo "<br> error personmaedia </br>";
	echo curl_error($ch) . " </br>";
	curl_close($ch);
}
else
{
	//echo "<br> success personmaedia </br>";
	curl_close($ch);
	$data=json_decode($results, true);
	//print_r($data);

	$i=0;
	foreach ($data["cast"] as $datav) 
	{
		if($media_type=="person")
		{
			$arraypessoa[$i]["media_type"]=$datav["media_type"];
			$arraycredits["values"][$i]["PMty"]=$datav["media_type"];
		}
		else
		{
			$arraypessoa[$i]["media_type"]="person";
			$arraycredits["values"][$i]["PMty"]=$media_type;
		}
		if(!$datav[$original_name[$arraypessoa[$i]["media_type"]]])
		{
			continue;
		}
		$arraycredits["values"][$i]["PJc"]=mysql_real_escape_string($datav["character"]);
		$arraycredits["values"][$i]["Porder"]=$i;
		$arraycredits["values"][$i][$movieouperson[$media_type][0]]=$MId;
		$arraycredits["values"][$i][$movieouperson[$media_type][1]]="";
		$arraycredits["values"][$i]["PDp"]="Cast";
		$arraypessoa[$i]["id"]=$datav["id"];
		$i++;
	}
	foreach ($data["crew"] as $datav) 
	{
		if($media_type=="person")
		{
			$arraypessoa[$i]["media_type"]=$datav["media_type"];
			$arraycredits["values"][$i]["PMty"]=$datav["media_type"];
		}
		else
		{
			$arraypessoa[$i]["media_type"]="person";
			$arraycredits["values"][$i]["PMty"]=$media_type;
		}
		if(!$datav[$original_name[$arraypessoa[$i]["media_type"]]])
		{
			continue;
		}
		$arraycredits["values"][$i]["PJc"]=mysql_real_escape_string($datav["job"]);
		$arraycredits["values"][$i]["Porder"]=$i;
		$arraycredits["values"][$i][$movieouperson[$media_type][0]]=$MId;
		$arraycredits["values"][$i][$movieouperson[$media_type][1]]="";
		$arraycredits["values"][$i]["PDp"]=mysql_real_escape_string($datav["department"]);
		$arraypessoa[$i]["id"]=$datav["id"];
		$i++;
	}
	$arraycredits["keys"]=array("PMty","PJc", "Porder", $movieouperson[$media_type][0], $movieouperson[$media_type][1], "PDp");
		
	//echo count($arraycredits["values"]) . " <br>";
	//echo json_encode($arraypessoa) . " <br>";
	
	//WRITE PERSONS
	$ipersonmedia=0;
	set_time_limit(300);
	foreach($arraypessoa as $arraypessoav)
	{
		$MTmdbId=$arraypessoav["id"];
		$media_type=$arraypessoav["media_type"];
		$sqlgetmedia="
			SELECT 
				media.MId
			FROM media
			INNER JOIN medialan ON media.MId = medialan.MId
			WHERE media.MTmdbId = '" . $MTmdbId . "' AND medialan.LaId='" . $LaId . "' LIMIT 1
		;";
		//GET MEDIA IF EXISTS
		if ($pum = $link->query($sqlgetmedia)->fetch_array())
		{
			//echo "movie existe <br>";
			$MId=$pum["MId"];
			//echo $MId . " if <br>";
		} 
		else
		{
			//echo "faz movie a partir de colecao";
			include "media/media.php";
			//echo $MId . " else <br>";			
		}
		$arraycredits["values"][$ipersonmedia][$movieouperson[$media_type_antigo][1]]=$MId;
		$ipersonmedia++;
	}
	
	//echo  "<br>" . json_encode($arraycredits) . "<br>";
	
	
	//WRITE PERSON MEDIA
	write_multiple_lines_multiplevars_1query($link, "person_media", $arraycredits["keys"], $arraycredits["values"]);
}
?>		