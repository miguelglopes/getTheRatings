<?php


$MTmdbId="0";
$MImdbId="0";
$MTvdbId="0";
$MY="0";
$MOn="0";
$CId="0";

$MId=$_POST['MId'];

include_once "mysql_connect.php";

$sqlnp="
	SELECT 
		netprod.jafezajax,
		netprod.NpTmdbId,
		netprod.NpTy
	FROM netprod
	INNER JOIN netprod_media ON netprod.NpId = netprod_media.NpId
	WHERE netprod_media.MId = '" . $MId . "'
;";
//GET COLECAO IF EXISTS
if ($result = $link->query($sqlnp))
{
	//echo "<br> existe person_media <br>";
	include_once "funcoes.php";
	while ($row = $result->fetch_array(MYSQL_ASSOC))
	{
		if($row["NpTmdbId"] and $row["jafezajax"]==0 and $row["NpTy"]=="Production Company")
		{
			$NpTmdbId=$row["NpTmdbId"];
			include "netprod.php";
		}
	}
} 
else
{
	//echo "<br> erro netprod: " . $link->error . "<br>";
}

//$netprod=array();

$sqlnp="
	SELECT 
		netprod.NpN,
		netprod.NpTy,
		netprod.NpLp,
		netprod.NpO,
		netprod.NpHq,
		netprod.NpH
	FROM netprod
	INNER JOIN netprod_media ON netprod.NpId = netprod_media.NpId
	WHERE netprod_media.MId = '" . $MId . "'
;";
if ($result = $link->query($sqlnp))
{
	//echo "<br> existe person_media <br>";
	include_once "funcoes.php";
	while ($row = $result->fetch_array(MYSQL_ASSOC)) {
		$netprod[]=$row;
	}
} 
else
{
	//echo "<br> erro netprod: " . $link->error . "<br>";
}

echo json_encode($netprod);
?>