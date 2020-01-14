<?php
$id=$_POST['id'];

include_once "mysql_connect.php";

mysql_query("UPDATE viewcounter SET `views`=`views`+1 WHERE id='" .$id. "'");
?>