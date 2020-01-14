<?php
	//AJAX OMDB CORRER APENAS SE NAO FOR PESSOA
	
	$url = "https://www.omdbapi.com/?i=" . $MImdbId . "&y=&plot=full&r=json&tomatoes=true";
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_FAILONERROR, 1);
	$results = curl_exec($ch);
	$data=json_decode($results,true);
	if(!$results or curl_error($ch) or array_key_exists("Error", $data))
	{
		//echo "<br> error ajaxomdb </br>";
		//echo curl_error($ch) . " </br>";
		curl_close($ch);
	}
	else
	{
		//echo "<br> sucess ajaxomdb </br>";
		curl_close($ch);
		//print_r($data);
		$MY=$data["Year"];
		$MImdbId=$data["imdbID"];
		$MN=$data["Title"];
		if(!$data["DVD"] or $data["DVD"]=="N/A")
			$dvd="";			
		else
			$dvd=date("Y-m-d",strtotime($data["DVD"]));
		$omdb_kav=array(
			array("Year","MY",""),
			array("Rated","MRa",""),
			array("Awards","MAw",""),
			array("Metascore","MVaMeta",""),
			array("punzinho","MVaImdb",$data["imdbRating"]*10),
			array("imdbID","MImdbId",""),
			array("tomatoMeter","MVaRom",""),
			array("tomatoUserMeter","MVcRor",""),
			array("tomatoMeter","MVaRoum",""),
			array("tomatoUserReviews","MVcRour",""),
			array("punzinho","MVaRour",$data["tomatoUserRating"]*20),
			array("punzinho","MVaRor",$data["tomatoRating"]*10),
			array("punzinho","MVcImdb",str_replace(',', '', $data["imdbVotes"])),
			array("punzinho","MDv",$dvd),
			array("BoxOffice", "MR", ""),
			array("Website", "MH", ""),
			array("punzinho","MRd",date("Y-m-d",strtotime($data["Released"]))),
			array("punzinho","MUImdb","http://www.imdb.com/title/" . $MImdbId),
			array("punzinho","MURo","http://www.rottentomatoes.com/search/?search=" . $MN),
			array("punzinho","MUMe","http://www.metacritic.com/search/all/" . $MN . "/results")
		);
		$data["punzinho"]="";
		foreach($omdb_kav as $omdb_kavv)
		{
			list($arraymedia,$keysmedia) = assinginfotovariable($arraymedia, $keysmedia, mysql_real_escape_string($data[$omdb_kavv[0]]),$omdb_kavv[1], mysql_real_escape_string($omdb_kavv[2]));
		}
		
		$omdb_kav_lan=array(
			array("Title","MN",""),
			array("Plot", "MO", ""),
			array("Poster", "MPp", "")
		);
		foreach($omdb_kav_lan as $omdb_kav_lanv)
		{
			list($arraymedialan,$keysmedialan) = assinginfotovariable($arraymedialan, $keysmedialan, mysql_real_escape_string($data[$omdb_kav_lanv[0]]),$omdb_kav_lanv[1], mysql_real_escape_string($omdb_kav_lanv[2]));
		}
		
		/* PARA PAISES_MEDIA */
		$arraycountries=array_merge($arraycountries,explode(', ', $data["Country"]));
		
		/*PARA LINGUAS_MEDIA*/
		$arraylanguages=array_merge($arraylanguages,explode(', ', $data["Language"]));

		/*PARA GENEROS_MEDIA*/
		$arraygenres=array_merge($arraygenres, explode(', ', $data["Genre"]));
		
		/*PARA NETPROD_MEDIA*/
		$netprodomdb=explode(', ', $data["Production"]);
		for($i=0; $i<count($netprodomdb); $i++)
		{
			if($netprodomdb[$i]!="" and $netprodomdb[$i]!="N/A")
			{
				$arraynetprod["values"][]= array($netprodomdb[$i],"Production Company");
				$arraynetprod["keys"][]= array("NpN", "NpTy");
			}
		}
		
		/*PARA RUNTIME */
		preg_match_all('!\d+!', $data["Runtime"], $matches);
		$arrayruntime=array_merge($arrayruntime, $matches[0]);	

//$directoromdb=mysql_real_escape_string($data["Director"]);
//$writeromdb=mysql_real_escape_string($data["Writer"]);
//$actorsomdb=mysql_real_escape_string($data["Actors"]);
//$typeomdb=mysql_real_escape_string($data["Type"]);
//$tomatoimageomdb=mysql_real_escape_string($data["tomatoImage"]);
//$tomatofreshomdb=mysql_real_escape_string($data["tomatoFresh"]);
//$tomatorottenomdb=mysql_real_escape_string($data["tomatoRotten"]);
//$tomatoconsensusomdb=mysql_real_escape_string($data["tomatoConsensus"]);
//$responseomdb=mysql_real_escape_string($data["Response"]);

	}
?>