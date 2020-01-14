<?php

$db_host = "localhost";
$db_username = "root";
$db_pass = "toor";
$db_name = "gettheratings";

//$link = mysql_connect($db_host,$db_username,$db_pass) or die ("Could not connect to mysql");
//mysql_select_db($db_name, $link);
//echo mysql_errno($link) . "database: " . mysql_error($link). "</br>";

$link = new mysqli($db_host, $db_username, $db_pass, $db_name);
if ($link->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Successful Connection </br>";
 
?>
