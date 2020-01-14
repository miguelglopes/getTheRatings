<?php

$media_type="movie";
$MTmdbId="0";
$MImdbId="0";
$MTvdbId="0";
$MY="0";
$MOn="0";
$CId="0";

$LaId=$_POST['language'];
$MTmdbId=$_POST['id'];
$media_type=$_POST['mediatype'];

$addresults=array();

include_once "../mysql_connect.php";

$table="media";

$sqlgetmedia="
	SELECT 
		media.*,
		medialan.*
	FROM media
	INNER JOIN medialan ON media.MId = medialan.MId
	WHERE media.MTmdbId = '" . $MTmdbId . "' AND medialan.LaId='" . $LaId . "' LIMIT 1
;";
//GET MEDIA IF EXISTS
if ($media = $link->query($sqlgetmedia)->fetch_array(MYSQL_ASSOC))
{
	echo "<br> row exists <br>";
	
} 
else
{
	echo "<br> row doesnt exist: " . $link->error . "<br>";
	
	//WRITE ROW
	include "../funcoes.php";
	include "media.php";
	
	$media = $link->query($sqlgetmedia)->fetch_array(MYSQL_ASSOC);
}

echo "before media_actually_getrow.php </br>";

include "media_actually_getrow.php";

?>
