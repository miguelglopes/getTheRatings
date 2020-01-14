<?php


$MTmdbId="0";
$MImdbId="0";
$MTvdbId="0";
$MY="0";
$MOn="0";
$CId="0";
$LaId="en";
$CTmdbId="2344";
$media_type="movie";


$CId=$_POST['CId'];
$LaId=$_POST['LaId'];
$CTmdbId=$_POST['CTmdbId'];


include_once "mysql_connect.php";

$sqlcol="
	SELECT 
		*
	FROM colecao
	WHERE (CId = '" . $CId . "' OR CTmdbId = " . $CTmdbId . ")
	AND LaId = '" . $LaId . "'
;";

//GET COLECAO IF EXISTS
if ($colecao = $link->query($sqlcol)->fetch_array(MYSQL_ASSOC))
{
	//echo "<br> existe colecao <br>";
} 
else
{
	//echo "<br> nao existe colecao, entra ajaxtmdbcolecao: " . $link->error . "<br>";
	
	//WRITE ROW
	include "funcoes.php";
	include  "ajaxtmdbcolecao.php";
	
	$colecao = $link->query($sqlcol)->fetch_array(MYSQL_ASSOC);	
}

//OBTER TUDO
$sql1="
	SELECT 
		medialan.MPp,
		medialan.MN,
		media.MId,
		media.MY,
		media.MTmdbId
	FROM medialan
	INNER JOIN media ON media.MId = medialan.MId
	WHERE (media.CId = '" . $CId . "' OR media.CTmdbId = " . $CTmdbId . ")
	AND medialan.LaId='" . $LaId . "'
	ORDER BY media.MY
;";
if ($qresult = $link->query($sql1))
{
	//echo "<br> success <br>";
	while ($row = $qresult->fetch_array(MYSQL_ASSOC)) {
		$colecao["filmes"][]=$row;
	}
} 
else
{
	//echo "<br> Error: " . $sql1 . "<br>" . $link->error . "<br>";
}

echo json_encode($colecao, JSON_PRETTY_PRINT);
?>