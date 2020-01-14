<?php

/********************************************** FUNCTIONS ******************************************/
function write_multiple_lines_multiplevars_1query($link, $tablename, $keys, $values)//1 query, replace, no need for id
{
	if($values)
	{
		$sql="INSERT INTO " . $tablename . " (";
		foreach($keys as $keysv)
		{
			$sql .= $keysv . ",";
		}
		$sql=substr($sql, 0, -1) . ") VALUES";
		$parts=array();
		foreach($values as $valuesv)
		{
			$parts[]="('" . implode("', '", $valuesv) . "')";
		}
		$sql .= implode(', ', $parts)  . " ON DUPLICATE KEY UPDATE ";
		foreach($keys as $keysv)
		{
			$sql .= $keysv . " = VALUES(" . $keysv . "), ";
		}
		$sql=substr($sql, 0, -2);


		//echo "<br>" . $sql . "<br>";
		
		if ($link->query($sql)) {
			//echo "<br> " . $tablename . " records created successfully <br>";
		} else {
			echo "<br> Error: " . $sql . "<br>" . $link->error;
		}
	}
}



function write_one_line($link, $tablename, $keys, $values, $id_last)
{
	if($values)
	{
		$sql="INSERT INTO " . $tablename . "(";
		$sql .=  implode(', ', $keys) . ") VALUES('";
		$sql .= implode("', '", $values) . "') ON DUPLICATE KEY UPDATE " . $id_last . " = LAST_INSERT_ID(" . $id_last . "), ";
		foreach($keys as $keysv)
			$sql .= $keysv . "=VALUES(" . $keysv . "),";
		$sql=substr($sql, 0, -1);
		//echo $sql;
		if ($link->query($sql))
		{
			//echo "<br> ". $tablename . " created successfully <br>";
			$MId = $link->insert_id;
			//echo "MId: " . $MId . "<br>";
			return $MId;
		} 
		else
		{
			echo "<br> Error: " . $sql . "<br>" . $link->error . "<br>";
		}
	}
}

/********************************************** FUNCTIONS ******************************************/
function write_multiple_lines_1query($MId_var, $final, $link, $tablename, $variableid0, $variableid)//1 query, replace, no need for id
{
	if($final)
	{
		$sql="INSERT INTO " . $tablename . " (" . $variableid0 . "," . $variableid . ") VALUES";
		$parts=array();
		foreach($final as $finalv)
		{
			$parts[]="('$MId_var', '" . mysql_real_escape_string($finalv) . "')";
		}
		$sql .= implode(', ', $parts)  . " ON DUPLICATE KEY UPDATE " . $variableid0 . " = VALUES(" . $variableid0 . "), " . $variableid . " = VALUES(" . $variableid . ")";
		if ($link->query($sql)) {
			//echo "<br> " . $tablename . " records created successfully <br>";
			/*
			$ids = array();
			do
			{
				if($link->insert_id)
					$ids[] = $link->insert_id;
				$link->next_result();
			} while($link->more_results());
			*/
			//echo "<br> ids " . json_encode($ids) . "<br>";
		} else {
			echo "<br> Error: " . $sql . "<br>" . $link->error;
		}
	}
}

function write_multiple_lines1var($final, $link, $tablename, $variableid, $id_last)
{
	if($final)
	{
		$sql="";
		foreach($final as $finalv)
		{
			$sql.="INSERT INTO " . $tablename . " (" . $variableid . ") VALUES('" . mysql_real_escape_string($finalv) . "') ON DUPLICATE KEY UPDATE " . $id_last . " = LAST_INSERT_ID(" . $id_last . ");";
		}
		//echo "<br>" . $sql . "<br>";
		if ($link->multi_query($sql)) {
			//echo "<br> " . $tablename . " records created successfully <br>";
			$ids = array();
			if($link->insert_id)
				$ids[] = $link->insert_id;
			while($link->more_results())
			{
				$link->next_result();
				if($link->insert_id)
					$ids[] = $link->insert_id;
			}
			//echo "<br> ids " . json_encode($ids) . "<br>";
			return array_values(array_unique($ids));
		} else {
			echo "<br> Error: " . $sql . "<br>" . $link->error;
		}
	}
}

function write_multiple_lines_varvsars($link, $tablename, $keys, $values, $id_last)
{
	if($values)
	{
		$sql="";
		foreach($values as $valuesk => $valuesv)
		{
			$sql .=" INSERT INTO " . $tablename . "(";
			$sql .=  implode(", ", $keys[$valuesk]) . ") VALUES('";
			$sql .= implode("', '", $valuesv) . "')";
			$sql .= " ON DUPLICATE KEY UPDATE " . $id_last . " = LAST_INSERT_ID(" . $id_last . "), ";
			foreach($keys[$valuesk] as $keysiv)
				$sql .= $keysiv . "=VALUES(" . $keysiv . "),";
			$sql=substr($sql, 0, -1);
			$sql .= ";";
		}
		//echo "<br>" . $sql . "<br>";
		if ($link->multi_query($sql))
		{
			//echo "<br> netprod created successfully <br>";
			$ids_netprod = array();
			if($link->insert_id)
					$ids[] = $link->insert_id;
			while($link->more_results())
			{
				$link->next_result();
				if($link->insert_id)
					$ids[] = $link->insert_id;
			}
			return array_values(array_unique($ids));
			//echo "ids_netprod: " . json_encode($ids_netprod) . "<br>";
			//$link->close();
		} 
		else
			echo "<br> Error: " . $sql . "<br>" . $link->error . "<br>";
	}
}

function assinginfotovariable($arraymedia, $keys, $valueinfo, $keyname, $valueinfo2)
{
	if(!array_key_exists($keyname, $keys))
	{
		$final=$valueinfo;
		if($valueinfo=="")
		{
			$final=$valueinfo2;
			if($final and $final!="N/A")
			{
				$arraymedia["values"][]=$final;
				$arraymedia["keys"][]=$keyname;//tinytext
				$keys[$keyname]=true;
			}	
		}
		else
		{
			if($final and $final!="N/A")
			{
				$arraymedia["values"][]=$final;
				$arraymedia["keys"][]=$keyname;//tinytext
				$keys[$keyname]=true;
			}
		}
	}
	return array($arraymedia, $keys);  
}

function countrieselanguages($filme, $meus, $varid, $varname) {
	$final=array();
	foreach($filme as $filmev)
	{
		foreach($meus as $meusv)
		{
			if($filmev==$meusv[$varname] || $filmev==$meusv[$varid])
			{
				$final[]=$meusv[$varid];
				break;
			}
		}
	}	
	//echo json_encode($moviegenresarray);
	return array_values(array_unique($final));
}

?>