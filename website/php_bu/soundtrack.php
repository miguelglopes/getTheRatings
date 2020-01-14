<?php

//$MId="39";
//GET THESE FROM THE TABLE


$sqls="
	SELECT 
		MOn
	FROM media
	WHERE MId = '" . $MId . "'
;";
//GET MEDIA IF EXISTS
if ($result = $link->query($sqls)->fetch_array(MYSQL_ASSOC))
{
	//print_r($result);
	$MOn=$result["MOn"];
} 
else
{
	echo "<br> row doesnt exist: " . $link->error . "<br>";
}

$meternosoundtrack=array(
	$MOn . " soundtrack",
	$MOn . " ost",
	"soundtrack " . $MOn,
	"ost " . $MOn,
	$MOn . " season 1 soundtrack",
	$MOn . " season 1 ost",
	$MOn . " theme",
	str_replace("II", "2", str_replace("III", "3", $MOn)) . " soundtrack"
);
//echo "<br>" . $meternosoundtrack[7] . "<br>";
$arraysoundtrack=array(
"SId"=>"",
"SHr"=>""
);

$youtubekey= "AIzaSyC851w4wHGNZEXNuKy8q9m9F1bq2CYVz3M";
$indexsoundtrack=0;
while(!$arraysoundtrack["SId"])
{	
	$url="https://www.googleapis.com/youtube/v3/search?&key=" . $youtubekey . '&part=snippet&type=playlist&q='.rawurlencode('intitle:"' . $meternosoundtrack[$indexsoundtrack] . '"');
	//echo $url;
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_FAILONERROR, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	$results = curl_exec($ch);
	$data=json_decode($results, true);
	if(!$results or curl_error($ch) or @!$data["items"][0])
	{
		//echo "<br> error ajaxyoutube </br>";
		//echo curl_error($ch) . " </br>";
		curl_close($ch);
	}
	else
	{
		//echo "<br> success ajaxyoutube </br>";
		curl_close($ch);
		
		
		//VERIFICAR SE TEM MUSICAS SUFICIENTES
		$url='https://www.googleapis.com/youtube/v3/playlists?&key=' . $youtubekey . '&part=contentDetails&id=' . $data["items"][0]["id"]["playlistId"];
		//echo $url;
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FAILONERROR, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$results = curl_exec($ch);
		$data2=json_decode($results, true);
		if(!$results or curl_error($ch) or @!$data2["items"][0])
		{
			echo "<br> error ajaxyoutube </br>";
			echo curl_error($ch) . " </br>";
			curl_close($ch);
		}
		else
		{
			//echo "<br> " . $data2["items"][0]["contentDetails"]["itemCount"] . "<br>";
			//echo "<br> success ajaxyoutube </br>";
			curl_close($ch);
			if($data2["items"][0]["contentDetails"]["itemCount"]>=10 or $indexsoundtrack>=3)
			{
				$arraysoundtrack["SId"]=$data["items"][0]["id"]["playlistId"];
				$arraysoundtrack["SHr"]='https://www.youtube.com/embed/videoseries?listType=playlist&list=' . $arraysoundtrack["SId"] . '&rel=0&autoplay=1&iv_load_policy=3';
			}
		}
	}
	$indexsoundtrack++;
	//echo "<br>" . $indexsoundtrack . "<br>";
	if($indexsoundtrack>=count($meternosoundtrack))
		break;
}
//echo "<br> " . json_encode($arraysoundtrack) . "<br>";

//WRITTE TRAILER
if($arraysoundtrack)
{
	$sqls="INSERT INTO media (MId, SId, SHr) VALUES ('" . $MId . "', '" . mysql_real_escape_string($arraysoundtrack["SId"]) . "', '" . mysql_real_escape_string($arraysoundtrack["SHr"]) . "') ON DUPLICATE KEY UPDATE MId = VALUES(MId), SId = VALUES(SId), SHr = VALUES(SHr)";
	//echo "<br>" . $sqls . "<br>";
	if ($link->query($sqls)) {
		//echo "<br> sucess <br>";
	} else {
		echo "<br> Error: " . $sqls . "<br>" . $link->error;
	}
}


?>		