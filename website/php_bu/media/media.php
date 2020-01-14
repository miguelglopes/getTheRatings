<?php

/*
LIMPAR O script DE TODA A PORCARIA

PHP: SERIES´, CREATED BY, credits person

"distancia" de um filme a outro

wikipedia api

imdb data
*/

//inicializacoes
$arraymedia=array(
"values" => array(),
"keys" =>array()
);
$arraymedialan=array(
"values" => array(),
"keys" =>array()
);

$keysmedia=array();
$keysmedialan=array();

$arraynetprod=array(
"values" => array(),
"keys" =>array()
);
$arraygenres=array();

$arraycountries=array();
$arraylanguages=array();
$arraykeywords=array();
$arrayruntime=array();
$ids_generos=array();
$ids_keywords=array();

//$language="pt";
//$language="en";

/*
$media_type="movie";
$MTmdbId="122906";
$MImdbId="tt2194499";
$MTvdbId="0";
*/


//*
//$media_type="movie";
//$MTmdbId="278";
//$MImdbId="0";
//$MTvdbId="0";

/*
$media_type="person";
$MTmdbId="17419";
$MImdbId="0";
$MTvdbId="0";
*/

//include_once "mysql_connect.php";

//GET PAISES
$sql="SELECT * FROM paises";
if($results=$link->query($sql))
{
	//echo "<br> paises retrieved successfully <br>";
	while($row = $results->fetch_assoc())
	{
		 $paisesarray[] = $row;
	}
	//echo json_encode($paisesarray) . "<br>";
} 
else
{
	echo "<br> Error: " . $sql . "<br>" . $link->error . "<br>";
}

//GET LINGUAS
$sql="SELECT * FROM linguas";
if($results=$link->query($sql))
{
	//echo "<br> linguas retrieved successfully <br>";
	while($row = $results->fetch_assoc())
	{
		 $linguasarray[] = $row;
	}
	//echo json_encode($linguasarray) . "<br>";
} 
else
{
	echo "<br> Error: " . $sql . "<br>" . $link->error . "<br>";
}


//AJAX TMDB
if($MTmdbId)
	include "ajaxtmdb.php";

//AJAX OMDB
if($MImdbId and $media_type!="person")
	include "ajaxomdb.php";

//AJAX TVISO
if($MImdbId and $media_type!="person")
	include "ajaxtviso.php";

//AJAX TRAKT
if($MImdbId and $media_type!="person")
	include "ajaxtrakt.php";

//AJAX NETFLIX
if($media_type!="person")
	include "ajaxnetflix.php";

//AJAX TVDB
if($MTvdbId and $media_type=="tv")
	include "ajaxtvdb.php";

//AJAX TVMAZE
if($MTvdbId and $media_type=="tv")
	include "ajaxtvmaze.php";

//AJAX TMDB PERSON
if($MTmdbId and $media_type=="person")
	include "ajaxtmdbperson.php";

//echo "<br> keysmedia: " . json_encode($keysmedia) . "<br>";
//WRITE MEDIA TABLE
//echo "<br> array_media: " . json_encode($arraymedia) . "<br>";
$arraymedia["values"][]=$media_type;
$arraymedia["keys"][]="MTy";//char(2)
$MId=write_one_line($link, "media", $arraymedia["keys"], $arraymedia["values"], "MId");
//echo "<br> MId: " . json_encode($MId) . "<br>";

//echo "<br> keysmedialan: " . json_encode($keysmedialan) . "<br>";
//WRITE MEDIALAN TABLE
//echo "<br> array_medialan: " . json_encode($arraymedialan) . "<br>";
$arraymedialan["values"][]=$MId;
$arraymedialan["keys"][]="MId";//char(2)
$arraymedialan["values"][]=$LaId;
$arraymedialan["keys"][]="LaId";//char(2)
write_one_line($link, "medialan", $arraymedialan["keys"], $arraymedialan["values"], "MId");



//WRITE GENEROS TABLE
if($arraygenres)
{
	$arraygenres=array_values(array_unique(array_filter($arraygenres)));
	//echo "<br> arraygenres: " . json_encode($arraygenres) . "<br>";
	$ids_generos=write_multiple_lines1var($arraygenres, $link, "generos", "GNe", "GId");
	//echo "<br> ids_generos: " . json_encode($ids_generos) . "<br>";
}

//WRITE GENEROS TABLE
if($arraykeywords)
{
	//WRITE keywords TABLE
	$arraykeywords=array_values(array_unique(array_filter($arraykeywords)));
	//echo "<br> arraykeywords: " . json_encode($arraykeywords) . "<br>";
	$ids_keywords=write_multiple_lines1var($arraykeywords, $link, "keywords", "KNe", "KId");
	//echo "<br> ids_keywords: " . json_encode($ids_keywords) . "<br>";
}

//WRITE NETPROD TABLE
//echo "<br> array_netprod: " . json_encode($arraynetprod) . "<br>";
$ids_netprod=write_multiple_lines_varvsars($link, "netprod", $arraynetprod["keys"], $arraynetprod["values"], "NpId");
//echo "<br> ids_netprod: " . json_encode($ids_netprod) . "<br>";

//WRITE NETPROD_MEDIA table
if($ids_netprod and $MId)
{
	write_multiple_lines_1query($MId, $ids_netprod, $link, "netprod_media","MId","NpId");
}

//WRITE RUNTIME_MEDIA TABLE
$arrayruntime=array_values(array_unique(array_filter($arrayruntime)));
if($arrayruntime and $MId)
{
	write_multiple_lines_1query($MId, $arrayruntime, $link, "runtime_media","MId","RtId");
}

//WRITE COUNTRIES_MEDIA
if($arraycountries and $MId)
{
	$arraycountries=array_values(array_unique(array_filter($arraycountries)));
	//echo "<br> arraycountries: " . json_encode($arraycountries) . "<br>";
	$arraycountries=countrieselanguages($arraycountries, $paisesarray, "PId","PNe");
	write_multiple_lines_1query($MId, $arraycountries, $link, "paises_media","MId","PId");
}

//WRITE LINGUAS_MEDIA
if($arraylanguages and $MId)
{
	$arraylanguages=array_values(array_unique(array_filter($arraylanguages)));
	$arraylanguages=countrieselanguages($arraylanguages, $linguasarray, "LId","LNe");
	//echo "<br> arraylanguages: " . json_encode($arraylanguages) . "<br>";
	write_multiple_lines_1query($MId, $arraylanguages, $link, "linguas_media","MId","LId");
}

//WRITE GENEROS_MEDIA
if($ids_generos and $MId)
{
	write_multiple_lines_1query($MId, $ids_generos, $link, "generos_media","MId","GId");
}

//WRITE KEYWORDS_MEDIA
if($ids_keywords and $MId)
{
	write_multiple_lines_1query($MId, $ids_keywords, $link, "keywords_media","MId","KId");
}
?>

