<?php
$date="0";

$sql="SELECT api_key, expire_date FROM apikeys WHERE api_name='tviso' LIMIT 1";
if ($result=$link->query($sql)->fetch_assoc())
{
	//echo "<br> apikeys created successfully <br>";
	$date=$result["expire_date"];
	$apikeytviso=$result["api_key"];
} 
else
{
	//echo "<br> Error: " . $sql . "<br>" . $link->error . "<br>";
}


if(time()>=$date)
{
	$url = "https://api.tviso.com/auth_token?id_api=3426&secret=9xR7h5qkPr5trufhuszb";
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_FAILONERROR, 1);
	$results = curl_exec($ch);
	if(!$results or curl_error($ch))
	{
		//echo "<br> error ajaxkey <br>";
		//echo curl_error($ch) . " <br>";
		curl_close($ch);
	}
	else
	{
		//echo "<br> sucess ajaxtviso <br>";
		curl_close($ch);
		$data=json_decode($results,true);
		$apikeytviso=$data["auth_token"];
		$expire_date=$data["auth_expires_date"];
	}
		
	$sql="REPLACE INTO apikeys (api_name, api_key, expire_date) VALUES('tviso', '$apikeytviso', '$expire_date')";
	if ($link->query($sql))
	{
		//echo "<br> apikeys created successfully <br>";
	} 
	else
	{
		//echo "<br> Error: " . $sql . "<br>" . $link->error . "<br>";
	}
}
?>