<?php
//VARIABLES
$apikeytmdb = '56dc0d4b22d78c87610b733926334344';
$release_date = array(
	"movie" => "release_date",
	"tv" => "first_air_date",
	"person" => "birthday"
);
$original_name = array(
	"movie" => "original_title",
	"tv" => "original_name",
	"person" => "name",
);
$resumo = array(
	"movie" => "overview",
	"tv" => "overview",
	"person" => "biography",
);
$image_path = array(
	"movie" => "poster_path",
	"tv" => "poster_path",
	"person" => "profile_path",
);
$tempo = array(
	"movie" => "runtime",
	"tv" => "episode_run_time",
);
$name = array(
	"movie" => "title",
	"tv" => "name",
	//"person" => "also_known_as"
);
$production_country = array(
	"movie" => "production_countries",
	"tv" => "origin_country"
);
$linguas = array(
	"movie" => "spoken_languages",
	"tv" => "languages"
);
$moviecountriesarray=array();
$movielanguagesarray=array();

$url = 'http://api.themoviedb.org/3/' . $media_type . '/' . $MTmdbId . '?&api_key=' . $apikeytmdb . '&language=' . $LaId;
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FAILONERROR, 1);
$results = curl_exec($ch);
if(!$results or curl_error($ch))
{
	echo "<br> error ajaxtmdb : " . $url . " </br>";
	echo curl_error($ch) . " </br>";
	curl_close($ch);
}
else
{
	//echo "<br> success ajaxtmdb </br>";
	curl_close($ch);
	$data=json_decode($results, true);

	//movie,serie,person table
	//todos
	$MOn=$data[$original_name[$media_type]];
	$MTmdbId=$data["id"];
	$tmdb_kav_todos=array(
		array("homepage","MH",""),
		array("id","MTmdbId",""),//int
		array($original_name[$media_type],"MOn",""),//tinytext
		array($release_date[$media_type],"MRd","")//date
	);
	$data["punzinho"]="";
	for($i=0;$i<count($tmdb_kav_todos);$i++)
	{
		list($arraymedia,$keysmedia) = assinginfotovariable($arraymedia, $keysmedia, mysql_real_escape_string($data[$tmdb_kav_todos[$i][0]]),$tmdb_kav_todos[$i][1], mysql_real_escape_string($tmdb_kav_todos[$i][2]));
	}
	
	if($data[$image_path[$media_type]])
		$pp="http://image.tmdb.org/t/p/wsize" . $data[$image_path[$media_type]];
	else
		$pp="";
	$tmdb_kav_todos_lan=array(
		array($resumo[$media_type],"MO",""),//text
		array("punzinho","MPp",$pp)//tinytext
	);
	$data["punzinho"]="";
	for($i=0;$i<count($tmdb_kav_todos_lan);$i++)
	{
		list($arraymedialan,$keysmedialan) = assinginfotovariable($arraymedialan, $keysmedialan, mysql_real_escape_string($data[$tmdb_kav_todos_lan[$i][0]]),$tmdb_kav_todos_lan[$i][1], mysql_real_escape_string($tmdb_kav_todos_lan[$i][2]));
	}
	//echo $data[$resumo[$media_type]];
	//$popularitytmdb=mysql_real_escape_string($data["popularity"]);

	//apenas movie
	if($media_type=="movie")
	{
		$CTmdbId=$data["belongs_to_collection"]["id"];
		$tmdb_kav_movie=array(
			array("budget","MB",""),//int
			array("revenue","MR",""),//int
			array("punzinho","CTmdbId", $CTmdbId)//int
		);
		$data["punzinho"]="";
		for($i=0;$i<count($tmdb_kav_movie);$i++)
		{
			list($arraymedia,$keysmedia) = assinginfotovariable($arraymedia, $keysmedia, mysql_real_escape_string($data[$tmdb_kav_movie[$i][0]]),$tmdb_kav_movie[$i][1], mysql_real_escape_string($tmdb_kav_movie[$i][2]));
		}
		
		$tmdb_kav_movie_lan=array(
			array("tagline","MTl","")//text
		);
		for($i=0;$i<count($tmdb_kav_movie_lan);$i++)
		{
			list($arraymedialan,$keysmedialan) = assinginfotovariable($arraymedialan, $keysmedialan, mysql_real_escape_string($data[$tmdb_kav_movie_lan[$i][0]]),$tmdb_kav_movie_lan[$i][1], mysql_real_escape_string($tmdb_kav_movie_lan[$i][2]));
		}
				
		/*PARA PAISES_MEDIA*/
		for($i=0; $i<count($data[$production_country[$media_type]]); $i++)
			$moviecountriesarray[$i]=$data[$production_country[$media_type]][$i]["iso_3166_1"];
		
		/*PARA LINGUAS_MEDIA*/
		for($i=0; $i<count($data[$linguas[$media_type]]); $i++)
			$movielanguagesarray[$i]=$data[$linguas[$media_type]][$i]["iso_639_1"];
		
		//$videotmdb=mysql_real_escape_string($data["video"]);
	}

	//apenas tv
	if($media_type=="tv")
	{

		//AJAX EXTERNAL IDS only for series
		$url = "http://api.themoviedb.org/3/" . $media_type . "/" . $MTmdbId . "/external_ids?&api_key=" . $apikeytmdb;	
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FAILONERROR, 1);
		$results = curl_exec($ch);
		if(!$results or curl_error($ch))
		{
			//echo "<br> error ajaxeids </br>";
			//echo curl_error($ch) . " </br>";
			curl_close($ch);
		}
		else
		{
			//echo "<br> sucess ajaxeids </br>";
			curl_close($ch);
			$datatv=json_decode($results, true);
			$MTvdbId=$datatv["tvdb_id"];
			$MImdbId=$datatv["imdb_id"];
			$tmdb_kav_tv2=array(
				array("imdb_id","MImdbId",""),//char(9)
				array("tvdb_id","MTvdbId",""),//int
				array("tvrage_id","MTvrageId","")//id
			);
			for($i=0;$i<count($tmdb_kav_tv2);$i++)
			{
				list($arraymedia,$keysmedia) = assinginfotovariable($arraymedia, $keysmedia, mysql_real_escape_string($datatv[$tmdb_kav_tv2[$i][0]]),$tmdb_kav_tv2[$i][1], mysql_real_escape_string($tmdb_kav_tv2[$i][2]));
			}
			
			//$freebase_midtmdb=mysql_real_escape_string($datatv["freebase_mid"]);
			//$freebase_idtmdb=mysql_real_escape_string($datatv["freebase_id"]);		
		}
		$tmdb_kav_tv=array(
			array("type","MSt",""),//id
			array("in_production","MSip","")//boolean
		);
		for($i=0;$i<count($tmdb_kav_tv);$i++)
		{
			list($arraymedia,$keysmedia) = assinginfotovariable($arraymedia, $keysmedia, mysql_real_escape_string($data[$tmdb_kav_tv[$i][0]]),$tmdb_kav_tv[$i][1], mysql_real_escape_string($tmdb_kav_tv[$i][2]));
		}
		
		/*PARA NETPROD*/
		for($i=0; $i<count($data["networks"]); $i++)
		{
			if($data["networks"][$i]["name"]!="" and $data["networks"][$i]["name"]!="N/A")
			{
				$arraynetprod["values"][]=array($data["networks"][$i]["name"], $data["networks"][$i]["id"], "Network");
				$arraynetprod["keys"][]=array("NpN", "NpTmdbId", "NpTy");
			}
		}
		
		/*PARA PAISES_MEDIA*/
		$moviecountriesarray=$data[$production_country[$media_type]];
		
		/*PARA LINGUAS_MEDIA*/
		$movielanguagesarray=$data[$linguas[$media_type]];
		
		//$last_air_datetmdb=mysql_real_escape_string($data["last_air_date"]);
		//$number_of_episodestmdb=mysql_real_escape_string($data["number_of_episodes"]);
		//$number_of_seasonstmdb=mysql_real_escape_string($data["number_of_seasons"]);
		//$seasonstmdb=mysql_real_escape_string(json_encode($data["seasons"]));
		//$created_bytmdb=mysql_real_escape_string(json_encode($data["created_by"]));
	}

	//apenas person
	if($media_type=="person")
	{
		$tmdb_kav_person=array(
			array("deathday","MDd",""),
			array("place_of_birth","MPb","")
		);
		for($i=0;$i<count($tmdb_kav_person);$i++)
		{
			list($arraymedia,$keysmedia) = assinginfotovariable($arraymedia, $keysmedia, mysql_real_escape_string($data[$tmdb_kav_person[$i][0]]),$tmdb_kav_person[$i][1], mysql_real_escape_string($tmdb_kav_person[$i][2]));
		}
	}

	//apenas movie e tv
	if($media_type=="movie" or $media_type=="tv")
	{
		if($data["backdrop_path"])
			$bp="http://image.tmdb.org/t/p/wsize" . $data["backdrop_path"];
		else
			$bp="";
		$tmdb_kav_movietv=array(
			array("punzinho","MBp",$bp),
			array("punzinho","MVaTmdb",$data["vote_average"]*10),//int
			array("vote_count","MVcTmdb",""),//int
			array("status","MS",""),
			array("punzinho","MUTmdb","https://www.themoviedb.org/" . $media_type . "/" . $MTmdbId)
		);
		$data["punzinho"]="";
		for($i=0;$i<count($tmdb_kav_movietv);$i++)
		{
			list($arraymedia,$keysmedia) = assinginfotovariable($arraymedia, $keysmedia, mysql_real_escape_string($data[$tmdb_kav_movietv[$i][0]]),$tmdb_kav_movietv[$i][1], mysql_real_escape_string($tmdb_kav_movietv[$i][2]));
		}
		
		$tmdb_kav_movietv_lan=array(
			array($name[$media_type],"MN","")//tinytext
		);
		for($i=0;$i<count($tmdb_kav_movietv_lan);$i++)
		{
			list($arraymedialan,$keysmedialan) = assinginfotovariable($arraymedialan, $keysmedialan, mysql_real_escape_string($data[$tmdb_kav_movietv_lan[$i][0]]),$tmdb_kav_movietv_lan[$i][1], mysql_real_escape_string($tmdb_kav_movietv_lan[$i][2]));
		}
			
			
		/*PARA NETPROD*/
		for($i=0; $i<count($data["production_companies"]); $i++)
		{
			if($data["production_companies"][$i]["name"]!="" and $data["production_companies"][$i]["name"]!="N/A")
			{
				$arraynetprod["values"][] = array($data["production_companies"][$i]["name"], $data["production_companies"][$i]["id"], "Production Company");
				$arraynetprod["keys"][] = array("NpN", "NpTmdbId", "NpTy");
			}
		}	
		
		/* PARA PAISES_MEDIA */
		if($moviecountriesarray)
			$arraycountries=array_merge($arraycountries,$moviecountriesarray);
		
		/*PARA LINGUAS_MEDIA*/
		if($movielanguagesarray)
			$arraylanguages=array_merge($arraylanguages,$movielanguagesarray);
		
		/*PARA GENEROS_MEDIA*/
		if($LaId=="en")
		{
			for($i=0; $i<count($data["genres"]); $i++)
			{
				$arraygenres[]=$data["genres"][$i]["name"];
			}
			//echo "<br> tmdbfg " . json_encode($arraygenres) . "<br>";
		}
		
		/*PARA RUNTIME */
		if($media_type=="movie")
			$arrayruntime[]=$data[$tempo[$media_type]];
		else
			$arrayruntime=array_merge($arrayruntime, $data[$tempo[$media_type]]);	

		//$original_languagetmdb=mysql_real_escape_string($data["original_language"]);
	}
	
	//apenas movie e person
	if($media_type=="movie" or $media_type=="person")
	{
		$MImdbId=$data["imdb_id"];
		$tmdb_kav_movieperson=array(
			array("adult","MA",""),//boolean
			array("imdb_id","MImdbId",""),//char(9)
		);
		for($i=0;$i<count($tmdb_kav_movieperson);$i++)
		{
			list($arraymedia,$keysmedia) = assinginfotovariable($arraymedia, $keysmedia, mysql_real_escape_string($data[$tmdb_kav_movieperson[$i][0]]),$tmdb_kav_movieperson[$i][1], mysql_real_escape_string($tmdb_kav_movieperson[$i][2]));
		}	
	}
}
?>