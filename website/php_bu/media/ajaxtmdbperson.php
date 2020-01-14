<?php
$apikeytmdb = '56dc0d4b22d78c87610b733926334344';

$url = "http://api.themoviedb.org/3/person/" . $MTmdbId . "/tagged_images?&api_key=" . $apikeytmdb;
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FAILONERROR, 1);
$results = curl_exec($ch);
$data=json_decode($results, true);
if(!$results or curl_error($ch) or @!$data["results"][0])
{
	//echo "<br> error ajaxtmdb </br>";
	//echo curl_error($ch) . " </br>";
	curl_close($ch);
}
else
{
	//echo "<br> success ajaxtmdb </br>";
	curl_close($ch);
	//print_r($data);
	$bp="";
	foreach($data["results"] as $datav)
	{
		if($datav["image_type"]=="backdrop")
		{
			$bp="http://image.tmdb.org/t/p/wsize" . $datav["file_path"];
			break;
		}
	}
	$tmdbpessoa_kav=array(
		array("punzinho","MBp",$bp)
	);
	$data["punzinho"]="";
	foreach($tmdbpessoa_kav as $tmdbpessoa_kavv)
	{
		list($arraymedia,$keysmedia) = assinginfotovariable($arraymedia, $keysmedia, mysql_real_escape_string($data[$tmdbpessoa_kavv[0]]),$tmdbpessoa_kavv[1], mysql_real_escape_string($tmdbpessoa_kavv[2]));
	}
}

//OTHER IMAGE SOURCES
/*
$.ajax({
	url : "https://api-v2launch.trakt.tv/people" + "/" + filme.omdbid + "?extended=images",
	dataType : 'json',
	headers: 
	{
		"Content-Type":"application/json",
		"trakt-api-version":"2",
		"trakt-api-key": apikeytrakt,
	},
	//async : false,
	success : function (data)
	{
	},
	error : function(){
		console.log("ended related ajax trakt error")
	},
	complete: function()
	{
	}
	
	//timeout: timeouttime // sets timeout to 3 seconds
})
			
			$.ajax({
				url : "http://api.themoviedb.org/3/person/" + filme.tmdbid + "/images?&api_key=" + apikey,
				dataType : 'json',
				//async : false,
				success : function (data)
				{
				},
				error : function(){
					console.log("ended related ajax trakt error")
				},
				complete: function()
				{
				}
				
				//timeout: timeouttime // sets timeout to 3 seconds
			})*/
?>