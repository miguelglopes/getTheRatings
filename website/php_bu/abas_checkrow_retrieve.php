<?php

/*
$MId="38";
$column="THr";
$table="trailer_media";
$phpfile="trailer";
*/

$MId=$_POST['MId'];
$column=$_POST['column'];
$table=$_POST['table'];
$phpfile=$_POST['phpfile'];

$final=array();

include_once "mysql_connect.php";

$sql="
	SELECT 
		" . $column . "
	FROM " . $table . "
	WHERE MId = '" . $MId . "' AND " . $column . " IS NOT NULL
;";

//GET MEDIA IF EXISTS
if (mysqli_num_rows($result = $link->query($sql)))
{
	//echo "<br> row exists <br>";
	while ($row = $result->fetch_array(MYSQL_ASSOC))
	{
		$final[]=$row[$column];
	}
} 
else
{
	//echo "<br> row doesnt exist: " . $link->error . "<br>";
	
	//WRITE ROW
	include  $phpfile;
	
	$result = $link->query($sql);
	while ($row = $result->fetch_array(MYSQL_ASSOC))
	{
		$final[]=$row[$column];
	}
}

echo json_encode($final, JSON_PRETTY_PRINT);

?>