<?php

	//GET SECONDARY TABLES
	$tablearray=array(
		//array("generos", "keywords", "linguas", "netprod", "paises"),
		array("generos", "linguas", "paises"),
		//array("GId", "KId", "LId", "NpId", "PId")
		array("GId", "LId", "PId"),
		array("GNe", "LNe", "PNe")
	);
			
	$i=0;
	foreach($tablearray[0] as $table)
	{
		$sql1="
			SELECT 
				a.*
			FROM " . $table . " AS a
			INNER JOIN " . $table . "_media AS b ON b." . $tablearray[1][$i] . "     = a." . $tablearray[1][$i] . "
			INNER JOIN media    AS c ON b.MId  = c.MId
			WHERE c.MTmdbId = '" . $MTmdbId . "'
		;";

		if ($qresult = $link->query($sql1))
		{
			//echo "<br> success <br>";
			while ($row = $qresult->fetch_array(MYSQL_ASSOC)) {
				$addresults[$table][]=$row[$tablearray[2][$i]];
			}
			//print_r($addresults);
		} 
		else
			echo "<br> Error: " . $sql1 . "<br>" . $link->error . "<br>";
		$i++;
	}

	$table="runtime";
	$sql1="
		SELECT 
			a.RtId
		FROM runtime_media AS a
		INNER JOIN media    AS c ON a.MId  = c.MId
		WHERE c.MTmdbId = '" . $MTmdbId . "'
	;";
	if ($qresult = $link->query($sql1))
	{
		//echo "<br> success <br>";
		while ($row = $qresult->fetch_array(MYSQL_ASSOC)) {
			$addresults[$table][]=$row["RtId"];
		}
		//print_r($addresults);
	} 
	else
		echo "<br> Error: " . $sql1 . "<br>" . $link->error . "<br>";
	//echo json_encode($addresults, JSON_PRETTY_PRINT);
	
	
	//JOIN MEDIA AND SECONDARY TABLES
	foreach($tablearray[0] as $table)
	{
		if(array_key_exists ($table, $addresults))
			$media[$table]=$addresults[$table] ;
		else
			$media[$table]=array();
	}
	if(array_key_exists ("runtime", $addresults))
		$media["runtime"]=$addresults["runtime"];
	else
		$media["runtime"]=array();
	

	//PRINT
	echo json_encode($media, JSON_PRETTY_PRINT);

?>