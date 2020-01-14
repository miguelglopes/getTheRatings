<?php


$MTmdbId="0";
$MImdbId="0";
$MTvdbId="0";
$MY="0";
$MOn="0";
$CId="0";

$resultpmedia=array(
"cast"=>array(),
"crew"=>array()
);

$movieouperson=array(
"movie"=>array("MId","PId"),
"tv"=>array("MId","PId"),
"person"=>array("PId","MId"),
);

$media_type=$_POST['media_type'];
$MId=$_POST['MId'];
$LaId=$_POST['LaId'];
$MTmdbId=$_POST['MTmdbId'];


include_once "mysql_connect.php";

$sqlpm="
	SELECT 
		jafezcredits
	FROM media
	WHERE MId = '" . $MId . "' LIMIT 1
;";

$sqlpm2="
	SELECT 
		" . $movieouperson[$media_type][1] . ",
		PJc,
		POrder,
		PDp,
		PMTy
	FROM person_media
	WHERE " . $movieouperson[$media_type][0] . " = '" . $MId . "'
	ORDER BY POrder
;";

//GET COLECAO IF EXISTS
if ($link->query($sqlpm)->fetch_array(MYSQL_ASSOC)["jafezcredits"]==1)
{
	//echo "<br> existe person_media <br>";
} 
else
{
	$sqlpm="
		INSERT INTO media (MId, jafezcredits) VALUES(" . $MId . ", '1') ON DUPLICATE KEY UPDATE jafezcredits=VALUES(jafezcredits)
	;";
	$link->query($sqlpm);
	
	//echo "<br> nao existe person_media, entra person_media: " . $link->error . "<br>";
	
	//WRITE ROW
	include_once "funcoes.php";
	include  "person_media.php";
}

$result = $link->query($sqlpm2);

while ($row = $result->fetch_array(MYSQL_ASSOC)) {
	$pmedia[]=$row;
}

//OBTER TUDO
$icr=-1;
$ica=-1;
foreach($pmedia as $pmediav)
{
	$PId=$pmediav[$movieouperson[$media_type][0]];
	$sqlgetmedia="
	SELECT 
		media.MId,
		media.MTmdbId,
		media.MOn,
		medialan.MN,
		media.MRd,
		medialan.MPp
	FROM media
	INNER JOIN medialan ON media.MId = medialan.MId
	WHERE media.MId = '" . $PId . "' AND medialan.LaId='" . $LaId . "' LIMIT 1
;";
if($pmediav["PDp"]=="Cast")
{
	$ica++;
	$i=$ica;
	$depart="cast";
}	
else
{
	$icr++;
	$i=$icr;
	$depart="crew";
}
	
$resultpmedia[$depart][$i] = $link->query($sqlgetmedia)->fetch_array(MYSQL_ASSOC);
$resultpmedia[$depart][$i]["PJc"] =$pmediav["PJc"];
$resultpmedia[$depart][$i]["PDp"] =$pmediav["PDp"];
$resultpmedia[$depart][$i]["PMTy"] =$pmediav["PMTy"];
$i++;
}

echo json_encode($resultpmedia, JSON_PRETTY_PRINT);
?>