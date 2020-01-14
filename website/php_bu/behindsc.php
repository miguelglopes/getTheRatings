<?php

//$MId="110";
//GET THESE FROM THE TABLE

$sqltr="
	SELECT 
		MTy,
		MOn
	FROM media
	WHERE MId = '" . $MId . "'
;";
//GET MEDIA IF EXISTS
if ($result = $link->query($sqltr)->fetch_array(MYSQL_ASSOC))
{
	//print_r($result);
	$media_type=$result["MTy"];
	$MOn=$result["MOn"];
	$network="";
} 
else
{
	echo "<br> row doesnt exist: " . $link->error . "<br>";
}


$movieouseriebehindthescenes=array(
	"movie" => " movie ",
	"tv" => " tv show ",
	"person" => " "
);

$arraytrailer=array(
"TId"=>array(),
"THr"=>array()
);

$youtubekey= "AIzaSyC851w4wHGNZEXNuKy8q9m9F1bq2CYVz3M";
$url="https://www.googleapis.com/youtube/v3/search?&key=" . $youtubekey . '&part=snippet&type=video&maxResults=10&q='.rawurlencode($network . ' "behind the scenes"|"making of"|"interview"|"inside"|"featurette"' . $movieouseriebehindthescenes[$media_type] . ' intitle:"' . $MOn . '"');
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
//echo json_encode($arraytrailer);
$trailerlength=count($arraytrailer["TId"]);
//echo $trailerlength;
//WRITTE TRAILER
if($arraytrailer["TId"])
{
	$sqltr="INSERT INTO behindsc_media (MId, BsId, BsHr) VALUES";
	$parts=array();
	for($i=0; $i<$trailerlength; $i++)
	{
		$parts[]="('$MId', '" . mysql_real_escape_string($arraytrailer["TId"][$i]) . "', '" . mysql_real_escape_string($arraytrailer["THr"][$i]) . "')";
	}
	$sqltr .= implode(', ', $parts)  . " ON DUPLICATE KEY UPDATE BsId = VALUES(BsId), BsHr = VALUES(BsHr)";
	//echo "<br>" . $sqltr . "<br>";
	if ($link->query($sqltr)) {
		//echo "<br> trailer_media records created successfully <br>";
		//echo "<br> ids " . json_encode($ids) . "<br>";
	} else {
		echo "<br> Error: " . $sqltr . "<br>" . $link->error;
	}
}

?>
