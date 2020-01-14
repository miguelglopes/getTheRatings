<?php

//$MId="110";
//GET THESE FROM THE TABLE

$sqltr="
	SELECT 
		MTy,
		MTmdbId,
		MTvisoId,
		MMtTviso,
		MY,
		MOn
	FROM media
	WHERE MId = '" . $MId . "'
;";
//GET MEDIA IF EXISTS
if ($result = $link->query($sqltr)->fetch_array(MYSQL_ASSOC))
{
	//print_r($result);
	$media_type=$result["MTy"];
	$MTmdbId=$result["MTmdbId"];
	$MTvisoId=$result["MTvisoId"];
	$MMtTviso=$result["MMtTviso"];
	$MY=$result["MY"];
	$MOn=$result["MOn"];
	$network="";
} 
else
{
	echo "<br> row doesnt exist: " . $link->error . "<br>";
}


$meternotrailer=array(
	"movie" => " movie ",
	"tv" => " tv show "
);
$meternotrailer2=array(
	$MOn . " official trailer",
	$MOn . " trailer",
	$MOn . " promo",
	$MOn . " first look",
	$MOn . " featurette",
	$MOn . " opening credits",
	$MOn . " season 1 official trailer",
	$MOn . " season 1 trailer",
	$MOn . " season 1 promo",
	$MOn . " season 1 first look",
	$MOn . " season 1 featurette",
	$MOn . " season 1 opening credits"
)
;

$arraytrailer=array(
"TId"=>array(),
"THr"=>array()
);

if(count($arraytrailer["TId"])<3)
{
	$apikeytmdb = '56dc0d4b22d78c87610b733926334344';
	$url = "http://api.themoviedb.org/3/" . $media_type . "/" . $MTmdbId . "/videos?&api_key=" . $apikeytmdb;
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_FAILONERROR, 1);
	$results = curl_exec($ch);
	if(!$results or curl_error($ch))
	{
		//echo "<br> error ajaxtmdb </br>";
		//echo curl_error($ch) . " </br>";
		curl_close($ch);
	}
	else
	{
		//echo "<br> success ajaxtmdb </br>";
		curl_close($ch);
		$data=json_decode($results, true);
		//print_r($data["results"]);
		foreach($data["results"] as $datav)
		{
			if($datav["type"]=="Trailer" or $datav["type"]=="Promo")
			{
				$arraytrailer["TId"][]=$datav["key"];
				$arraytrailer["THr"][]='https://www.youtube.com/embed/' . $datav["key"] . '?rel=0&autoplay=1&iv_load_policy=3';
			}
		}
	}
}

$arraytrailer["TId"]=array_values(array_unique(array_filter($arraytrailer["TId"])));
$arraytrailer["THr"]=array_values(array_unique(array_filter($arraytrailer["THr"])));
if(count($arraytrailer["TId"])<3)
{
	$url = 'http://query.yahooapis.com/v1/public/yql?q=' . rawurlencode('select * from json where url="' . "https://www.tviso.com/media/trailer?idm=" . $MTvisoId . "&mediaType=" . $MMtTviso . '"') . '&format=json';
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_FAILONERROR, 1);
	$results = curl_exec($ch);
	$data=json_decode($results, true);
	if(!$results or curl_error($ch) or @!$data["query"]["results"]["json"]["video"]["url"])
	{
		//echo "<br> error ajaxtviso </br>";
		//echo curl_error($ch) . " </br>";
		curl_close($ch);
	}
	else
	{
		//echo "<br> success ajaxtviso </br>";
		curl_close($ch);
		//print_r($data["query"]["results"]["json"]["video"]["url"]);
		$arraytrailer["TId"][]=explode( "?v=" , $data["query"]["results"]["json"]["video"]["url"])[1];
		$arraytrailer["THr"][]='https://www.youtube.com/embed/' . explode( "?v=" , $data["query"]["results"]["json"]["video"]["url"])[1] . '?rel=0&autoplay=1&iv_load_policy=3';
	}
}

/*
$arraytrailer=array(
"TId"=>array(),
"THr"=>array()
);
*/

$arraytrailer["TId"]=array_values(array_unique(array_filter($arraytrailer["TId"])));
$arraytrailer["THr"]=array_values(array_unique(array_filter($arraytrailer["THr"])));
if(count($arraytrailer["TId"])<3)
{
	$youtubekey= "AIzaSyC851w4wHGNZEXNuKy8q9m9F1bq2CYVz3M";
	$indextrailer=0;
	while(count($arraytrailer["TId"])<3)
	{
		$url="https://www.googleapis.com/youtube/v3/search?&key=" . $youtubekey . '&part=snippet&type=video&q='.rawurlencode($network . " " . $meternotrailer[$media_type] . $MY . ' intitle:"' . $meternotrailer2[$indextrailer] . '"');
		//echo $url;
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FAILONERROR, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$results = curl_exec($ch);
		if(!$results or curl_error($ch))
		{
			//echo "<br> error ajaxyoutube </br>";
			//echo curl_error($ch) . " </br>";
			curl_close($ch);
		}
		else
		{
			//echo "<br> success ajaxyoutube </br>";
			curl_close($ch);
			$data=json_decode($results, true);
			//echo json_encode($data["items"]);
			foreach($data["items"] as $datav)
			{
				$arraytrailer["TId"][]=$datav["id"]["videoId"];
				$arraytrailer["THr"][]='https://www.youtube.com/embed/' . $datav["id"]["videoId"] . '?rel=0&autoplay=1&iv_load_policy=3';
			}
		}
		$indextrailer++;
		if($indextrailer>=count($meternotrailer2))
			break;
	}
}

//echo json_encode($arraytrailer);
$arraytrailer["TId"]=array_values(array_unique(array_filter($arraytrailer["TId"])));
$arraytrailer["THr"]=array_values(array_unique(array_filter($arraytrailer["THr"])));
$trailerlength=count($arraytrailer["TId"]);
//print_r($arraytrailer);
//echo "<br>" . $trailerlength . "<br>";


//WRITTE TRAILER
if($arraytrailer["TId"])
{
	$sqltr="INSERT INTO trailer_media (MId, TId, THr) VALUES";
	$parts=array();
	for($i=0; $i<$trailerlength; $i++)
	{
		$parts[]="('$MId', '" . mysql_real_escape_string($arraytrailer["TId"][$i]) . "', '" . mysql_real_escape_string($arraytrailer["THr"][$i]) . "')";
	}
	$sqltr .= implode(', ', $parts)  . " ON DUPLICATE KEY UPDATE TId = VALUES(TId), THr = VALUES(THr)";
	//echo "<br>" . $sqltr . "<br>";
	if ($link->query($sqltr)) {
		//echo "<br> trailer_media records created successfully <br>";
		//echo "<br> ids " . json_encode($ids) . "<br>";
	} else {
		echo "<br> Error: " . $sqltr . "<br>" . $link->error;
	}
}

?>
